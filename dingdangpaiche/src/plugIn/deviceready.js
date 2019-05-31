
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '../router/router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
});

var that = new Vue({
  router,
});
// 返回键监听
$(function(){
  that.$router.push({ path: '/home'})
  //绑定返回键
  let onDeviceReady = () => {
    //navigator.splashscreen.hide();
    document.addEventListener("backbutton", onBackKeyDown, false);
  }
  //返回键执行内容
  let onBackKeyDown = () => {
    // Toast.showShort('再点击一次退出!');
    if(location.hash.indexOf("home") > -1){
      console.log("再点一次退出")
      document.removeEventListener("backbutton", onBackKeyDown, false); // 注销返回键
      document.addEventListener("backbutton", exitApp, false); //绑定退出事件
      // 3秒后重新注册
      var intervalID = window.setInterval(() => {
        window.clearInterval(intervalID);
        document.removeEventListener("backbutton", exitApp, false); // 注销返回键
        document.addEventListener("backbutton", onBackKeyDown, false); // 返回键
      },
      3000);
    }else if(location.hash.indexOf("auction/details") > -1){
      that.$router.push({ path: '/home'})
    }else if(location.hash.indexOf("auction/dominantInjury") > -1){
      that.$router.push({ path: '/auction/details', query: {auctionId: that.$route.query.auctionId,carId: that.$route.query.carId,status: that.$route.query.status}})
    }else if(location.hash.indexOf("/auction/imgDetail") > -1){
      that.$router.push({ path: '/auction/dominantInjury', query: {auctionId: that.$route.query.auctionId,carId: that.$route.query.carId,status: that.$route.query.status}})
    }else if(location.hash.indexOf("auction/recessiveInjury") > -1){
      that.$router.push({ path: '/auction/details', query: {auctionId: that.$route.query.auctionId,carId: that.$route.query.carId,status: that.$route.query.status}})
    }else if(location.hash.indexOf("auction/certificates") > -1){
      that.$router.push({ path: '/auction/details', query: {auctionId: that.$route.query.auctionId,carId: that.$route.query.carId,status: that.$route.query.status}})
    }else if(location.hash.indexOf("myMoney") > -1){
      that.$router.push({ path: '/home'})
    }else if(location.hash.indexOf("recharge") > -1){
      that.$router.push({ path: '/myMoney'})
    }else if(location.hash.indexOf("personalData") > -1){
      that.$router.push({ path: '/home'})
    }else if(location.hash.indexOf("register") > -1){
      that.$router.push({ path: '/login'})
    }else if(location.hash.indexOf("order") > -1){
      that.$router.push({ path: '/home'})
    }
  }
  //退出app
  let exitApp = () => {
    // navigator.app.exitApp();
    console.log("退出！")
  }


  document.addEventListener("deviceready", onDeviceReady, false);
});
