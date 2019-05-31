<template>
  <transition name="component-fade" mode="out-in">
    <router-view :class="{ 'pad_ios': isiOS, 'pad_android': isAndroid}" :key="key"/>
  </transition>
</template>

<script>
  import { Toast } from 'mint-ui';
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: 'app',
    data () {
      return {
      }
    },
    components: {},
    computed: {
      key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
      },
      ...mapState({
				counter: state => state.counter,
			})
    },
    methods: {
      ...mapMutations([
        'setcounter'
      ]),
    },
    mounted(){
      if(this.counter){

      }else{
        this.setcounter(true)
        let that = this;
        //绑定返回键
        let onDeviceReady = () => {
          this.$router.push({ path: '/home'})
          //navigator.splashscreen.hide();
          document.addEventListener("backbutton", onBackKeyDown, false);
        }
        //返回键执行内容
        let onBackKeyDown = () => {
          if(location.href.indexOf("home") > -1 || location.href.indexOf("login") > -1){
            Toast({
              message: '再点一次退出',
              position: 'bottom',
              duration: 3000
            });
            document.removeEventListener("backbutton", onBackKeyDown, false); // 注销返回键
            document.addEventListener("backbutton", exitApp, false); //绑定退出事件
            // 3秒后重新注册
            var intervalID = window.setInterval(() => {
              window.clearInterval(intervalID);
              document.removeEventListener("backbutton", exitApp, false); // 注销返回键
              document.addEventListener("backbutton", onBackKeyDown, false); // 返回键
            },
            3000);
          }else if(location.href.indexOf("auction/details") > -1){
            that.$router.push({ path: '/home'})
          }else if(location.href.indexOf("auction/dominantInjury") > -1){
            that.$router.push({ path: '/auction/details', query: that.$route.query})
          }else if(location.href.indexOf("/auction/imgDetail") > -1 || location.href.indexOf("/userAgreement") > -1 || location.href.indexOf("/rechargeClause") > -1){
            this.$router.go(-1);
          }else if(location.href.indexOf("auction/recessiveInjury") > -1){
            that.$router.push({ path: '/auction/details', query: that.$route.query})
          }else if(location.href.indexOf("auction/certificates") > -1){
            that.$router.push({ path: '/auction/details', query: that.$route.query})
          }else if(location.href.indexOf("myMoney") > -1){
            that.$router.push({ path: '/home'})
          }else if(location.href.indexOf("recharge") > -1){
            that.$router.push({ path: '/myMoney'})
          }else if(location.href.indexOf("personalData") > -1){
            that.$router.push({ path: '/home'})
          }else if(location.href.indexOf("register") > -1){
            that.$router.push({ path: '/login'})
          }else if(location.href.indexOf("order") > -1){
            that.$router.push({ path: '/home'})
          }
        }
        //退出app
        let exitApp = () => {
          navigator.app.exitApp();
        }
        document.addEventListener("deviceready", onDeviceReady, false);
      }
    }
  }
</script>

<style>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity 0s ease;
}
.component-fade-enter, .component-fade-leave-to{
  opacity: 0;
}


.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter{
  transform: translateX(50px);
  opacity: 0;
}
.slide-fade-leave-to{
  transform: translateX(-50px);
  opacity: 0;
}

.pad_ios{
  padding-top: 20px;
}
.pad_android{
  /* border-top: 25px solid #000; */
  padding-top: 0px;
}
</style>
