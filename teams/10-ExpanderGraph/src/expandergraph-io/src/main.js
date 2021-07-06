import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from 'ant-design-vue';
// 内部引入
import "./assets/css/reset.css";

// 外部引入
import "ant-design-vue/dist/antd.css";
import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false;

Vue.use(Antd);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
