import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

require("@/store/subscribe");

axios.defaults.baseURL = "http://localhost:3000/api";

Vue.config.productionTip = false;

store
  .dispatch("auth/attempt", {
    user: JSON.parse(localStorage.getItem("via-feedback@user")),
    token: localStorage.getItem("via-feedback@token")
  })
  .then(() => {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  });
