<template>
  <div>
    <el-form :inline="true" class="demo_form_inline">
      <el-row :gutter="14">
        <el-col :span="4">
          <div class="label_wrap category">
            <label for>分类：</label>
            <div class="wrap_content">
              <el-select
                v-model="category_value"
                placeholder="请选择"
                style="width: 120px"
              >
                <el-option
                  v-for="item in options.category"
                  :key="item.id"
                  :label="item.category_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="label_wrap date">
            <label>日期：</label>
            <div class="wrap_content date">
              <el-date-picker
                v-model="date_value"
                type="datetimerange"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd HH:mm:ss"
                align="right"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00', '08:00:00']"
                style="width: 100%"
              ></el-date-picker>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="label_wrap key_word">
            <label>关键字：</label>
            <div class="wrap_content">
              <el-select v-model="search_value" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in search_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <el-input
            v-model="search_keyWork"
            placeholder="请输入内容"
            style="width: 100%"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" style="width: 100%">搜索</el-button>
        </el-col>
        <el-col :span="3">&nbsp;</el-col>
        <el-col :span="2">
          <el-button
            class="pull_right"
            type="danger"
            style="width: 100%"
            @click="dialog_info = true"
            >新增</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <div class="black_space_30"></div>
    <!-- 表格数据 -->
    <el-table :data="table_data" border style="width: 100%">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column
        align="center"
        prop="title"
        label="标题"
        width="830"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="category"
        label="类型"
        width="130"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="date"
        label="日期"
        width="237"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="user"
        label="管理员"
        width="115"
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="delectItem">删除</el-button>
          <el-button type="success" size="mini" @click="dialog_info = true"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="black_space_30"></div>
    <!-- 底部分页 -->
    <el-row>
      <el-col :span="12">
        <el-button size="medium" @click="delectAll">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="pull_right"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100]"
          layout="total,sizes,prev,pager,next,jumper"
          :total="1000"
        ></el-pagination>
      </el-col>
    </el-row>

    <!-- 新增弹窗 -->
    <dialog-comp :flag.sync="dialog_info" />
  </div>
</template>

<script>
import { GetCategory } from "@/api/info";
// import { common } from "@/api/common";
import DialogComp from "@/components/dialog/DialogComp";
import { ref, reactive, onMounted, watch } from "@vue/composition-api";
export default {
  name: "InfoList",
  components: {
    DialogComp,
  },
  setup(props, { root }) {
    // const { getInfoCategory, categoryItem } = common();

    /**
     * ref  数据
     */
    const category_value = ref("");
    const date_value = ref("");
    const search_value = ref("id");
    const search_keyWork = ref("");
    const dialog_info = ref(false);

    /**
     * reactive 对象
     */
    // 类型
    const options = reactive({
      category: [],
    });
    // 搜索关键字
    const search_options = reactive([
      {
        value: "id",
        label: "ID",
      },
      {
        value: "title",
        label: "标题",
      },
    ]);
    // 表格数据
    const table_data = reactive([
      {
        title: "纽约市长白思豪宣布退出总统竞选 特朗普发推回应",
        category: "国内信息",
        date: "2019-09-10 19:31:31",
        user: "管理员",
      },
      {
        title:
          "习近平在中央政协工作会议暨庆祝中国人名政治协商会议成立70周年大会上发表重要讲话",
        category: "国内信息",
        date: "2019-09-10 19:31:31",
        user: "管理员",
      },
      {
        title: "基里巴斯与台当局“断交”系蔡当局上台后断交第7国",
        category: "国内信息",
        date: "2019-09-10 19:31:31",
        user: "管理员",
      },
      {
        title: "不选了！纽约市长白思豪宣布退出2020美国大选",
        category: "国内信息",
        date: "2019-09-10 19:31:31",
        user: "管理员",
      },
    ]);

    /**
     * 方法-methods
     * */
    const handleSizeChange = (val) => {
      console.log("size--val", val);
    };
    const handleCurrentChange = (val) => {
      console.log("current--val", val);
    };
    const delectItem = () => {
      root.confirm({
        content: "确认删除当前信息，确认后将无法恢复！！",
        tip: "警告",
        fn: confirmDelect,
        id: "11212",
      });
    };
    const delectAll = () => {
      root.confirm({
        content: "确认删除所选中的数据，确认后将无法恢复！！",
        type: "success",
      });
    };
    const confirmDelect = (val) => {
      console.log(val);
    };

    const getInfoCategory = () => {
      root.$store.dispatch("common/getInfoCategory").then((res) => {
        options.category = res;
      });
    };

    /**
     * onMounted
     */
    onMounted(() => {
      getInfoCategory();
    });

    /**
     * watch
     */
    watch(
      () => categoryItem.item,
      (value) => {
        console.log(value);
        options.category = value;
      }
    );

    return {
      //ref
      category_value,
      date_value,
      search_value,
      search_keyWork,
      dialog_info,
      // reactive
      options,
      search_options,
      table_data,
      // vue2.0 methods
      handleSizeChange,
      handleCurrentChange,
      delectItem,
      delectAll,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/config.scss";
.label_wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 93, 40);
  }
  &.key_word {
    @include labelDom(right, 99, 40);
  }
}
</style>
