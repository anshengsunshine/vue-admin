import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";
import "./assets/styles/main.scss";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCompositionApi from '@vue/composition-api';
import "./router/premit"
// 自定义全局的方法
import global from "./utils/global"
//自定义全局组件
import "./icons"

Vue.use(global)
Vue.use(VueCompositionApi);
Vue.use(ElementUI, {
  size: 'small',
  zIndex: 3000
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");