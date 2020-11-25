<template>
  <div id="login">
    <div class="login_wrap">
      <ul class="menu_tab">
        <li
          v-for="(item, index) in menuTab"
          :key="index"
          :class="{ current: item.isCurrent }"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <login-from :model="model" />
    </div>
  </div>
</template>
<script>
import LoginFrom from "./LoginForm";
export default {
  name: "Login",
  components: {
    LoginFrom,
  },
  data() {
    return {
      model: "login",
      menuTab: [
        { txt: "登录", isCurrent: true, type: "login" },
        { txt: "注册", isCurrent: false, type: "register" },
      ],
      currentIndex: 0,
    };
  },
  mounted() {},
  methods: {
    toggleMenu(data) {
      this.menuTab.forEach((item) => {
        item.isCurrent = false;
      });
      data.isCurrent = true; // 选中高亮
      this.model = data.type; // 当前选中的注册/登录
    },
  },
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;

  .login_wrap {
    width: 330px;
    margin: auto;
  }

  .menu_tab {
    text-align: center;
    li {
      display: inline-block;
      width: 88px;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      border-radius: 2px;
      cursor: pointer;
    }
  }

  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>