<template>
  <div id="layout" :class="[menuStatus ? 'close' : 'open']">
    <layout-header />
    <layout-main />
    <layout-nav />
  </div>
</template>

<script>
import { computed } from "@vue/composition-api";
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
  setup(props, { root }) {
    const menuStatus = computed(() => root.$store.state.app.isCollapse);
    return {
      menuStatus,
    };
  },
};
</script>
<style lang="scss" scoped>
</style>