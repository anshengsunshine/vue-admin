<template>
  <div id="header_wrap">
    <div class="pull_left header_icon" @click="navMenuState">
      <svg-icon iconClass="menu" className="menu" />
    </div>
    <div class="pull_right">
      <div class="user_info pull_left">
        <img src="@/assets/images/face.jpg" />
        {{ username }}
      </div>
      <div class="header_icon pull_left" @click="logout">
        <svg-icon iconClass="exit" className="exit" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/composition-api"
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/config.scss";
#header_wrap {
  position: fixed;
  top: 0;
  left: $navMenu;
  right: 0;
  height: 75px;
  background-color: #fff;
  box-shadow: 0 3px 16px 16px rgba(0, 0, 0, 0.1);
}
.open{
  #header_wrap{
    left:$navMenu;
  }
}
</style>