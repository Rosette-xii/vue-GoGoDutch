<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>
<script>
import Header from "@/components/Header.vue";

export default {
  name: "app",
  components: {
    Header,
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Roboto:wght@300;400;500;700&display=swap");
@import "./assets/style/CSS/all.css";
</style>
