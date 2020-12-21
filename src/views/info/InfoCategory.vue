<template>
  <div id="category">
    <el-button type="danger" @click="addFirst">添加一级分类</el-button>
    <hr class="hr_e9e9e9" />

    <el-row :gutter="30">
      <el-col :span="8">
        <div class="category_wrap">
          <div class="category" v-for="firstItem in category.item" :key="firstItem.id">
            <h4>
              <svg-icon icon-class="plus"></svg-icon>
              {{ firstItem.category_name }}
              <div class="button_group">
                <el-button size="mini" type="danger" round>编辑</el-button>
                <el-button size="mini" type="success" round>添加子级</el-button>
                <el-button size="mini" round @click="delCategoryComfirm(firstItem.id)">删除</el-button>
              </div>
            </h4>
            <ul v-if="firstItem.children">
              <li v-for="childrenItem in firstItem.children" :key="childrenItem.id">
                {{ childrenItem.category_name }}
                <div class="button_group">
                  <el-button size="mini" type="danger" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <h4 class="menu_title">一级分类编辑</h4>
        <el-form label-width="142px" class="form_wrap" ref="categoryForm">
          <el-form-item label="一级分类名称：" prop="categoryName" v-if="category_first_input">
            <el-input v-model="form.categoryName" :disabled="category_first_disables"></el-input>
          </el-form-item>
          <el-form-item label="二级分类名称：" prop="setCategoryName" v-if="category_children_input">
            <el-input v-model="form.secCategoryName" :disabled="category_children_disables"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="danger"
              @click="submit"
              :loading="submit_btn_loading"
              :disabled="submit_btn_disabled"
            >确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { AddFristCategory, GetCategory, DelCatgory } from "@/api/info";
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
import { global } from "@/utils/global_V3.0.js";
export default {
  name: "InfoCategory",
  setup(props, { root, refs }) {
    /**
     * global
     */
    const { confirm } = global();

    /**
     * reactive
     */
    const form = reactive({
      categoryName: "",
      secCategoryName: ""
    });

    const category = reactive({
      item: []
    });

    /**
     * ref
     */
    const category_first_input = ref(true);
    const category_children_input = ref(true);
    const submit_btn_loading = ref(false);
    const category_first_disables = ref(true);
    const category_children_disables = ref(true);
    const submit_btn_disabled = ref(true);

    /**
     * methods
     */
    const submit = () => {
      if (!form.categoryName) {
        root.$message({
          message: "分类名称不能为空",
          type: "error"
        });
        return false;
      }
      // 按钮加载状态
      submit_btn_loading.value = true;
      AddFristCategory({ categoryName: form.categoryName })
        .then(res => {
          // console.log(res);
          let data = res.data;
          if (data.resCode === 0) {
            root.$message({
              message: data.message,
              type: "success"
            });
            category.item.push(res.data.data);
          }
          submit_btn_loading.value = false;
          //  refs.categoryForm.resetFields();
          form.categoryName = "";
          form.secCategoryName = "";
        })
        .catch(err => {
          submit_btn_loading.value = false;
          // refs.categoryForm.resetFields();
          form.categoryName = "";
          form.secCategoryName = "";
        });
    };

    const addFirst = () => {
      category_first_input.value = true;
      category_children_input.value = false;
      category_first_disables.value = false;
      submit_btn_disabled.value = false;
    };

    const getCategory = () => {
      GetCategory({})
        .then(res => {
          // console.log(res)
          let data = res.data.data.data;
          category.item = data;
        })
        .catch(err => {
          console.log(err);
        });
    };
 
    const delCategoryComfirm = categoryID => {

      confirm({
        content:"确认删除",
        tip:"警告",
        fn:confimDelete,
        id:"222"
      })



      DelCatgory({ categoryId: categoryID })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    };

    /**
     * 生命周期-DOM挂载完成后执行
     */
    onMounted(() => {
      getCategory();
    });

    return {
      //ref
      category_first_input,
      category_children_input,
      submit_btn_loading,
      category_first_disables,
      category_children_disables,
      submit_btn_disabled,
      //reactive
      form,
      category,
      //methods
      submit,
      addFirst,
      getCategory,
      delCategory
    };
  }
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
