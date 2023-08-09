import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false

function url() {
  if ((document.location.href.slice(0, 5)) == 'https') {
    return document.location.href.slice(0, (document.location.href.length-1));
  }
  else {
    let baseAddress = document.location.href.slice(4, 7);
    baseAddress += (document.location.href.split('//')[1].split(':')[0] + ':3000');
    return baseAddress = 'http' + baseAddress;
  }
}
Vue.prototype.$http = axios.create({
  baseURL: url(),
  timeout: 600000
});
new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')