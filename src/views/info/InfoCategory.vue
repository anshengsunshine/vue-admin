<template>
  <div id="category">
    <el-button type="danger">添加一级分类</el-button>
    <hr class="hr_e9e9e9" />

    <el-row :gutter="30">
      <el-col :span="8">
        <div class="category_wrap">
          <div class="category">
            <h4>
              <svg-icon icon-class="plus"></svg-icon>
              新闻
              <div class="button_group">
                <el-button size="mini" type="danger" round>编辑</el-button>
                <el-button size="mini" type="success" round>添加子级</el-button>
                <el-button size="mini" round>删除</el-button>
              </div>
            </h4>
            <ul>
              <li>
                国内
                <div class="button_group">
                  <el-button size="mini" type="danger" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <h4 class="menu_title">一级分类编辑</h4>
        <el-form label-width="142px" class="form_wrap">
          <el-form-item label="一级分类名称：">
            <el-input v-model="form.categoryName"></el-input>
          </el-form-item>
          <el-form-item label="二级分类名称：">
            <el-input v-model="form.secCategoryName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submit">确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { AddFristCategory } from "@/api/info";
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
export default {
  name: "InfoCategory",
  setup(props) {
    const form = reactive({
      categoryName: "",
      secCategoryName: "",
    });

    /**
     * methods
     */
    const submit = () => {
      AddFristCategory({ categoryName: form.categoryName })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
    };

    return {
      form,
      submit,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/config.scss";
.category_wrap {
  div:first-child {
    &.before {
      top: 20px;
    }
  }
  div:last-child {
    &.before {
      bottom: 20px;
    }
  }
}
.menu_title {
  line-height: 44px;
  padding-left: 22px;
  background-color: #f3f3f3;
}
.category {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    left: 22px;
    top: 22px;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000;
  }

  h4 {
    position: relative;
    padding-left: 40px;
  }
  svg {
    position: absolute;
    left: 15px;
    top: 15px;
    font-size: 17px;
    background-color: #fff;
  }
  li {
    position: relative;
    padding-left: 36px;
    margin-left: 24px;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 22px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
  li,
  h4 {
    @include webkit(transition, all 0.5s ease 0s);
    &:hover {
      background-color: #f3f3f3;
      .button_group {
        display: block;
      }
    }
  }
}
.button_group {
  display: none;
  position: absolute;
  right: 11px;
  top: -1px;
  z-index: 2;
  button {
    font-size: 12px;
  }
}
.form_wrap {
  padding-top: 26px;
  width: 410px;
}
.hr_e9e9e9 {
  margin-left: -30px;
  margin-right: -30px;
  width: calc(100% + 60px);
  border: none;
  border-bottom: 1px solid #e9e9e9;
}
</style>