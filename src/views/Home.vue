<template>
  <section class="groupBlock">
    <div class="container">
      <ul class="groupList" data-aos="fade-right">
        <li v-for="i in groupData" :key="i.id" class="groupName" :class="{ unActive: i.member.length === 0 }">
          <div class="title d-flex justify-content-between">
            <h2>{{ i.groupName }}</h2>
            <button @click="deleGroup(i)" type="button"><font-awesome-icon icon="fa-solid fa-trash" size="xl" /></button>
          </div>
          <div class="member d-flex">
            <p>成員：</p>
            <ul class="d-flex align-item-center">
              <li v-for="(member, index) in i.member" :key="index">{{ member }}</li>
            </ul>
          </div>
          <div class="goPath" @click="openEdit(i)">
            <span v-if="i.member.length === 0"
              >建立
              <font-awesome-icon icon="fa-solid fa-arrow-right-long" />
            </span>
            <span v-else
              >進入
              <font-awesome-icon icon="fa-solid fa-arrow-right-long" />
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div class="editBlock" :class="{ show: isEdit }">
      <div class="blockHead d-flex justify-content-between align-item-center">
        <h3>新增群組</h3>
        <button @click="closeEdit" type="button" class="editBtn"><font-awesome-icon icon="fa-solid fa-xmark" size="2x" /></button>
      </div>
      <div class="blockMain">
        <input type="text" v-model="temp.groupName" placeholder="群組名稱(不超過10個字)" ref="autofocus" />
        <ul>
          <li v-for="i in temp.member" :key="i.id" class="d-flex align-item-center justify-content-between">
            <label :for="i.id">成員</label>
            <input :id="i.id" type="text" v-model="i.name" />
            <button @click="deleMember(i)" type="button" class="editBtn">
              <font-awesome-icon icon="fa-solid fa-minus" />
            </button>
          </li>
        </ul>
      </div>
      <div class="blockBottom">
        <button @click="addMember" class="circleBtn addNewBtn" type="button"><font-awesome-icon icon="fa-solid fa-plus" /></button>
        <button @click="doneEdit(temp)" class="lgBtn" type="button">開始記帳</button>
      </div>
    </div>
    <footer><p>©2022 GOGODUTCH//. All Rights Reserved.</p></footer>
  </section>
</template>

<script>
export default {
  data() {
    return {
      groupData: [
        {
          id: 1,
          groupName: "新增群組",
          member: [],
        },
      ],
      isEdit: false,
      temp: {
        groupName: "",
        id: 0,
        member: [
          {
            id: 1,
            name: "",
          },
          {
            id: 2,
            name: "",
          },
        ],
      },
    };
  },
  methods: {
    /* localstorage 相關 */
    saveStorage() {
      const data = JSON.stringify(this.groupData);
      localStorage.setItem("HomeData", data);
    },
    getStorage() {
      const data = JSON.parse(localStorage.getItem("HomeData"));
      if (data) {
        this.groupData = data;
      }
    },
    goPath(id) {
      this.$router.push({
        name: "Groups",
        params: {
          id,
        },
      });
    },
    closeEdit() {
      this.isEdit = false;
      this.temp = {
        groupName: "",
        id: 0,
        member: [
          {
            id: 1,
            name: "",
          },
          {
            id: 2,
            name: "",
          },
        ],
      };
    },
    openEdit(item) {
      if (item.member.length > 0) {
        this.goPath(item.id);
      } else if (item.member.length === 0 || !this.isEdit) {
        this.temp.id = item.id;
        this.isEdit = true;
        this.$refs.autofocus.focus();
      }
    },
    doneEdit(item) {
      const memberList = item.member.map((item) => item.name);
      const isValue = item.member.every((item) => item.name !== "");
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
      }
      if (!isValue) {
        this.$swal.fire({
          title: "請輸入使用者名稱!",
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      } else {
        let checkArr = memberList.concat().sort();
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
      this.groupData.forEach((item) => {
        if (item.id === this.temp.id) {
          item.groupName = this.temp.groupName;
          item.member = memberList;
          this.goPath(item.id);
        }
      });
      this.saveStorage();
      this.closeEdit();
    },
    addMember() {
      if (this.temp.member.length >= 8) {
        this.$swal.fire({
          title: "最多八名成員!",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        const allIds = this.temp.member.map((i) => i.id);
        this.temp.member.push({
          id: Math.max(...allIds) + 1 || this.temp.member.length + 1,
          name: "",
        });
      }
    },
    deleMember(obj) {
      if (this.temp.member.length <= 2) {
        this.$swal.fire({
          title: "最少兩名成員!",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        const index = this.temp.member.findIndex((item) => item.id === obj.id);
        this.temp.member.splice(index, 1);
      }
    },
    deleGroup(item) {
      if (this.groupData.length > 1 || this.groupData[0].member.length > 0) {
        this.$swal
          .fire({
            title: "確定要刪除?",
            text: "該群組的項目也會同時刪除",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "確定刪除",
            cancelButtonText: "取消",
          })
          .then((result) => {
            if (result.isConfirmed) {
              const index = this.groupData.findIndex((i) => i.id === item.id);
              localStorage.removeItem(`group${this.groupData[index].id}`);
              this.groupData.splice(index, 1);
              this.$swal.fire({
                title: "刪除成功",
                showConfirmButton: false,
                timer: 1000,
              });
              if (this.groupData.length === 0) {
                this.groupData[0] = {
                  id: 1,
                  groupName: "新增群組",
                  member: [],
                };
              }
            }
            this.saveStorage();
          });
      }
    },
    pushData(item) {
      if (item) {
        this.groupData.push(item);
        this.openEdit(item);
        this.saveStorage();
      } else {
        this.openEdit(this.groupData[0]);
      }
    },
  },
  mounted() {
    this.getStorage();
    window.scrollTo(0, 0);
  },
  created() {
    this.$bus.$on("pushNew", (i) => {
      this.pushData(i);
    });
  },
  beforeDestroy() {
    this.$bus.$off("pushNew");
  },
};
</script>
