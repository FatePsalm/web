<!-- 注册 -->
<template>
  <div id="register" class="por">
    <header class="oh reg_header" :class="{ 'pad_ios': isiOS, 'pad_android': isAndroid}">
      <router-link to="login"><img src="../../img/icon_all_backBlack@3x.png" alt="" class="fl"></router-link>
    </header>
    <div class="reg_content">
      <div class="por">
        <input type="tel" maxlength='11' placeholder="请输入手机号" class="inputBox reg_content_ph" v-model='uPhone' v-focus="reg_focusName" @input='inputV("uPhone","reg_uPhC")' @focus='focusEvent("uPhone","reg_uPhC",$event)' @blur='blurEvent($event)'>
        <img src="../../img/icon_input_clear@3x.png"class="poa closeBtn" @click='closeBtn("uPhone","reg_focusName","reg_uPhC")' v-show='reg_uPhC'>
      </div>
      <div class="por">
        <p class="reg_referee fl">推荐人</p>
        <!-- <mu-switch class="fr reg_switch" trackClass='reg_track' v-model='switchVal' @input='switchEvent($event)' /> -->
      </div>
      <div class="por" v-if='switchVal'>
        <input type="tel" maxlength='11' placeholder="推荐人手机号" class="inputBox reg_content_ph" v-model='refereePhone' v-focus="reg_focusReferee" @input='inputV("refereePhone","reg_uPrC")' @focus='focusEvent("refereePhone","reg_uPrC",$event)' @blur='blurEvent($event)'>
        <img src="../../img/icon_input_clear@3x.png"class="poa closeBtn" @click='closeBtn("refereePhone","reg_focusReferee","reg_uPrC")' v-show='reg_uPrC'>
      </div>
      <div class="por">
        <input type="number" placeholder="请输入验证码" class="inputBox reg_content_pwd" v-model='uPassword' v-focus="reg_focusPwd" @input='inputV("uPassword","reg_uPwC")' @focus='focusEvent("uPassword","reg_uPwC",$event)' @blur='blurEvent($event)'>
        <img src="../../img/icon_input_clear@3x.png" class="closeBtn closeBtn_b" @click='closeBtn("uPassword","reg_focusPwd","reg_uPwC")' v-show='reg_uPwC' >
        <span class="reg_sendOut" v-if='timerBool' @click='senoutEvent'>获取验证码</span>
        <span class="reg_sendOut" v-else>{{timer}}s后重新获取</span>
      </div>
    </div>
    <p class="regBtn" @click='register'>{{btnName}}</p>
    <!-- <div class="reg_agreement">
      <mu-checkbox class="regAgreement fl" iconClass='regAgreement' v-model='regAgreement'/>
      <p class="fl">已阅读并同意<span>《用户协议》</span></p>
    </div> -->

    <div class="promptMask" :class="{ 'pad_ios': isiOS, 'pad_android': isAndroid}" v-if='promptMask'></div>
    <p class="prompt" :class="{ 'top_ios': isiOS, 'top_android': isAndroid}" id='prompt'>{{promptText}}</p>
    <pop-up :state.sync='popState' :name="popName"></pop-up>
    <confirm-larer :state.sync='layState' :title="layTitle" :content="layContent"></confirm-larer>
  </div>
</template>

<script>
  import popUp from "../../components/common/popUp.vue";
  import confirmLarer from "../../components/common/confirmLayer.vue";
  import { Indicator } from 'mint-ui';

  export default {
    name: 'reg',
    data () {
      return {
        uPassword: "",
        uPhone: '',
        refereePhone: "",
        popState: false,
        popName: "",
        layState: false,  //确认弹窗开关
        layTitle: "",   //layer标题
        layContent: "", //layer内容
        reg_focusName: false,
        reg_focusPwd: false,
        reg_focusReferee: false,
        reg_uPhC: false,
        reg_uPwC: false,
        reg_uPrC: false,
        timer: 60,
        timerBool: true,
        promptText: "",
        switchVal: true,
        referee_if: "1",
        btnName: "立即注册",
        loginAgreement: true,
        promptMask: false,
        // regAgreement: true
      }
    },
    components: {
      popUp,
      confirmLarer
		},
    directives: {
      focus: {
        update: function (el, {value}) {
          if (value) {
            el.focus()
          }
        }
      }
    },
    methods:{
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
      //调用提示弹层
      popUp (text) {
        this.popState = true;
        this.popName = text;
      },
      //调用确认弹层
      confirmLarer (title,content) {
        this.layState = true;
        this.layTitle = title;
        this.layContent = content;
      },
      //注册
      register () {
        // if(this.regAgreement){  //判断是否勾选协议
          if(this.referee_if == "1"){ //没有推荐人
            if(this.uPhone.length == 11 && this.uPassword.length == 6){
              Indicator.open();
              this.$http.post(this.rootUrl + 'Registration/doAUserReg',{
                  account: this.uPhone,
                  isRmd: 1,
                  password: this.uPassword
                },{emulateJSON:true}).then((data) => {
                  Indicator.close();
                  if(data.body.status == 1000){
                    this.confirmLarer("申请成功","您的注册申请已提交，请留意工作人员电话");
                    this.$router.push({ path: '/login'})
                  }else{
                    this.prompt(data.body.message)
                  }
              },(data) => {
                Indicator.close();
                this.prompt("服务器响应失败")
              })
            }else{
              this.prompt("输入信息有误，请重新输入")
            }
          }else if(this.referee_if == "0"){ //有推荐人
            if(this.uPhone.length == 11 && this.uPassword.length == 6 && this.refereePhone.length == 11){
              Indicator.open();
              this.$http.post(this.rootUrl + 'Registration/doAUserReg',{
                  account: this.uPhone,
                  isRmd: 0,
                  password: this.uPassword,
                  recommend: this.refereePhone
                },{emulateJSON:true}).then((data) => {
                  Indicator.close();
                  if(data.body.status == 1000){
                    this.confirmLarer("注册成功","您已成功注册");
                    this.$router.push({ path: '/login'});
                  }else{
                    this.prompt(data.body.message)
                  }
              },(data) => {
                Indicator.close();
                this.prompt("服务器响应失败")
              })
            }else{
              this.prompt("输入信息有误，请重新输入")
            }
          }
        // }else{
        //   this.prompt("请先阅读用户协议")
        // }
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
          Indicator.open();
          this.$http.post(this.rootUrl + 'Login/doACode',{
              account: this.uPhone,
              flag: 2
            },{emulateJSON:true}).then((data) => {
              Indicator.close();
              if(data.body.status == 1000){
              }else{
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
      focusEvent (val,Btn,e) {
        $(e.target).css("border-bottom-color","#4A90E2");
        this.reg_uPhC = false;
        this.reg_uPwC = false;
        this.reg_uPrC = false;
        this.reg_focusName = false;
        this.reg_focusPwd = false;
        this.reg_focusReferee = false;
        if(this[val].length > 0){
          this[Btn] = true;
        }else{
          this[Btn] = false;
        }
      },
      //失焦
      blurEvent (e) {
        this.reg_uPhC = false;
        this.reg_uPwC = false;
        this.reg_uPrC = false;
        $(e.target).css("border-bottom-color","#F3F4F5");
      },
      switchEvent (e) {
        if(e){
          this.referee_if = "0";
          this.btnName = "免费注册";
        }else{
          this.referee_if = "1";
          this.refereePhone = "";
          this.btnName = "免费申请";
        }
      }
    },
    mounted () {
      $("body").css("background-color","#fff");
      $("#register").css({"min-height": window.screen.height-34*(window.innerWidth/375) + "px"})
    }
  }
</script>

<style lang="scss">
  body{
    background: #fff;
  }
  .reg_header{
    width: 3.75rem;
    // height: 0.45rem;
    background: #fff;
    position: fixed;
    top: 0;
    z-index: 1000;
    img{
      width: 0.13rem;
      height: 0.21rem;
      margin: 0.12rem;
    }
  }
  .reg_content{
    padding: 0 0.375rem;
    overflow: hidden;
    font-size: 0;
    padding-top: 1.23rem;
    height: 3.23rem;
    .por{
      width: 3rem;
      border-bottom: 1px solid #F3F4F5;
      height: 0.5rem;
      padding-top: 0.1rem;
    }
    .reg_content_ph{
      width: 3rem;
      padding: 0.1rem 0 0.1rem 0.02rem;
      border: none;
      outline: none;
      font-size: 0.14rem;
      color: #333333;
    }
    .reg_referee{
      padding: 0.1rem 0 0.1rem 0.02rem;
      font-size: 0.14rem;
      color: #333333;
      line-height: 0.2rem;
    }
    // 开关样式start
    .reg_switch{
      width: 0.44rem;
      height: 0.25rem;
      margin-top: 0.05rem;
    }
    .mu-switch-container{
      padding: 0;
      width: 0.44rem;
    }
    .mu-switch-thumb{
      width: 0.25rem;
      height: 0.25rem;
      top: 0;
      background-color: #fff;
    }
    .reg_track{
      height: 0.25rem;
    }
    .mu-switch input[type=checkbox]:checked+.mu-switch-wrapper .mu-switch-track{
      background-color: #44DB5E;
    }
    .mu-switch input[type=checkbox]:checked+.mu-switch-wrapper .mu-switch-thumb{
      color: #fff;
      background-color: #fff;
    }
    // 开关样式end
    .reg_content_pwd{
      width: 3rem;
      padding: 0.1rem 1.03rem 0.1rem 0.02rem;
      border: none;
      outline: none;
      font-size: 0.14rem;
      color: #333333;
    }
    .closeBtn{
      position: absolute;
      width: 0.18rem;
      height: 0.18rem;
      top: 0.21rem;
      right: 0;
      z-index: 2;
    }
    .closeBtn_b{
      right: 1.04rem;
    }
    .reg_sendOut{
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
  .regBtn{
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
  // .reg_agreement{
  //   width: 3.75rem;
  //   height: 0.2rem;
  //   position: absolute;
  //   left: 0;
  //   bottom: 0.2rem;
  //   // .regAgreement{
  //   //   width: 0.15rem;
  //   //   height: 0.15rem;
  //   //   margin: 0.005rem 0.04rem 0 1rem;
  //   //   .mu-checkbox-wrapper{
  //   //     height: 0.15rem;
  //   //     .mu-checkbox-icon{
  //   //       height: 0.15rem;
  //   //       .regAgreement{
  //   //         width: 0.15rem;
  //   //         height: 0.15rem;
  //   //         margin: 0;
  //   //         color: #50C572;
  //   //       }
  //   //     }
  //   //   }
  //   // }
  //   p{
  //     font-size: 0.12rem;
  //     color: #B2B2B2;
  //     line-height: 0.17rem;
  //     span{
  //       color: #5597E4;
  //     }
  //   }
  // }
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
