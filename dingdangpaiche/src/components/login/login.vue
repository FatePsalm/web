<!-- 登陆 -->
<template>
  <div id="login" class="por">
    <header class="oh login_header">
      <img src="../../img/icon_auction_logo@3x.png" alt="" class="fl">
      <h3 class="fl">叮当拍车</h3>
    </header>
    <div class="login_content">
      <div class="por">
        <input type="tel" maxlength='11' placeholder="请输入帐号" class="inputBox login_content_ph" v-model='uPhone' v-focus="focusName" @input='inputV("uPhone","uPhC")' @focus='focusEvent("uPwC","uPhone","uPhC",$event)' @blur='blurEvent($event)'>
        <img src="../../img/icon_input_clear@3x.png" class="poa closeBtn" @click='closeBtn("uPhone","focusName","uPhC")' v-show='uPhC'>
      </div>
      <div class="por fl">
        <input type="number" placeholder="请输入验证码" class="inputBox login_content_pwd" v-model='uPassword' v-focus="focusPwd" @input='inputV("uPassword","uPwC")' @focus='focusEvent("uPhC","uPassword","uPwC",$event)' @blur='blurEvent($event)'>
        <img src="../../img/icon_input_clear@3x.png" class="closeBtn closeBtn_b" @click='closeBtn("uPassword","focusPwd","uPwC")' v-show='uPwC' >
        <span class="login_sendOut" v-if='timerBool' @click='senoutEvent'>获取验证码</span>
        <span class="login_sendOut" v-else>{{timer}}s后重新获取</span>
      </div>
    </div>
    <p class="loginBtn" @click='login'>登陆</p>
    <p class="login_register" @click='register_router'>注册</p>
    <div class="login_agreement">
      <mu-checkbox class="loginAgreement fl" iconClass='loginAgreement' v-model='loginAgreement'/>
      <p class="fl">已阅读并同意<router-link to="userAgreement"><span>《用户协议》</span></router-link></p>
    </div>
    <div class="promptMask" :class="{ 'pad_ios': isiOS, 'pad_android': isAndroid}" v-if='promptMask'></div>
    <p class="prompt" :class="{ 'top_ios': isiOS, 'top_android': isAndroid}" id='prompt'>{{promptText}}</p>
    <pop-up :state.sync='popState' :name="popName"></pop-up>
  </div>
</template>

<script>
  import popUp from "../../components/common/popUp.vue";
  import {mapState, mapMutations} from 'vuex';
  import { Indicator } from 'mint-ui';

  export default {
    name: 'login',
    data () {
      return {
        uPassword: "",  //验证码
        uPhone: '', //手机号
        popState: false,  //打开弹层
        popName: "",  //弹层内容
        focusName: false, //聚焦失焦判定
        focusPwd: false,
        uPhC: false,
        uPwC: false,
        timer: 60,  //发送验证码定时器初始化
        timerBool: true,  //发送验证码状态
        promptText: "",  //提示内容
        loginAgreement: true, //用户协议状态
        promptMask: false, //提示警告模版状态
      }
    },
    components: {
      popUp,
		},
    directives: {
      focus: {
        update: (el, {value}) => {
          if (value) {
            el.focus()
          }
        }
      }
    },
    computed: {
      ...mapState({
				userInfo: state => state.userInfo,
			})
    },
    methods: {
      ...mapMutations([
        'setuserInfo'
      ]),
      //提示警告
      prompt (str) {
        this.promptMask = true;
        this.promptText = str;
        $("#prompt").css("height","0.4rem");
        setTimeout(() => {
          this.promptMask = false;
          $("#prompt").css("height","0rem");
        },2000)
      },
      //调用弹层
      popUp (text) {
        this.popState = true;
        this.popName = text;
      },
      //登陆
      login () {
        if(this.uPhone.length == 11 && this.uPassword.length == 6 && this.loginAgreement == true){
          Indicator.open();
          this.$http.post(this.rootUrl + 'Login/doAUserLogin',{
              account: this.uPhone,
              password: this.uPassword
            },{emulateJSON:true}).then((data) => {
              Indicator.close();
              if(data.body.status == 1000){
                this.setuserInfo(data.body.data)
                localStorage.setItem("uPhone",this.uPhone)
                localStorage.setItem("staff",data.body.data.staff)
                localStorage.setItem("userId",data.body.data.id)
                this.$router.push({ path: '/home'})
              }else if(data.body.status == 1001 || data.body.status == 1003 || data.body.status ==1004 || data.body.status ==1005){
                this.prompt(data.body.message)
              }
          }, (data) => {
            Indicator.close();
            this.prompt("服务器响应失败");
          })
        }else if(!this.loginAgreement){
          this.prompt("请先阅读用户协议");
        }else if(this.uPhone.length != 11 || this.uPassword.length != 6){
          this.prompt("帐号或验证码有误，请重新输入");
        }
      },
      // 发送验证码
      senoutEvent () {
        this.timerBool = false;
        this.timer = 60;
        var timers = setInterval(() => {
          this.timer--;
          if(this.timer == 0){
            this.timerBool = true;
            clearInterval(timers);
          }
        },1000)
        if(this.uPhone.length == 11){
          Indicator.open()
          this.$http.post(this.rootUrl + 'Login/doACode',{
              account: this.uPhone,
              flag: 1
            },{emulateJSON:true}).then((data) => {
              Indicator.close();
              if(data.body.status == 1000){

              }else if(data.body.status == 1001 || data.body.status == 1003){
                this.prompt(data.body.message);
                this.timerBool = true;
                clearInterval(timers);
              }
          }, (data) => {
            Indicator.close();
            this.prompt("服务器响应失败");
            this.timerBool = true;
            clearInterval(timers);
          });
        }else{
          this.prompt("请输入正确的联系电话");
          this.timerBool = true;
          clearInterval(timers);
        }
      },
      //清空输入框
      closeBtn (type,focus,btn) {
        this[type] = "";
        this[focus] = true;
        this[btn] = false;
      },
      //监听value长度
      inputV (val,btn) {
        if(this[val].length > 0){
          this[btn] = true;
        }else{
          this[btn] = false;
        }
      },
      //聚焦事件
      focusEvent (btn,val,tBtn,e) {
        $(e.target).css("border-bottom-color","#4A90E2");
        this[btn] = false;
        this.focusName = false;
        this.focusPwd = false;
        if(this[val].length > 0){
          this[tBtn] = true;
        }else{
          this[tBtn] = false;
        }
      },
      //失焦
      blurEvent (e) {
        this.uPhC = false;
        this.uPwC = false;
        $(e.target).css("border-bottom-color","#F3F4F5");
      },
      //注册
      register_router () {
        this.$router.push({ path: '/register'})
      }
    },
    mounted () {
      $("body").css("background-color","#fff");
      $("#login").css({"min-height": window.screen.height-34*(window.innerWidth/375) + "px"})

      if(localStorage.getItem("uPhone")){
        this.uPhone = localStorage.getItem("uPhone");
      }
    }
  }
</script>

<style lang="scss">
  body{
    background: #fff;
  }
  .login_header{
    padding: 1.15rem 0 1.15rem 1.15rem;
    img{
      width: 0.47rem;
      height: 0.32rem;
    }
    h3{
      font-size: 0.23rem;
      margin-left: 0.13rem;
      font-weight: 600;
      color: #4a90e2;
    }
  }
  .login_content{
    padding: 0 0.375rem;
    overflow: hidden;
    font-size: 0;
    .login_content_ph{
      width: 3rem;
      padding: 0.1rem 0 0.1rem 0.02rem;
      border: none;
      border-bottom: 1px solid #F3F4F5;
      outline: none;
      font-size: 0.14rem;
      color: #333333;
    }
    .login_content_pwd{
      width: 3rem;
      padding: 0.1rem 1.03rem 0.1rem 0.02rem;
      border: none;
      border-bottom: 1px solid #F3F4F5;
      outline: none;
      font-size: 0.14rem;
      color: #333333;
      margin-top: 0.1rem;
    }
    .closeBtn{
      position: absolute;
      width: 0.18rem;
      height: 0.18rem;
      top: 0.1rem;
      right: 0;
      z-index: 2;
    }
    .closeBtn_b{
      top: 0.21rem;
      right: 0.84rem;
    }
    .login_sendOut{
      height: 0.4rem;
      line-height: 0.4rem;
      border-radius: 0.04rem;
      font-size: 0.14rem;
      color: #B2B2B2;
      text-align: center;
      position: absolute;
      right: 0;
      top: 0.1rem;
      padding: 0 0.07rem;
    }
  }
  .loginBtn{
    width: 3rem;
    height: 0.44rem;
    margin: auto;
    font-size: 0.16rem;
    background-color: #4A90E2;
    color: #F9FBFE;
    border-radius: 0.04rem;
    text-align: center;
    line-height: 0.44rem;
    margin-top: 0.35rem;
  }
  .login_register{
    width: 0.36rem;
    text-align: center;
    font-size: 0.16rem;
    color: #4A90E2;
    margin: auto;
    margin-top: 0.2rem;
    border-bottom: 1px solid #4A90E2;
  }
  .login_agreement{
    width: 3.75rem;
    height: 0.2rem;
    position: absolute;
    left: 0;
    bottom: 0.2rem;
    .loginAgreement{
      width: 0.15rem;
      height: 0.15rem;
      margin: 0.005rem 0.04rem 0 1rem;
      .mu-checkbox-wrapper{
        height: 0.15rem;
        .mu-checkbox-icon{
          height: 0.15rem;
          .loginAgreement{
            width: 0.15rem;
            height: 0.15rem;
            margin: 0;
            color: #50C572;
          }
        }
      }
    }
    p{
      font-size: 0.12rem;
      color: #B2B2B2;
      line-height: 0.17rem;
      span{
        color: #5597E4;
      }
    }
  }
  .prompt{
    width: 3.75rem;
    height: 0rem;
    line-height: 0.4rem;
    text-align: center;
    background-color: #F60000;
    color: #fff;
    font-size: 0.14rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    transition: height .3s;
  }
  .top_android{
    top: 25px;
  }
  .top_ios{
    top: 20px;
  }
  .promptMask{
    width: 3.75rem;
    height: 6.67rem;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
