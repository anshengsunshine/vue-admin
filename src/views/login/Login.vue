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
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        class="login_form"
        size="medium"
      >
        <el-form-item prop="username" class="item_form">
          <label for="username">邮箱</label>
          <el-input
            id="username"
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item_form">
          <label for="password">密码</label>
          <el-input
            id="password"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="passwords"
          class="item_form"
          v-show="model === 'register'"
        >
          <label for="passwords">重复密码</label>
          <el-input
            id="passwords"
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <label for="code">验证码</label>
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input
                id="code"
                v-model="ruleForm.code"
                minlength="6"
                maxlength="6"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="block"
                @click="getSms()"
                :disabled="codeBtnStatus.status"
                >{{ codeBtnStatus.text }}</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('loginForm')"
            class="login_btn block"
            :disabled="loginBtnStatus"
            >{{ model === "login" ? "登录" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import sha1 from "js-sha1";
import { GetSms, Register, Login } from "@/api/login";
import { reactive, ref, onMounted } from "@vue/composition-api";
import {
  stripscript,
  validateEmail,
  validatePass,
  validateVCode,
} from "@/utils/validate";
export default {
  name: "Login",
  setup(props, { refs, root }) {
    // setup(props, context) {
    // console.log(context);
    // 表单的数据
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: "",
    });
    /**
     * 校验用户名
     */
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式有误!"));
      } else {
        callback();
      }
    };
    /**
     * 校验密码
     */
    let validatePassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码为6-20位的数字和字母!"));
      } else {
        callback();
      }
    };
    /**
     * 校验重复密码
     */
    let validatePasswords = (rule, value, callback) => {
      // 如果模块值为login，验证直接通过
      if (model.value === "login") {
        callback();
      }
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("两次密码输入不一致!"));
      } else {
        callback();
      }
    };
    /**
     * 校验验证码
     */
    let validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else if (validateVCode(value)) {
        return callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    const menuTab = reactive([
      { txt: "登录", isCurrent: true, type: "login" },
      { txt: "注册", isCurrent: false, type: "register" },
    ]);

    // 模块值
    const model = ref("login");
    //登录/注册按钮禁用
    const loginBtnStatus = ref(true);
    // 验证码按钮状态
    const codeBtnStatus = reactive({
      status: false,
      text: "获取验证码",
    });
    // 倒计时
    const timer = ref(null);

    /**
     * 修改按钮验证状态
     */
    const UpdataBtnStatus = (params) => {
      codeBtnStatus.status = params.status;
      codeBtnStatus.text = params.text;
    };

    // 表单数据的校验规则
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }],
    });

    /**
     * 改变登录/注册选中
     */
    const toggleMenu = (data) => {
      menuTab.forEach((item) => {
        item.isCurrent = false;
      });
      data.isCurrent = true; // 选中高亮
      model.value = data.type; // 当前选中的注册/登录
      refs.loginForm.resetFields(); //重置表单
    };

    /**
     * 倒计时
     */
    const countDown = (number) => {
      // 判断定时器是否存在，存在则清除
      if (timer.value) {
        clearInterval(timer.value);
      }
      let time = number;
      timer.value = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(timer.value);
          // codeBtnStatus.status = false;
          // codeBtnStatus.text = "再次获取";
          UpdataBtnStatus({ status: false, text: "再次获取" });
        }
        codeBtnStatus.text = `倒计时${time}秒`;
      }, 1000);
    };

    /**
     * 清除倒计时
     */
    const clearCountDown = () => {
      // 还原验证码按钮默认状态
      // codeBtnStatus.status = false;
      // codeBtnStatus.text = "获取验证码";
      UpdataBtnStatus({ status: false, text: "获取验证码" });
      // 清除倒计时
      clearInterval(timer.value);
    };

    /**
     * 获取验证码
     */
    const getSms = () => {
      if (ruleForm.username == "") {
        root.$message.error("邮箱不能为空");
        return false;
      }
      if (validateEmail(ruleForm.username)) {
        root.$message.error("邮箱格式有误，请重新输入");
        return false;
      }
      // 获取验证码
      let requestData = {
        username: ruleForm.username,
        module: model.value,
      };

      //修改获取验证码的按钮状态
      // codeBtnStatus.status = true;
      // codeBtnStatus.text = "发送中";
      UpdataBtnStatus({ status: true, text: "发送中" });
      setTimeout(() => {
        GetSms(requestData)
          .then((res) => {
            let data = res.data;
            root.$message({
              message: data.message,
              type: "success",
            });
            //启用登录和注册按钮
            loginBtnStatus.value = false;
            // 调定时器，倒计时
            countDown(60);
          })
          .catch((err) => {
            console.log("err", err);
          });
      }, 3000);
    };

    /**
     * 提交表单
     */
    const submitForm = (formName) => {
      refs[formName].validate((valid) => {
        if (valid) {
          model.value == "login" ? login() : register();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    /**
     * 登录
     */
    const login = () => {
      let requestData = {
        username: ruleForm.username,
        password: ruleForm.password,
        code: ruleForm.code,
      };
      root.$store
        .dispatch("app/login", requestData)
        .then((res) => {
          console.log(res);
          // 页面跳转
          root.$router.push({
            name: "Console",
          });
        })
        .catch((err) => {
          console.log(err);
        });
      // Login(requestData)
      //   .then((res) => {
      //     // 页面跳转
      //     root.$router.push({
      //       name: "Console",
      //     });
      //   })
      //   .catch((err) => {});
    };

    /**
     * 注册
     */
    const register = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: "register",
      };
      Register(requestData)
        .then((res) => {
          let data = res.data;
          root.$message({
            message: data.message,
            type: "success",
          });
          // 模拟注册成功
          toggleMenu(menuTab[0]);
          clearCountDown();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    onMounted(() => {});

    return {
      menuTab,
      model,
      loginBtnStatus,
      codeBtnStatus,
      ruleForm,
      rules,
      toggleMenu,
      submitForm,
      getSms,
      UpdataBtnStatus,
    };
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
  .login_form {
    margin-top: 29px;
    label {
      display: block;
      margin-bottom: 3px;
      font-size: 14px;
      color: #fff;
    }
    .item_form {
      margin-bottom: 13px;
    }
    .login_btn {
    }
    .block {
      width: 100%;
      display: block;
    }
  }
}
</style>
