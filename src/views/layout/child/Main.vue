<template>
  <div id="main_wrap">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Main",
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/config.scss";
#main_wrap {
  position: fixed;
  top: 75px;
  left: $navMenu;
  right: 0;
  bottom: 0;
  border: 30px solid #f7f7f7;
  border-bottom: none;
  box-sizing: border;
}
</style>