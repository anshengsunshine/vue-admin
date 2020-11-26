<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    class="login_form"
    size="medium"
  >
    <el-form-item prop="username" class="item_form">
      <label>邮箱</label>
      <el-input
        type="text"
        v-model="ruleForm.username"
        autocomplete="off"
      ></el-input>
    </el-form-item>

    <el-form-item prop="password" class="item_form">
      <label>密码</label>
      <el-input
        type="text"
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
      <label>重复密码</label>
      <el-input
        type="text"
        v-model="ruleForm.passwords"
        autocomplete="off"
        minlength="6"
        maxlength="20"
      ></el-input>
    </el-form-item>

    <el-form-item prop="code">
      <label>验证码</label>
      <el-row :gutter="20">
        <el-col :span="15">
          <el-input
            v-model.number="ruleForm.code"
            minlength="6"
            maxlength="6"
          ></el-input>
        </el-col>
        <el-col :span="9">
          <el-button type="success" class="block">获取验证码</el-button>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item>
      <el-button
        type="danger"
        @click="submitForm('ruleForm')"
        class="login_btn block"
        >提交</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, ref, onMounted } from "@vue/composition-api";
import {
  stripscript,
  validateEmail,
  validatePass,
  validateVCode,
} from "@/utils/validate";
export default {
  name: "LoginForm",
  props: {
    model: {
      type: String,
      default: "login",
    },
  },
  setup(props, context) {
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

    //表单数据
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: "",
    });
    // 表单数据的校验规则
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }],
    });

    return {
      ruleForm,
      rules,
      validateUsername,
      validatePassword,
      validatePasswords,
      validateCode,
    };
  },

  data() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
