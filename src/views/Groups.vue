<template>
  <section class="groupData">
    <div class="container">
      <div class="contentBlock" data-aos="fade-right">
        <div class="contentHead">
          <div class="groupName">
            <div class="title d-flex justify-content-between">
              <h2>{{ groupData.groupName }}</h2>
              <button @click="deleAllItem" type="button"><font-awesome-icon icon="fa-solid fa-trash" size="xl" /></button>
            </div>
            <p class="priceTotal">
              目前累積金額 $<span>{{ calTotalPrice }}</span>
            </p>
          </div>
          <div class="d-flex">
            <button @click="openEditMember" type="button" class="lgBtn">編輯成員</button>
            <button @click="openAddItem" type="button" class="lgBtn">新增項目</button>
          </div>
        </div>
        <ul class="contentMain">
          <li v-for="i in groupData.groupList" :key="i.key">
            <div class="userTitle d-flex align-item-center justify-content-between" @click="i.isHidden = !i.isHidden">
              <h3>{{ i.name }}</h3>
              <p>目前支出：{{ perTotalPrice(i) }}</p>
            </div>
            <ul class="contentList" :class="{ hidden: i.isHidden }">
              <li v-for="(obj, index) in i.list" :key="index">
                <div class="d-flex align-item-center justify-content-between">
                  <h4>{{ obj.content }}</h4>
                  <p class="d-flex align-item-center">
                    <span>${{ obj.price }}</span>
                    <button @click="openEditItem(obj)" type="button"><font-awesome-icon class="editBtn" icon="fa-solid fa-pen" /></button>
                    <button @click="deleItem(i, index)" type="button"><font-awesome-icon class="editBtn" icon="fa-solid fa-trash" /></button>
                  </p>
                </div>
                <p class="date">{{ obj.date }}</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="contentBottom" :class="{ overflowHidden: !isCalc }">
      <button v-if="isCalc === false" @click="isCalc = true" type="button" class="lgBtn">結算</button>
      <button v-else @click="isCalc = false" type="button" class="lgBtn">關閉 <font-awesome-icon icon="fa-solid fa-xmark" /></button>
      <div class="calcBlock" :class="{ hiddenCalcBlock: !isCalc }">
        <div class="calcTitle d-flex align-item-center justify-content-between">
          <h3>平均每人花費</h3>
          <p>${{ perAveragePrice }}</p>
        </div>
        <ul>
          <li v-for="i in groupData.groupList" :key="i.id" class="d-flex align-item-center justify-content-between">
            <h4>{{ i.name }}</h4>
            <p :class="{ pay: i.totalPrice < perAveragePrice }">{{ calPay(i.totalPrice) }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="editBlock editMember" :class="{ show: isEditMember }">
      <div class="blockHead d-flex justify-content-between align-item-center">
        <h3>編輯群組</h3>
        <button @click="isEditMember = false" type="button" class="editBtn"><font-awesome-icon icon="fa-solid fa-xmark" size="2x" /></button>
      </div>
      <div class="blockMain">
        <input type="text" v-model="memberTemp.groupName" placeholder="群組名稱" ref="focusMember" />
        <ul>
          <li v-for="i in memberTemp.memberList" :key="i.id" class="d-flex align-item-center justify-content-between">
            <label :for="i.id">成員</label>
            <input :id="i.id" v-model="i.name" type="text" />
            <button @click="deleMember(i)" type="button" class="editBtn">
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
        <button @click="closeAddItem" type="button" class="editBtn"><font-awesome-icon icon="fa-solid fa-xmark" size="2x" /></button>
      </div>
      <div class="blockMain">
        <input type="text" v-model="itemTemp.content" placeholder="項目名稱" ref="focusItem" />
        <input v-if="!this.itemTemp.isEdit" type="number" @focus="itemTemp.price = focusPrice(itemTemp.price)" v-model.number="itemTemp.price" placeholder="金額" />
        <input v-else type="number" v-model.number="itemTemp.price" placeholder="金額" />
        <vc-date-picker v-model="itemTemp.date">
          <template v-slot="{ inputValue, inputEvents }">
            <input class="bg-white border px-2 py-1 rounded" :value="inputValue" v-on="inputEvents" />
          </template>
        </vc-date-picker>
        <select v-model="itemTemp.name" class="selectHeight">
          <option value="" disabled>誰先付的</option>
          <option v-for="(i, index) in members" :key="index" :value="i">{{ i }}</option>
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
      homeData: null,
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
    saveStorage() {
      const data = JSON.stringify(this.groupData);
      localStorage.setItem(`group${this.$route.params.id}`, data);
    },
    getStorage() {
      const data = JSON.parse(window.localStorage.getItem(`group${this.$route.params.id}`));
      if (data) {
        this.groupData = data;
        this.homeData = JSON.parse(window.localStorage.getItem("HomeData"));
      } else {
        this.createData();
      }
    },
    createData() {
      const getAllData = JSON.parse(window.localStorage.getItem("HomeData"));
      this.homeData = getAllData;
      const curId = getAllData.findIndex((i) => i.id === this.$route.params.id);
      let setGroupList = getAllData[curId].member.map((name, idx) => {
        return {
          id: idx,
          name: name,
          list: [],
          isHidden: false,
          totalPrice: 0,
        };
      });
      this.groupData = {
        groupName: getAllData[curId].groupName,
        groupList: setGroupList,
      };
      this.saveStorage();
    },
    deleAllItem() {
      const checkLength = this.groupData.groupList.every((i) => i.list.length === 0);
      if (!checkLength) {
        this.$swal
          .fire({
            title: "確定要刪除全部資料嗎?",
            showCancelButton: true,
            confirmButtonText: "刪除",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.groupData.groupList.forEach((i) => {
                i.list = [];
              });
              this.$swal.fire({
                title: "刪除成功",
                showConfirmButton: false,
                timer: 1000,
              });
              this.saveStorage();
            }
          });
        this.isCalc = false;
      }
    },
    openAddItem() {
      if (this.isAdd) {
        return;
      } else {
        this.isAdd = true;
        setTimeout(() => {
          this.$refs.focusItem.focus();
        }, 100);
      }
    },
    closeAddItem() {
      this.isAdd = false;
      this.itemTemp = {
        name: "",
        content: "",
        price: 0,
        date: new Date(),
      };
    },
    addNewItem(i) {
      if (!i.content) {
        this.$swal.fire({
          title: "請輸入項目名稱!",
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      } else if (typeof i.price !== "number") {
        this.$swal.fire({
          title: "請輸入正確金額!",
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      } else if (!i.name) {
        this.$swal.fire({
          title: "請選擇支付對象!",
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      }
      const index = this.groupData.groupList.findIndex((obj) => obj.name === i.name);
      this.groupData.groupList[index].isHidden = false;
      this.groupData.groupList[index].list.push({
        id: Date.now(),
        name: i.name,
        content: i.content,
        price: +i.price || 0,
        date: `${i.date.getFullYear()}/${i.date.getMonth() + 1}/${i.date.getDate()}`,
        orignDate: i.date,
      });
      this.$swal.fire({
        title: "新增成功",
        showConfirmButton: false,
        timer: 1000,
      });
      this.isCalc = false;
      this.closeAddItem();
      this.saveStorage();
    },
    deleItem(i, idx) {
      this.$swal
        .fire({
          title: "確定要刪除嗎?",
          showCancelButton: true,
          confirmButtonText: "刪除",
        })
        .then((result) => {
          if (result.isConfirmed) {
            i.list.splice(idx, 1);
            this.$swal.fire({
              title: "刪除成功",
              showConfirmButton: false,
              timer: 1000,
            });
            this.isCalc = false;
            this.saveStorage();
          }
        });
    },
    openEditItem(i) {
      if (this.isAdd) {
        return;
      } else {
        this.isAdd = !this.isAdd;
        this.itemTemp = {
          id: i.id,
          currentName: i.name,
          name: i.name,
          content: i.content,
          price: +i.price,
          date: i.orignDate,
          isEdit: true,
        };
        setTimeout(() => {
          this.$refs.focusItem.focus();
        }, 100);
      }
    },
    doneEditItem(i) {
      const curMemberIdx = this.groupData.groupList.findIndex((obj) => obj.name === i.currentName);
      const idx = this.groupData.groupList[curMemberIdx].list.findIndex((obj) => obj.id === i.id);
      if (i.name === i.currentName) {
        const data = this.groupData.groupList[curMemberIdx].list[idx];
        data.content = i.content;
        data.price = +i.price || 0;
        data.date = `${i.date.getFullYear()}/${i.date.getMonth() + 1}/${i.date.getDate()}`;
        this.groupData.groupList[curMemberIdx].isHidden = false;
      } else {
        this.groupData.groupList[curMemberIdx].list.splice(idx, 1);
        const newMemberIdx = this.groupData.groupList.findIndex((obj) => obj.name === i.name);
        this.groupData.groupList[newMemberIdx].list.push({
          id: i.id,
          name: i.name,
          content: i.content,
          price: +i.price || 0,
          date: `${i.date.getFullYear()}/${i.date.getMonth() + 1}/${i.date.getDate()}`,
          orignDate: i.date,
        });
        this.groupData.groupList[newMemberIdx].isHidden = false;
      }
      this.$swal.fire({
        title: "編輯完成",
        showConfirmButton: false,
        timer: 1000,
      });
      this.isCalc = false;
      this.closeAddItem();
      this.saveStorage();
    },
    openEditMember() {
      if (this.isEditMember) {
        return;
      } else {
        this.isEditMember = true;
        this.memberTemp.groupName = this.groupData.groupName;
        this.memberTemp.memberList = JSON.parse(JSON.stringify(this.groupData.groupList));
        setTimeout(() => {
          this.$refs.focusMember.focus();
        }, 100);
      }
    },
    addTempMember() {
      if (this.memberTemp.memberList.length >= 8) {
        this.$swal.fire("最多八名成員");
      } else {
        this.memberTemp.memberList.push({
          id: Date.now(),
          name: "",
          list: [],
          isHidden: false,
          totalPrice: 0,
        });
      }
    },
    deleMember(obj) {
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
          }
        });
    },
    doneEditMember(item) {
      // 判斷群組名
      if (!item.groupName) {
        this.$swal.fire({
          title: "請輸入群組名稱!",
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      } else if (item.groupName.length > 10) {
        this.$swal.fire({
          title: "名稱不可超過10個字!",
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      } else {
        this.groupData.groupName = item.groupName;
      }
      // 判斷使用者value
      const isValue = item.memberList.every((item) => item.name !== "");
      if (!isValue) {
        this.$swal.fire({
          title: "請輸入使用者名稱!",
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
      this.groupData.groupList = JSON.parse(JSON.stringify(item.memberList));
      this.homeData.map((i) => {
        if (+i.id === +this.$route.params.id) {
          i.member = this.memberTemp.memberList.map((i) => i.name);
          i.groupName = this.memberTemp.groupName;
        }
        return i;
      });
      this.$swal.fire({
        title: "編輯完成",
        showConfirmButton: false,
        timer: 1000,
      });
      window.localStorage.setItem("HomeData", JSON.stringify(this.homeData));
      this.isEditMember = false;
      this.saveStorage();
    },
  },
  mounted() {
    this.getStorage();
    window.scrollTo(0, 0);
  },
  computed: {
    perTotalPrice() {
      return (item) => {
        item.totalPrice = item.list.reduce((pre, cur) => pre + cur.price, 0);
        return item.totalPrice;
      };
    },
    calTotalPrice() {
      const priceArr = this.groupData.groupList.map((item) => item.totalPrice);
      return priceArr.reduce((pre, cur) => pre + cur, 0);
    },
    perAveragePrice() {
      return Math.round(this.calTotalPrice / this.groupData.groupList.length);
    },
    calPay() {
      return (price) => {
        if (price > this.perAveragePrice) {
          return `應收 $${price - this.perAveragePrice}`;
        } else if (price <= this.perAveragePrice) {
          return `應付 $${this.perAveragePrice - price}`;
        }
      };
    },
    members() {
      return this.groupData.groupList.map((item) => item.name);
    },
    focusPrice() {
      return (i) => {
        return i === 0 ? "" : i;
      };
    },
  },
};
</script>