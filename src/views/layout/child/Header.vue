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
      <div class="header_icon pull_left" @click="exit">
        <svg-icon iconClass="exit" className="exit" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/composition-api";
export default {
  name: "Header",
  setup(props, { root }) {
    const username = computed(() => root.$store.state.app.username);
    const navMenuState = () => root.$store.commit("app/SET_Collapse");

    // 退出
    const exit = () => {
      root.$store.dispatch("app/exit").then((res) => {
        root.$router.push({
          name: "Login",
        });
      });
    };

    return {
      navMenuState,
      username,
      exit,
    };
  },
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
  line-height: 75px;
  background-color: #fff;
  @include webkit(box-shadow, 0 3px 16px 16px rgba(0, 0, 0, 0.1));
  @include webkit(transition, all 0.3s ease 0s);
}
.open {
  #header_wrap {
    left: $navMenu;
  }
}
.close {
  #header_wrap {
    left: $navMenuMin;
  }
}

.header_icon {
  padding: 0 32px;
  svg {
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
  }
}
.user_info {
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
  + .header_icon {
    padding: 0 32px;
  }
  img {
    display: inline-block;
    margin-bottom: -12px;
    margin-right: 18px;
    border-radius: 50px;
  }
}
</style>