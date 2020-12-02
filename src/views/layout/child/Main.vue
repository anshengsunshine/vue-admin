<template>
  <div id="main_wrap">
    <div class="main_content">
      <div class="content">
        <router-view />
      </div>
    </div>
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
  height: 100vh;
  // position: fixed;
  // top: 75px;
  // left: $navMenu;
  // right: 0;
  // bottom: 0;
  // border: 30px solid #f7f7f7;
  // border-bottom: none;
  // box-sizing: border;
}
.main_content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 30;
  padding-left: $navMenu + 30;
  padding-right: 30px;
  @include webkit(box-sizing,border-box);
  @include webkit(transition,all 0.3s ease 0s);
}
.open {
  .main_content {
    padding-left: $navMenu + 30;
  }
}
.close {
  .main_content {
    padding-left: $navMenuMin + 30;
  }
}
.content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0;
  background-color: #fff;
  @include webkit(box-sizing,border-box);
}
</style>