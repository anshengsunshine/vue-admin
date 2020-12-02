<template>
  <div id="nav_wrap">
    <div class="logo">
      <img class="logo" src="@/assets/logo.png" />
    </div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <!-- 一级菜单 -->
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span slot="title">{{ item.meta.name }}</span>
          </template>

          <!-- 子菜单 -->
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
            >{{ subItem.meta.name }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {
  reactive,
  ref,
  isRef,
  toRefs,
  onMounted,
  computed,
} from "@vue/composition-api";
export default {
  name: "Nav",
  setup(props, { root }) {
    /**
     *  data数据
     * */
    // const isCollapse = ref(false);
    const routers = reactive(root.$router.options.routes);

    /**
     * 监听 computed
     */
    const isCollapse = computed(() => root.$store.state.app.isCollapse);

    return {
      isCollapse,
      routers,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/config.scss";
.logo {
  text-align: center;
  img {
    margin: 28px auto 25px;
    width: 92px;
    @include webkit(transition, all 0.3s ease 0s);
  }
}
#nav_wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: $navColor;
  @include webkit(transition, all 0.3s ease 0s);
  svg {
    margin-right: 10px;
    font-size: 20px;
  }
}
.open {
  #nav_wrap {
    width: $navMenu;
  }
}
.close {
  #nav_wrap {
    width: $navMenuMin;
  }
  .logo img {
    width: 60%;
  }
}
</style>