// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from "vue-resource"
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import routes from './router/router'
import store from './store/' //vuex

import App from './App'

// import 'lib-flexible/flexible.js'
import 'swiper/dist/css/swiper.css'
import $ from 'jquery'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import calc from 'calculatorjs';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import CryptoJS from "./plugIn/tripledes.js";
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';

import '../src/style/reset.css'
import '../src/style/auto-size.js'
import '../src/plugIn/photoswipe.css'
import '../src/plugIn/default-skin/default-skin.css'
// import './plugIn/deviceready.js'

Vue.use(VueRouter)
Vue.use(VueResource)
// Vue.use(VueAxios,axios)
Vue.use(MuseUI)
Vue.use(MintUI)
Vue.use(VueAwesomeSwiper)
Vue.component('icon',Icon)

Vue.config.productionTip = false;

//自定义全局方法和变量
// 跨域携带cookie
Vue.http.interceptors.push(function(request, next) {
  request.credentials = true;
  next((response) => {
    if (response.bodyText != "" && JSON.parse(response.bodyText).status == 1404) {
      this.$router.push({ path: '/login'})
    }
  })
})
//四则运算
Vue.prototype.calc = calc;
//DES 加密
Vue.prototype.encryptByDES = (message, key) => {
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}
//DES 解密
Vue.prototype.decryptByDES = (ciphertext, key) => {
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
  }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

//判断系统类型
Vue.prototype.isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
Vue.prototype.isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

//视图高度
if(Vue.prototype.isAndroid){
  Vue.prototype.pullHeight = document.documentElement.clientHeight;
}else if(Vue.prototype.isiOS){
  Vue.prototype.pullHeight = document.documentElement.clientHeight - 20;
}


Vue.prototype.rootUrl = "https://www.dingdangshifu.cn/clank/";   //服务器正式服
// Vue.prototype.rootUrl = "http://39.108.70.214/clank/";   //服务器测试服
// Vue.prototype.rootUrl = "http://39.108.70.214:8080/clank/";  //测试服
// Vue.prototype.rootUrl = "http://192.168.1.8/clank/";   //本地测试服务器
// Vue.prototype.rootUrl = "http://192.168.1.57:8080/clank/";   //曹刚
// Vue.prototype.rootUrl = "http://192.168.1.9:8080/clank/";   //谢词栋
// Vue.prototype.rootUrl = "http://192.168.2.104:8080/clank/";  //邹聪

const router = new VueRouter({
  mode: 'history',   //去掉路由地址上的#
  routes
});

let newVue = new Vue({
	router,
	store,
  ...App,
}).$mount('#app')
