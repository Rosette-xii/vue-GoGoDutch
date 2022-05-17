<template>
  <nav>
    <div class="navBar">
      <h1><img alt="gogodutch logo" src="../assets/images/gogodutch-en-logo.svg" /></h1>
      <button @click="goPath" v-if="showBtn" type="button" class="navBtn circleBtn"><font-awesome-icon icon="fa-solid fa-arrow-left-long" /></button>
    </div>
  </nav>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      scroll: 0,
    };
  },
  methods: {
    addShadow: function () {
      this.scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const navbar = document.querySelector("nav");
      if (this.scroll > 0) {
        navbar.classList.add("add-shadow");
      } else {
        navbar.classList.remove("add-shadow");
      }
    },
    goPath: function () {
      const groupName = this.$route.params.groupName;
      const members = this.$route.params.members;
      const name = this.$route.params.name;
      if (members || groupName || name) {
        this.$router.push({
          name: "Home",
          params: { members, groupName, name },
        });
      } else {
        this.$router.push("/");
      }
    },
  },
  computed: {
    showBtn: function () {
      return this.$route.path !== "/";
    },
  },

  mounted() {
    window.addEventListener("scroll", this.addShadow);
  },
};
</script>

