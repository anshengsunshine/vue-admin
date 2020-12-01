<template>
  <div id="nav_wrap"></div>
</template>

<script>
export default {
  name: "Nav",
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/config.scss";
#nav_wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
}
</style>