<template>
  <nav>
    <div class="navBar">
      <router-link to="/">
        <h1><img alt="gogodutch logo" src="../assets/images/gogodutch-en-logo.svg" /></h1>
      </router-link>
      <button @click="addNewGroup" v-if="this.$route.path === '/'" type="button" class="navBtn circleBtn"><font-awesome-icon icon="fa-solid fa-plus" size="lg" /></button>
      <button @click="goPath" v-else type="button" class="navBtn circleBtn"><font-awesome-icon icon="fa-solid fa-arrow-left-long" size="lg" /></button>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      scroll: 0,
      newGroup: {},
    };
  },
  methods: {
    addShadow() {
      this.scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const navbar = document.querySelector("nav");
      if (this.scroll > 0) {
        navbar.classList.add("add-shadow");
      } else {
        navbar.classList.remove("add-shadow");
      }
    },
    addNewGroup() {
      const data = JSON.parse(window.localStorage.getItem("HomeData"));
      if (!data || (data.length === 1 && data[0].member.length === 0)) {
        this.$bus.$emit("pushNew");
      } else {
        const allIds = data.map((i) => i.id);
        this.newGroup = {
          id: +Math.max(...allIds) + 1,
          groupName: "新增群組",
          member: [],
        };
        this.$bus.$emit("pushNew", this.newGroup);
      }
    },
    goPath() {
      this.$router.push("/");
    },
  },
  mounted() {},
};
</script>

