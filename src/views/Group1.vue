<template>
  <section class="groupData" data-aos="fade-left">
    <div class="container">
      <div class="contentBlock">
        <div class="contentHead">
          <div class="groupName">
            <div class="title d-flex justify-content-between">
              <h2>{{ groupData.groupName }}</h2>
              <button @click="deleAllItem" type="button"><font-awesome-icon icon="fa-solid fa-trash" /></button>
            </div>
            <p class="priceTotal">
              目前累積金額 $<span>{{ calTotalPrice }}</span>
            </p>
          </div>
          <div class="d-flex">
            <button @click="openMember" type="button" class="lgBtn">編輯成員</button>
            <button @click="openAdd" type="button" class="lgBtn">新增項目</button>
          </div>
        </div>
        <ul class="contentMain">
          <li v-for="item in groupData.groupList" :key="item.key">
            <div class="userTitle d-flex align-item-center justify-content-between" @click="item.isHidden = !item.isHidden">
              <h3>{{ item.name }}</h3>
              <p>目前支出：{{ perTotalPrice(item) }}</p>
            </div>
            <ul class="contentList" :class="{ hidden: item.isHidden }">
              <li v-for="(obj, index) in item.list" :key="index">
                <div class="d-flex align-item-center justify-content-between">
                  <h4>{{ obj.content }}</h4>
                  <p class="d-flex align-item-center">
                    <span>${{ obj.price }}</span>
                    <button @click="openEdit(obj)" type="button"><font-awesome-icon class="editBtn" icon="fa-solid fa-pen" /></button>
                    <button @click="deleItem(index, item)" type="button"><font-awesome-icon class="editBtn" icon="fa-solid fa-trash" /></button>
                  </p>
                </div>
                <p class="date">{{ obj.date }}</p>
              </li>
            </ul>
          </li>
        </ul>
        <div class="contentBottom">
          <button @click="isCalc = !isCalc" type="button" class="lgBtn">結算</button>
        </div>
      </div>
      <div class="calcBlock" :class="{ hiddenCalcBlock: !isCalc }">
        <div class="calcTitle d-flex align-item-center justify-content-between">
          <h3>平均每人花費</h3>
          <p>${{ perAveragePrice }}</p>
        </div>
        <ul>
          <li v-for="item in groupData.groupList" :key="item.id" class="d-flex align-item-center justify-content-between">
            <h4>{{ item.name }}</h4>
            <p :class="{ pay: item.totalPrice < perAveragePrice }">{{ calPay(item.totalPrice) }}</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="editBlock editMember" :class="{ show: isEditMember }">
      <div class="blockHead d-flex justify-content-between align-item-center">
        <h3>編輯群組</h3>
        <button @click="closeMember" type="button" class="editBtn"><font-awesome-icon icon="fa-solid fa-xmark" size="2x" /></button>
      </div>
      <div class="blockMain">
        <input type="text" v-model="memberTemp.groupName" placeholder="群組名稱" />
        <ul>
          <li v-for="item in memberTemp.memberList" :key="item.id" class="d-flex align-item-center justify-content-between">
            <label :for="item.id">成員</label>
            <input :id="item.id" v-model="item.name" type="text" />
            <button @click="deleMember(item)" type="button" class="editBtn">
              <font-awesome-icon icon="fa-solid fa-minus" />
            </button>
          </li>
        </ul>
      </div>
      <div class="blockBottom">
        <button @click="addTempMember" class="circleBtn addNewBtn" type="button"><font-awesome-icon icon="fa-solid fa-plus" /></button>
        <button @click="doneEditMember(memberTemp)" class="lgBtn" type="button">編輯完成</button>
      </div>
    </div>
    <!-- 新增與編輯項目 -->
    <div class="editBlock editItem" :class="{ show: isAdd }">
      <div class="blockHead d-flex justify-content-between align-item-center">
        <h3 v-if="!this.itemTemp.isEdit">新增項目</h3>
        <h3 v-else>編輯項目</h3>
        <button @click="closeAdd" type="button" class="editBtn"><font-awesome-icon icon="fa-solid fa-xmark" size="2x" /></button>
      </div>
      <div class="blockMain">
        <input type="text" v-model="itemTemp.content" placeholder="項目名稱" />
        <input type="number" v-model.number="itemTemp.price" />
        <vc-date-picker v-model="itemTemp.date">
          <template v-slot="{ inputValue, inputEvents }">
            <input class="bg-white border px-2 py-1 rounded" :value="inputValue" v-on="inputEvents" />
          </template>
        </vc-date-picker>
        <select v-model="itemTemp.name">
          <option value="" disabled>誰先付的</option>
          <option v-for="(item, index) in members" :key="index" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="blockBottom">
        <button v-if="!this.itemTemp.isEdit" @click="addNewItem(itemTemp)" class="lgBtn" type="button">新增</button>
        <button v-else @click="doneEditItem(itemTemp)" class="lgBtn" type="button">編輯完成</button>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "Group1",
  data() {
    return {
      appData: [],
      storageKey: "Group1Data",
      groupData: {
        groupName: "",
        groupList: [],
      },
      isAdd: false,
      isEditMember: false,
      isCalc: false,
      itemTemp: {
        name: "",
        content: "",
        price: 0,
        date: new Date(),
      },
      memberTemp: {
        groupName: "",
        memberList: [],
        deleMember: [],
      },
    };
  },
  methods: {
    saveStorage: function () {
      const data = JSON.stringify(this.groupData);
      localStorage.setItem(this.storageKey, data);
    },
    getStorage: function () {
      const data = JSON.parse(localStorage.getItem(this.storageKey));
      if (data) {
        this.groupData = data;
      }
    },
    render: function () {
      this.saveStorage();
      this.getStorage();
    },
    // 創建資料
    createData: async function () {
      const res = await this.getData();
      this.groupData.groupList = res.map((item, index) => ({
        id: index,
        name: item,
        list: [],
        isHidden: false,
        totalPrice: 0,
      }));
      this.render();
    },
    // 取得member資料
    getData: function () {
      return new Promise((resolve, reject) => {
        const data = this.$route.params.memberData;
        this.groupData.groupName = this.$route.params.groupName;
        if (data) {
          resolve(data);
        } else {
          reject(new Error("error"));
        }
      });
    },
    // 刪除所有項目
    deleAllItem: function () {
      this.$swal
        .fire({
          title: "確定要刪除全部資料嗎?",
          showCancelButton: true,
          confirmButtonText: "刪除",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.groupData.groupList.forEach((item) => {
              item.list = [];
            });
            this.render();
          } else if (result.isDenied) {
            return;
          }
        });
      this.isCalc = false;
    },
    // 打開新增項目
    openAdd: function () {
      if (this.isAdd) {
        return;
      } else {
        this.isAdd = !this.isAdd;
      }
    },
    // 關閉新增項目
    closeAdd: function () {
      this.isAdd = !this.isAdd;
      this.itemTemp = {
        name: "",
        content: "",
        price: 0,
        date: new Date(),
      };
    },
    // 新增項目
    addNewItem: function (item) {
      if (!item.content) {
        this.$swal.fire("請輸入項目名稱");
        return;
      } else if (typeof item.price !== "number") {
        this.$swal.fire("請輸入正確金額");
        return;
      } else if (!item.name) {
        this.$swal.fire("請選擇支付對象");
        return;
      }
      const index = this.groupData.groupList.findIndex((obj) => obj.name === item.name);
      this.groupData.groupList[index].isHidden = false;
      this.groupData.groupList[index].list.push({
        id: Date.now(),
        name: item.name,
        content: item.content,
        price: item.price,
        date: `${item.date.getFullYear()}/${item.date.getMonth() + 1}/${item.date.getDate()}`,
        orignDate: item.date,
      });
      this.isCalc = false;
      this.closeAdd();
      this.render();
    },
    // 刪除項目
    deleItem: function (index, item) {
      this.$swal
        .fire({
          title: "確定要刪除嗎?",
          showCancelButton: true,
          confirmButtonText: "刪除",
        })
        .then((result) => {
          if (result.isConfirmed) {
            item.list.splice(index, 1);
            this.isCalc = false;
            this.render();
          } else if (result.isDenied) {
            return;
          }
        });
    },
    // 打開編輯項目
    openEdit: function (item) {
      if (this.isAdd) {
        return;
      } else {
        this.isAdd = !this.isAdd;
        this.itemTemp = {
          id: item.id,
          currentName: item.name,
          name: item.name,
          content: item.content,
          price: item.price,
          date: item.orignDate,
          isEdit: true,
        };
      }
    },
    // 完成編輯項目
    doneEditItem: function (item) {
      const curMemberIndex = this.groupData.groupList.findIndex((obj) => obj.name === item.currentName);
      const itemIndex = this.groupData.groupList[curMemberIndex].list.findIndex((obj) => obj.id === item.id);
      if (item.name === item.currentName) {
        const data = this.groupData.groupList[curMemberIndex].list[itemIndex];
        data.content = item.content;
        data.price = item.price;
        data.date = `${item.date.getFullYear()}/${item.date.getMonth() + 1}/${item.date.getDate()}`;
        this.closeAdd();
        this.groupData.groupList[curMemberIndex].isHidden = false;
        this.render();
      } else if (item.name !== item.currentName) {
        this.groupData.groupList[curMemberIndex].list.splice(itemIndex, 1);
        const newMemberIndex = this.groupData.groupList.findIndex((obj) => obj.name === item.name);
        this.groupData.groupList[newMemberIndex].list.push({
          id: item.id,
          name: item.name,
          content: item.content,
          price: item.price,
          date: `${item.date.getFullYear()}/${item.date.getMonth() + 1}/${item.date.getDate()}`,
          orignDate: item.date,
        });
        this.isCalc = false;
        this.closeAdd();
        this.groupData.groupList[newMemberIndex].isHidden = false;
        this.render();
      }
    },
    // 打開編輯成員
    openMember: function () {
      if (this.isEditMember) {
        return;
      } else {
        this.isEditMember = !this.isEditMember;
        this.memberTemp.groupName = this.groupData.groupName;
        this.memberTemp.memberList = this.groupData.groupList.map((item) => item);
      }
    },
    // 關閉編輯成員
    closeMember: function () {
      this.isEditMember = !this.isEditMember;
      this.memberTemp = {
        groupName: "",
        memberList: [],
        deleMember: [],
      };
    },
    // 新增暫定成員
    addTempMember: function () {
      if (this.memberTemp.memberList.length >= 8) {
        this.$swal.fire("最多八名成員");
        return;
      }
      this.memberTemp.memberList.push({
        id: Date.now(),
        name: "",
        list: [],
        isHidden: false,
        totalPrice: 0,
      });
    },
    // 刪除暫定成員
    deleMember: function (obj) {
      if (this.memberTemp.memberList.length <= 2) {
        this.$swal.fire("最少兩名成員");
        return;
      }
      this.$swal
        .fire({
          title: "確定要刪除?",
          text: "該成員的項目也會同時刪除",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "確定刪除",
          cancelButtonText: "取消",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.memberTemp.deleMember.push(obj);
            const index = this.memberTemp.memberList.findIndex((item) => item.id === obj.id);
            this.memberTemp.memberList.splice(index, 1);
          } else if (result.isDenied) {
            return;
          }
        });
    },
    // 完成編輯成員
    doneEditMember: function (item) {
      // 判斷群組名
      if (!item.groupName) {
        this.$swal.fire("請輸入群組名稱");
        return;
      } else if (item.groupName.length > 10) {
        this.$swal.fire("名稱不可超過10個字");
        return;
      } else {
        this.groupData.groupName = item.groupName;
      }
      // 判斷使用者value
      const isValue = item.memberList.every((item) => item.name !== "");
      if (!isValue) {
        this.$swal.fire({
          title: "請輸入使用者名稱",
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      } else {
        let checkArr = item.memberList.map((item) => item.name);
        checkArr = checkArr.concat().sort();
        for (let i = 0; i < checkArr.length; i++) {
          if (checkArr[i] === checkArr[i + 1]) {
            this.$swal.fire({
              title: "使用者名稱重複!",
              showConfirmButton: false,
              timer: 1000,
            });
            return;
          }
        }
      }
      this.groupData.groupList = item.memberList;
      const members = this.groupData.groupList.map((item) => item.name);
      console.log(members);
      this.pushData(members, this.groupData.groupName, "Group1");
      this.isCalc = false;
      this.closeMember();
      this.render();
    },
    pushData: function (members, groupName, name) {
      this.$router.push({
        component: "Header",
        params: { members, groupName, name },
      });
    },
  },
  mounted() {
    this.getStorage();
    if (this.groupData.groupList.length > 0) {
      return;
    } else {
      this.createData();
    }
  },
  computed: {
    perTotalPrice: function () {
      return (item) => {
        item.totalPrice = item.list.reduce((pre, cur) => pre + cur.price, 0);
        return item.totalPrice;
      };
    },
    calTotalPrice: function () {
      const priceArr = this.groupData.groupList.map((item) => item.totalPrice);
      return priceArr.reduce((pre, cur) => pre + cur, 0);
    },
    perAveragePrice: function () {
      return Math.round(this.calTotalPrice / this.groupData.groupList.length);
    },
    calPay: function () {
      return (price) => {
        if (price > this.perAveragePrice) {
          return `應收 $${price - this.perAveragePrice}`;
        } else if (price <= this.perAveragePrice) {
          return `應付 $${this.perAveragePrice - price}`;
        }
      };
    },
    members: function () {
      return this.groupData.groupList.map((item) => item.name);
    },
  },
};
</script>