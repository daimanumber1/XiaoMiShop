// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import axios from "axios";
import Vuex from "vuex";
import infiniteScroll from "vue-infinite-scroll";
import store from "./vuex/store.js";
Vue.use(infiniteScroll);
Vue.use(ElementUI);
Vue.config.productionTip = false;
/* eslint-disable no-new */

new Vue({
  el: "#app",
  router,
  store,
  components: {
    App
  },
  template: "<App />",
  methods: {
    checkIsLogin() {
      axios.get("http://127.0.0.1:3000/checkLogin").then(res => {
        console.log(res);
          if(res.data.username){
            this.$store.commit('updateLoginName',res.data.username);
          }
      });
    }
  },
  mounted() {
    this.checkIsLogin();
  }
});
