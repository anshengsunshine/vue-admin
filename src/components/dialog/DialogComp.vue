<template>
  <el-dialog
    title="新增"
    :visible.sync="dialog_info_flag"
    @close="close"
    width="580px"
  >
    <el-form :model="form">
      <el-form-item label="类型：" :label-width="formLabelWidth">
        <el-select v-model="form.regin" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" :label-width="formLabelWidth">
        <el-input v-model="form.name" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="概况：" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          v-model="form.name"
          placeholder="请输入内容"
          style="height: 160px"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @close="close" @click="dialogFormVisible = false"
        >取 消</el-button
      >
      <el-button type="danger" @click="dialogFormVisible = false"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import {
  ref,
  reactive,
  isRef,
  toRefs,
  onMounted,
  watch,
} from "@vue/composition-api";
export default {
  name: "DialogComp",
  props: {
    flag: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const dialog_info_flag = ref(false);
    const formLabelWidth = ref("70px");
    const form = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: "",
    });

    /**
     * watch
     */
    watch(() => (dialog_info_flag.value = props.flag));

    /**
     * methods
     */
    const close = () => {
      dialog_info_flag.value = false;
      emit("update:flag", false);
    };

    return {
      // ref
      dialog_info_flag,
      formLabelWidth,
      //reactive
      form,
      //methods
      close,
    };
  },
};
</script>

<style>
</style>