<!-- recharge -->
<!-- 充值 -->
<template>
  <div class="">
    <header class="oh rc_header" :class="{ 'pad_ios': isiOS, 'pad_android': isAndroid}">
      <router-link to="myMoney"><img class="fl" src="../../../img/icon_all_backBlack@3x.png" alt=""></router-link>
      <p class="fl text">充值</p>
    </header>
    <div class="rc_content">
      <div class="rc_money">
        <p class="text">余额充值（元）</p>
        <input class="input_" placeholder="请输入充值金额" v-model='rechargeAmount' type="number" name="">
        <div class="sel_btn oh">
          <p class="fl mrr sel" @click='sel_money($event,"2000")'>2000</p>
          <p class="fl mrr" @click='sel_money($event,"5000")'>5000</p>
          <p class="fl" @click='sel_money($event,"10000")'>10000</p>
        </div>
      </div>
      <div class="rc_mode">
        <p class="text">支付方式</p>
        <div class="paymentMethod" @click='selState($event,"zhifubao")'>
          <img class="fl state" src="../../../img/icon_pay_alipay@3x.png" alt="">
          <p class="fl text">支付宝支付</p>
          <img v-if='zhifubao' class="fr sel_" src="../../../img/icon_money_sure@3x.png" alt="">
          <span v-else class="fr selN"></span>
        </div>
        <!-- <div class="paymentMethod" @click='selState($event,"weixin")'>
          <img class="fl state" src="../../../img/icon_pay_weichatpay@3x.png" alt="">
          <p class="fl text">微信支付</p>
          <img v-if='weixin' class="fr sel_" src="../../../img/icon_money_sure@3x.png" alt="">
          <span v-else class="fr selN"></span>
        </div> -->
      </div>
      <p class="rc_btn" @click='recharge'>立即充值</p>
      <p class="footer">点击立即充值，即表示您已阅读并同意<router-link to="rechargeClause"><span>《充值服务条款》</span></router-link></p>
    </div>

    <pop-up :state.sync='popState' :name="popName"></pop-up>
    <confirm-larer :state.sync='layState' :title="layTitle" :content="layContent"></confirm-larer>
  </div>
</template>

<script>
  import popUp from "../../../components/common/popUp.vue";
  import confirmLarer from "../../../components/common/confirmLayer.vue";
  import { Indicator } from 'mint-ui';

  export default {
    name: 'certificates',
    data () {
      return {
        popState: false,
        popName: "",
        layState: false,  //确认弹窗开关
        layTitle: "",   //layer标题
        layContent: "", //layer内容
        zhifubao: true,
        weixin: false,
        paymentMethod: 1,
        rechargeAmount: 2000  //充值金额
      }
    },
    components: {
      popUp,
      confirmLarer,
		},
    methods:{
      //调用弹层
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
      //立即充值
      recharge () {
        Indicator.open();
        let thisJson = {
          money: this.rechargeAmount,
          mtype: 5,
          mchannel: 2,
          auserId: localStorage.getItem("userId")
        }
        let that = this;
        if(this.paymentMethod == 1){    //支付宝支付
          this.$http.post(this.rootUrl + 'PayOrder/addPayOrder',{
              data: this.encryptByDES(JSON.stringify(thisJson),"i9pxkpe7m57k6n3669xtfmtneaovmypn")
            },{emulateJSON:true}).then((data) => {
              Indicator.close();
              if(data.body.status == 1000){
                const payInfo = data.body.data.resultThree;
                cordova.plugins.alipay.payment(payInfo,function success(e){
                  if(e.resultStatus == 9000){
                    that.confirmLarer("提示","支付成功");
                  }else if(e.resultStatus == 8000){
                    that.confirmLarer("提示","订单处理中");
                  }
                },function error(e){
                  if(e.resultStatus == 4000){
                    that.confirmLarer("错误","订单支付失败");
                  }else if(e.resultStatus == 6001){
                    that.confirmLarer("错误","您取消了支付");
                  }else if(e.resultStatus == 6002){
                    that.confirmLarer("错误","网络错误");
                  }
                });
              }else if(data.body.status == 1001 || data.body.status == 1003 || data.body.status ==1004 || data.body.status ==1005){
                this.popUp(data.body.message)
              }
          }, (data) => {
            Indicator.close();
            this.popUp("服务器响应失败");
          })
        }else if(this.paymentMethod == 2){    //微信支付

        }
      },
      //选择支付方式
      selState (e,paymentMethod) {
        if(paymentMethod == "zhifubao"){
          this.paymentMethod = 1;
        }else if(paymentMethod == "weixin"){
          this.paymentMethod = 2;
        }
        this.zhifubao = false;
        this.weixin = false;
        this[paymentMethod] = true;
      },
      //选择充值金额
      sel_money (e,money) {
        $(".sel").removeClass("sel");
        $(e.target).addClass("sel");
        this.rechargeAmount = money;
      }
    },
    mounted () {
      $("body").css("background-color","#FAFAFA");
    }
  }
</script>

<style lang="scss" scoped>
  body{
    background: #FAFAFA;
  }
  .rc_header{
    width: 3.75rem;
    // height: 0.45rem;
    background-color: #F9F9F9;
    border-bottom: 1px solid #D6D6D6;
    position: fixed;
    top: 0;
    z-index: 1000;
    img{
      width: 0.37rem;
      height: 0.45rem;
      padding: 0.12rem;
    }
    .text{
      width: 2.9rem;
      text-align: center;
      line-height: 0.45rem;
      font-size: 0.17rem;
      color: #030303;
    }
  }
  .rc_content{
    margin-top: 0.45rem;
    background-color: #FAFAFA;
    .rc_money{
      width: 3.75rem;
      height: 1.8rem;
      padding: 0.16rem 0.14rem 0.32rem 0.14rem;
      background-color: #fff;
      border-bottom: 1px solid #F1F2F2;
      .text{
        font-size: 0.14rem;
        color: #B3B3B3;
        line-height: 0.2rem;
      }
      .input_{
        margin-top: 0.1rem;
        width: 3.47rem;
        height: 0.4rem;
        border-radius: 0.04rem;
        outline: none;
        border: 1px solid #D8D8D8;
        padding: 0.08rem 0.1rem;
        font-size: 0.18rem;
        color: #333333;
      }
      .sel_btn{
        margin-top: 0.22rem;
        width: 3.47rem;
        p{
          width: 1rem;
          height: 0.4rem;
          font-size: 0.16rem;
          color: #4A90E2;
          line-height: 0.4rem;
          text-align: center;
          border-radius: 0.04rem;
          border: 1px solid #2AABFE;
        }
        .mrr{
          margin-right: 0.23rem;
        }
        .sel{
          background-color: #2AABFE;
          color: #fff;
        }
      }
    }
    .rc_mode{
      width: 3.75rem;
      padding: 0.18rem 0.14rem;
      background-color: #fff;
      margin-top: 0.1rem;
      border-top: 1px solid #F1F2F2;
      border-bottom: 1px solid #F1F2F2;
      .text{
        font-size: 0.14rem;
        color: #B2B2B2;
        line-height: 0.2rem;
      }
      .paymentMethod{
        margin-top: 0.18rem;
        width: 3.47rem;
        height: 0.22rem;
        .state{
          width: 0.22rem;
          height: 0.22rem;
          margin-right: 0.08rem;
        }
        .text{
          font-size: 0.16rem;
          color: #333333;
          line-height: 0.22rem;
        }
        .sel_{
          width: 0.2rem;
          height: 0.2rem;
          margin-top: 0.01rem;
        }
        .selN{
          background: #FFFFFF;
          border: 1px solid #E8EAEB;
          width: 0.2rem;
          height: 0.2rem;
          border-radius: 50%;
          margin-top: 0.01rem;
        }
      }
    }
    .rc_btn{
      width: 3.2rem;
      height: 0.5rem;
      background-color: #2FA9FB;
      margin: auto;
      margin-top: 1.2rem;
      text-align: center;
      line-height: 0.5rem;
      color: #fff;
      font-size: 0.16rem;
      border-radius: 1rem;
    }
    .footer{
      width: 3.75rem;
      margin-top: 0.54rem;
      font-size: 0.12rem;
      color: #B2B2B2;
      line-height: 0.17rem;
      text-align: center;
      span{
        color: #2FA9FB;
      }
    }
  }
</style>
