<template>
  <section class="groupBlock">
    <ul class="container" data-aos="fade-right">
      <li @click="openEdit(item)" v-for="item in groupData" :key="item.id" class="group" :class="{ active: item.member.length > 0 }">
        <h2>{{ item.groupName }}</h2>
        <div class="member d-flex">
          <p>成員：</p>
          <ul class="d-flex align-item-center">
            <li v-for="(member, index) in item.member" :key="index">{{ member }}</li>
          </ul>
        </div>
        <a href="#"><span v-if="item.member.length === 0">建立</span><span v-else>進入</span><font-awesome-icon icon="fa-solid fa-arrow-right-long" /></a>
      </li>
    </ul>
    <div class="editBlock" :class="{ show: isEdit }">
      <div class="blockHead d-flex justify-content-between align-item-center">
        <h3>新增群組</h3>
        <button @click="closeEdit" type="button" class="editBtn"><font-awesome-icon icon="fa-solid fa-xmark" size="2x" /></button>
      </div>
      <div class="blockMain">
        <input type="text" v-model="temp.groupName" placeholder="群組名稱(不超過10個字)" />
        <ul>
          <li v-for="item in temp.member" :key="item.id" class="d-flex align-item-center justify-content-between">
            <label :for="item.id">成員</label>
            <input :id="item.id" type="text" v-model="item.name" />
            <button @click="deleMember(item)" type="button" class="editBtn">
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
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  data() {
    return {
      storageKey: "HomeData",
      groupData: [
        {
          id: 1,
          path: "/Group1",
          name: "Group1",
          groupName: "新增群組",
          member: [],
        },
        {
          id: 2,
          path: "/Group2",
          name: "Group2",
          groupName: "新增群組",
          member: [],
        },
        {
          id: 3,
          path: "/Group3",
          name: "Group3",
          groupName: "新增群組",
          member: [],
        },
        {
          id: 4,
          path: "/Group4",
          name: "Group4",
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
    pushData: function (groupName, memberData, name) {
      this.$router.push({
        name: name,
        params: { groupName, memberData },
      });
    },
    goPath: function (path) {
      this.$router.push(path);
    },
    closeEdit: function () {
      this.isEdit = !this.isEdit;
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
    openEdit: function (item) {
      if (item.member.length > 0) {
        this.goPath(item.path);
      } else if (item.member.length > 0 || this.isEdit === true) {
        return;
      } else {
        this.temp.id = item.id;
        this.isEdit = !this.isEdit;
      }
    },
    doneEdit: function (item) {
      const memberList = item.member.map((item) => item.name);
      if (!item.groupName) {
        this.$swal.fire("請輸入群組名稱");
        return;
      } else if (item.groupName.length > 10) {
        this.$swal.fire("名稱不可超過10個字");
        return;
      }
      const isValue = item.member.every((item) => item.name !== "");
      if (!isValue) {
        this.$swal.fire({
          title: "請輸入使用者名稱",
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
      this.isEdit = !this.isEdit;
      this.groupData.forEach((item) => {
        if (item.id === this.temp.id) {
          item.groupName = this.temp.groupName;
          item.member = memberList;
          this.pushData(item.groupName, memberList, item.name);
        }
      });
      this.render();
      this.closeEdit();
    },
    addMember: function () {
      if (this.temp.member.length >= 8) {
        this.$swal.fire("最多八名成員");
        return;
      }
      this.temp.member.push({
        id: Date.now(),
        name: "",
      });
    },
    deleMember: function (obj) {
      if (this.temp.member.length <= 2) {
        this.$swal.fire("最少兩名成員");
        return;
      }
      const index = this.temp.member.findIndex((item) => item.id === obj.id);
      this.temp.member.splice(index, 1);
    },
    init: function () {
      const members = this.$route.params.members;
      const groupName = this.$route.params.groupName;
      const name = this.$route.params.name;
      if (!name) {
        this.getStorage();
      } else {
        this.groupData.filter((item) => {
          if (item.name === name) {
            item.groupName = groupName;
            item.member = members;
          }
        });
        this.render();
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>

