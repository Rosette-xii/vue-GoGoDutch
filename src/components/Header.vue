<template>
  <nav>
    <div class="navBar">
      <h1><img alt="gogodutch logo" src="../assets/images/gogodutch-en-logo.svg" /></h1>
      <button @click="addNewGroup" v-if="this.$route.path === '/'" type="button" class="navBtn circleBtn"><font-awesome-icon icon="fa-solid fa-plus" /></button>
      <button @click="goPath" v-else type="button" class="navBtn circleBtn"><font-awesome-icon icon="fa-solid fa-arrow-left-long" /></button>
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
      if (data) {
        const allIds = data.map((i) => i.id);
        this.newGroup = {
          id: +Math.max(...allIds) + 1,
          groupName: "新增群組",
          member: [],
        };
        this.$bus.$emit("pushNew", this.newGroup);
        this.$swal.fire({
          title: "新增成功",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        this.$bus.$emit("pushNew");
      }
    },
    goPath() {
      this.$router.push("/");
    },
  },
  mounted() {
    window.addEventListener("scroll", this.addShadow);
  },
};
</script>

