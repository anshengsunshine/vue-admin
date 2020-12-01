<template>
  <div id="layout">
    <layout-header />
    <layout-main />
    <layout-nav />
  </div>
</template>

<script>
import LayoutHeader from "./child/Header";
import LayoutMain from "./child/Main";
import LayoutNav from "./child/Nav";
export default {
  name: "Layout",
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutNav,
  },
  setup(){

  }
};
</script>
<style lang="scss" scoped>
#layout{
    position: fixed;
}
</style>