<!-- auction -->
<!-- 车主信息 -->
<template>
  <div>
    <transition name="component-fade" mode="out-in">
      <router-view :key="key" class="detail"/>
    </transition>
    <div v-show='auctionStatus' class="inAuction">
      <div class="top">
        <div class="record fl por">
          <p v-if='this.nowData.list == null'>暂无出价记录</p>
          <p v-else v-for='data in this.nowData.list' class="oh"><span class="fl">{{data.time}}</span><span class="fr">+{{data.money}}</span></p>
          <div class="recordPor"></div>
        </div>
        <div class="bidding fl">
          <h3>{{this.nowData.carMoney + this.nowData.serviceCharge + 800}}</h3>
          <p>最高竞价(合手价)/元</p>
        </div>
        <div class="fr detailed">
          <p class="oh"><span class="fl name">车价：</span><span class="fl" style="color: #FF7400;">{{this.calc.div(this.nowData.carMoney,10000)}}万</span></p>
          <p class="oh"><span class="fl name">服务费：</span><span class="fl">{{this.nowData.serviceCharge}}</span></p>
          <p class="oh"><span class="fl name">过户费：</span><span class="fl">800</span></p>
        </div>
      </div>
      <div class="bottom">
        <div class="leftPrice fl left">
          <p class="mt" @click='selPrice($event,"2000")'>2000</p>
          <p @click='selPrice($event,"1000")'>1000</p>
        </div>
        <div class="fl centerPrice por">
          <svg :width="this.proportion*100" :height="this.proportion*100" :viewBox="'0 0 '+this.proportion*100+' '+this.proportion*100">
            <circle :cx="this.proportion*50" :cy="this.proportion*50" :r="this.proportion*45" :stroke-width="this.proportion*3" stroke="#fff" fill="none"></circle>
            <circle :cx="this.proportion*50" :cy="this.proportion*50" :r="this.proportion*45" :stroke-width="this.proportion*4" stroke="#52D1FF" fill="none" :transform="'matrix(0,-1,1,0,0,'+this.proportion*100+')'" :stroke-dasharray="this.white+' '+this.blue"></circle>
          </svg>
          <div v-if='this.auctioneer' class="content">
            <img class="img" src="../../img/icon_Auction_tab@3x.png" alt="">
            <p class="time"><span>{{this.nowTime}}</span>s</p>
          </div>
          <div v-else class="content" @click='send'>
            <p class="name">加价</p>
            <p class="price">{{this.farePrice}}</p>
          </div>
        </div>
        <div class="leftPrice fl right">
          <p class="mt" @click='selPrice($event,"500")'>500</p>
          <p class="sel" @click='selPrice($event,"200")'>200</p>
        </div>
      </div>
      <p v-show='this.nowData.light == 1' class="reservePrice">已过保留价</p>
    </div>

    <pop-up :state.sync='popState' :name="popName"></pop-up>
    <!-- 信息确认框 -->
    <mu-dialog :open="dialog" :title='dl_title' dialogClass="dialogClass" titleClass="titleClass" bodyClass="bodyClass" actionsContainerClass="actionsContainerClass">
      <p>{{dl_content}}</p>
      <span slot="actions" @click="close" primary class="actions_btn">确定({{this.three}}s)</span>
    </mu-dialog>
    <!-- 拍卖成功提示 -->
    <mu-dialog :open="success" dialogClass="ss_Class" bodyClass="ss_bodyClass" actionsContainerClass="ss_ac_Class">
      <img class="img" src="../../img/bg_window_success@3x.png" alt="">
      <p class="head por">{{this.ss_money}}万</p>
      <p class="content por">{{this.ss_content}}</p>
      <p class="content por" v-if='this.ss_account == null'>
        您以最高
        <span v-if='this.ss_bidOrAuct == 2' class="price">竞拍价</span>
        <span v-if='this.ss_bidOrAuct == 1' class="price">预报价</span>
        获拍
      </p>
      <p class="content por" v-else>
        用户<span class="tel">“{{this.ss_account}}”</span>以最高
        <span v-if='this.ss_bidOrAuct == 2' class="price">竞拍价</span>
        <span v-if='this.ss_bidOrAuct == 1' class="price">预报价</span>
        获拍
      </p>
      <span slot="actions" @click="ss_close" primary class="ss_btn">关闭({{this.ss_three}}s)</span>
    </mu-dialog>
  </div>
</template>
<script>
  import popUp from "../../components/common/popUp.vue";
  import { Indicator,Toast } from 'mint-ui';
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: 'auction',
    data () {
      return {
        popState: false,  //打开弹层
        popName: "",  //弹层内容
        dialog: false,  //确认弹层
        dl_title: "",   //标题
        dl_content: "",   //内容
        carid: "",  //下一辆车的id
        success: false,   //拍卖成功弹层
        ss_content: "",   //拍卖成功车型
        ss_money: "", //成交价格
        ss_bidOrAuct: "",  //预报价和竞价谁高
        ss_account: "",  //成交用户
        value: 0, //圆圈进度条
        valued: 100,
        proportion: (window.innerWidth/375),   //比例
        perimeter: "",
        websocket: null,
        auctionStatus: false,
        white: "",  //白色圈
        blue: "",  //蓝色圈
        auctioneer: false,  //是否为本人拍中
        nowData: "",   //socket链接成功返回数据
        farePrice: 200,
        nowTime: 0,  //当前剩余多少时间
        three: 3,
        ss_three: 3,
        status: 1,
      }
    },
    components: {
      popUp,
		},
    computed: {
      key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
      },
      ...mapState({
        atState: state => state.atState,
			})
    },
    methods: {
      open (title,content) {
        this.dl_title = title;
        this.dl_content = content;
        this.dialog = true;
        this.closeInt = setInterval(() => {
          this.three--;
          if(this.three == 0){
            this.close();
          }
        },1000)
      },
      close () {
        clearInterval(this.closeInt);
        this.dialog = false;
        this.three = 3;
        if(this.status == 2){
          this.$router.push({ path: '/home'})
        }else{
          this.$router.push({ path: '/auction', query: {auctionId: this.$route.query.auctionId,carId: this.carid,status: 2}})
        }
      },
      ss_open (money,content,bidOrAuct,account) {
        this.ss_content = content;
        this.ss_money = money;
        this.ss_bidOrAuct = bidOrAuct;
        this.ss_account = account;
        this.success = true;
        this.closeSS = setInterval(() => {
          this.ss_three--;
          if(this.ss_three == 0){
            this.ss_close();
          }
        },1000)
      },
      ss_close () {
        clearInterval(this.closeSS);
        this.success = false;
        this.ss_three = 3;
        if(this.status == 2){
          this.$router.push({ path: '/home'})
        }else{
          this.$router.push({ path: '/auction', query: {auctionId: this.$route.query.auctionId,carId: this.carid,status: 2}})
        }
      },
      //调用弹层
      popUp (text) {
        this.popState = true;
        this.popName = text;
      },
      //圆圈进度
      progressBar (time,thisTime,maxTime) {
        clearInterval(this.timer);
        clearInterval(this.nowTimer);
        this.nowTime = thisTime;
        this.nowTimer = setInterval(() => {
          this.nowTime--;
          if(this.nowTime == 0){
            clearInterval(this.nowTimer);
          }
        },1000)
        let circle = document.querySelectorAll("circle")[1];
        let perimeter = Math.PI * 2 * (this.proportion*45) / 100;
        //圆圈周长
        this.perimeter = Math.PI * 2 * (this.proportion*45);
        //当前进度
        this.value = 100*(1-(thisTime/maxTime));
        this.valued = 100*(thisTime/maxTime);
        //当前圆圈刻度
        this.white = perimeter*this.value;
        this.blue = this.valued*perimeter;
        //进度条自动滚动
        this.timer = setInterval(() => {
          this.value++;
          this.valued--;
          circle.setAttribute('stroke-dasharray', perimeter*this.value + " " + this.valued*perimeter);
          if (this.value == 100) {
            clearInterval(this.timer);
          }
        }, time)
      },
      //选择加价幅度
      selPrice (e,price) {
        $(".sel").removeClass("sel");
        $(e.target).addClass("sel")
        this.farePrice = price;
      },
      //发送消息
      send () {
        let msg = {
          auserId: localStorage.getItem("userId"),
          carId: this.$route.query.carId,
          auctionRange: this.farePrice,
          carMoney: this.nowData.carMoney-0,
          asid: this.$route.query.auctionId,
          type: 1
        }
        this.websocket.send(JSON.stringify(msg));
      },
      //链接socket
      webSocket () {
        //判断当前浏览器是否支持WebSocket
        if ('WebSocket' in window) {
          this.websocket = new WebSocket("wss://www.dingdangshifu.cn/clank/websocket/" + localStorage.getItem("userId"));
        }else {
          alert('当前浏览器不支持websocket')
        }
        //连接发生错误的回调方法
        this.websocket.onerror = () => {
          this.popUp("连接发生错误");
          setTimeout(() => {
            this.$router.push({ path: '/home'})
          },1100)
        };
        //连接成功建立的回调方法
        this.websocket.onopen = () => {
          this.$http.post(this.rootUrl + 'AuctionSession/startAuctionCar',{
            auserId: localStorage.getItem("userId")
            },{emulateJSON:true}).then((data) => {
              if(data.body.status == 1000){
                this.nowData = data.body.data;
                this.nowData.bidding == 0 ? this.auctioneer = false : this.auctioneer = true;
                this.progressBar(this.nowData.moneyTime*10,this.nowData.pmTime,this.nowData.moneyTime);
              }else if(data.body.status == 1001 || data.body.status == 1003 || data.body.status ==1004 || data.body.status ==1005){
                this.popUp(data.body.message)
                setTimeout(() => {
                  this.websocket.close();
                  this.$router.push({ path: '/home'})
                },1100)
              }
          }, (data) => {
            this.popUp("服务器响应失败")
            this.websocket.close();
            setTimeout(() => {
              this.$router.push({ path: '/home'})
            },1100)
          })
        }
        //接收到消息的回调方法
        this.websocket.onmessage = (event) => {
          this.nowData = JSON.parse(event.data);
          if(this.nowData.status == 0){
            this.nowData.bidding == 0 ? this.auctioneer = false : this.auctioneer = true;
            this.progressBar(this.nowData.moneyTime*10,this.nowData.pmTime,this.nowData.moneyTime);
          }else if(this.nowData.status == 1){
            this.nowData.auctionMoney = this.calc.div(this.nowData.auctionMoney,10000);
            this.status = 1;
            this.carid = this.nowData.carId;
            if(this.nowData.bidding == 1){
              if(this.nowData.bidOrAuct == 2){
                //竞价大于预报价
                this.ss_open(this.nowData.auctionMoney,this.nowData.title,this.nowData.bidOrAuct,this.nowData.account)
              }else if(this.nowData.bidOrAuct == 1){
                //预报价大于竞价
                this.ss_open(this.nowData.auctionMoney,this.nowData.title,this.nowData.bidOrAuct,this.nowData.account)
              }else if(this.nowData.bidOrAuct == 0){
                //流拍
                this.open("车辆流拍","竞价低于保留价，车辆流拍");
              }
            }else{
              this.$router.push({ path: '/auction', query: {auctionId: this.$route.query.auctionId,carId: this.carid,status: 2}})
            }
          }else if(this.nowData.status == 2){
            this.nowData.auctionMoney = this.calc.div(this.nowData.auctionMoney,10000);
            this.status = 2;
            if(this.nowData.bidding == 1){
              if(this.nowData.bidOrAuct == 2){
                //预报价小于竞价
                this.ss_open(this.nowData.auctionMoney,this.nowData.title,this.nowData.bidOrAuct,this.nowData.account)
              }else if(this.nowData.bidOrAuct == 1){
                //预报价大于竞价
                this.ss_open(this.nowData.auctionMoney,this.nowData.title,this.nowData.bidOrAuct,this.nowData.account)
              }else if(this.nowData.bidOrAuct == 0){
                this.open("车辆流拍","竞价低于保留价，车辆流拍");
              }
            }else{
              this.$router.push({ path: '/home'});
            }
          }else if(this.nowData.status == 3){
            this.popUp("拍卖异常");
            setTimeout(() => {
              this.$router.push({ path: '/home'})
            },1100)
          }else if(this.nowData.status == 4){
            this.popUp("网络延迟");
            setTimeout(() => {
              this.$router.push({ path: '/home'})
            },1100)
          }
        }
        //连接关闭的回调方法
        this.websocket.onclose = () => {}
      }
    },
    mounted(){
      //判断拍卖状态
      this.auctionStatus = false;

      if(this.atState.atState == 1){    //场次预报价中

      }else if(this.atState.atState == 2){    //场次拍卖中
        if(this.$route.query.status == 2){  //车辆拍卖中
          if(this.atState.atLimits == 1){
            this.auctionStatus = true;
            this.webSocket();
          }
        }
      }
    },
    beforeDestroy () {  //组件销毁前
      clearInterval(this.timer)
      if(this.websocket){
        this.websocket.close();
      }
    }
  }
</script>

<style lang="scss">
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .1s ease;
  }
  .component-fade-enter, .component-fade-leave-to{
    opacity: 0;
  }
  .inAuction{
    position: fixed;
    bottom: 0;
    z-index: 55;
    width: 3.75rem;
    height: 2.06rem;
    background-color: #fff;
    box-shadow: 0 -0.04rem 0.1rem 0 rgba(0,0,0,0.08);
    padding: 0.18rem 0.25rem 0.08rem 0.25rem;
    .top{
      height: 0.5rem;
      .record{
        width: 1.06rem;
        height: 0.5rem;
        padding-right: 0.18rem;
        border-right: 1px solid #EBEBEB;
        p{
          font-size: 0.12rem;
          color: #666;
          line-height: 0.17rem;
        }
        .recordPor{
          background-image: linear-gradient(-180deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.00) 25%, #FFFFFF 100%);
          position: absolute;
          top: 0;
          left: 0;
          width: 1.05rem;
          height: 0.5rem;
        }
      }
      .bidding{
        width: 1.12rem;
        height: 0.5rem;
        padding: 0 0.1rem;
        text-align: center;
        border-right: 1px solid #EBEBEB;
        h3{
          font-size: 0.28rem;
          color: #FF7400;
          line-height: 0.26rem;
        }
        p{
          font-size: 0.1rem;
          color: #666666;
          line-height: 0.14rem;
          margin-top: 0.07rem;
        }
      }
      .detailed{
        width: 1.07rem;
        height: 0.5rem;
        p{
          font-size: 0.1rem;
          color: #666666;
          line-height: 0.16rem;
          padding: 0 0.12rem;
          .name{
            display: block;
            width: 0.45rem;
            text-align-last: justify;
            margin-right: 0.02rem;
          }
        }
      }
    }
    .bottom{
      height: 1.2rem;
      margin-top: 0.1rem;
      .leftPrice{
        width: 0.96rem;
        padding: 0.28rem 0.15rem;
        p{
          width: 0.66rem;
          height: 0.28rem;
          border-radius: 0.02rem;
          border: 1px solid #CCCCCC;
          font-size: 0.16rem;
          color: #999999;
          line-height: 0.28rem;
          text-align: center;
        }
        .mt{
          margin-bottom: 0.1rem;
        }
        .sel{
          color: #4A90E2;
          border: 1px solid #4A90E2;
        }
      }
      .centerPrice{
        width: 1rem;
        height: 1rem;
        background-color: #52D1FF;
        border-radius: 50%;
        margin: 0.1rem;
        .content{
          width: 1rem;
          height: 1rem;
          position: absolute;
          top: 0;
          left: 0;
          padding: 0.25rem 0;
          text-align: center;
          color: #fff;
          .name{
            font-size: 0.16rem;
            line-height: 0.2rem;
          }
          .price{
            font-size: 0.24rem;
            line-height: 0.3rem;
          }
          .img{
            width: 0.24rem;
            height: 0.3rem;
          }
          .time{
            font-size: 0.2rem;
            color: #FFFFFF;
            line-height: 0.2rem;
          }
        }
      }
      .left{
        margin-right: 0.06rem;
      }
      .right{
        margin-left: 0.06rem;
      }
    }
    .reservePrice{
      position: absolute;
      top: -0.14rem;
      right: 0;
      width: 0.53rem;
      height: 0;
      border-top: none;
      border-bottom: 0.14rem #FF7400 solid;
      border-left: transparent 0.08rem solid;
      border-right: none;
      font-size: 0.08rem;
      color: #FFFFFF;
      line-height: 0.14rem;
      text-align: center;
    }
  }

  circle {
    -webkit-transition: stroke-dasharray .25s;
    transition: stroke-dasharray .25s;
  }
  svg {
    -webkit-transform: rotate(-0.05deg);
    transform: rotate(-0.05deg);
  }
  /*竞拍失败弹出框*/
  /*弹出框样式*/
  .mu-dialog.dialogClass{
    border-radius: 0.12rem;
    width: 2.7rem;
    background-color: #F2F1F1;
  }
  /*标题栏样式*/
  .mu-dialog-title.titleClass{
    height: 0.24rem;
    line-height: 0.24rem;
    text-align: center;
    font-size: 0.17rem;
    color: #030303;
    margin-top: 0.19rem;
    padding: 0;
    display: block;
    font-weight: 600;
  }
  /*内容样式*/
  .mu-dialog-body.bodyClass{
    text-align: center;
    line-height: 0.18rem;
    font-size: 0.12rem;
    color: #030303;
    margin-top: 0.06rem;
    margin-bottom: 0.08rem;
    padding: 0 0.15rem;
  }
  /*按钮容器样式*/
  .actionsContainerClass{
    min-height: 0.47rem;
    height: 0.47rem;
    padding: 0;
    border-top: 1px solid #D0D9E3;
  }
  .actions_btn{
    width: 2.7rem;
    text-align: center;
    line-height: 0.47rem;
    font-size: 0.17rem;
    color: #0076FF;
  }
  /*竞拍成功弹出框*/
  /*弹出框样式*/
  .mu-dialog.ss_Class{
    border-radius: 0.06rem;
    width: 3rem;
    height: 3.6rem;
    // background: url("../../img/bg_window_success@3x.png") no-repeat;
    // background-size: 100%;
    position: relative;
  }
  /*内容样式*/
  .mu-dialog-body.ss_bodyClass{
    width: 2.5rem;
    height: 0.9rem;
    text-align: left;
    padding: 0;
    position: absolute;
    top: 1.22rem;
    left: 0.25rem;
    z-index: 2;
    overflow: inherit!important;
    .img{
      width: 3rem;
      height: 3.6rem;
      border-radius: 0.06rem;
      position: absolute;
      top: -1.22rem;
      left: -0.25rem;
      z-index: 1;
    }
    .head{
      margin-top: 0.1rem;
      text-align: center;
      font-size: 0.24rem;
      color: #F60000;
      line-height: 0.23rem;
      z-index: 3;
    }
    .content{
      font-size: 0.12rem;
      color: #333333;
      line-height: 0.23rem;
      text-align: center;
      z-index: 3;
      .tel{
        color: #0E81FF;
      }
      .price{
        color: #F60000;
      }
    }
  }
  /*按钮容器样式*/
  .mu-dialog-actions.ss_ac_Class{
    width: 1.2rem;
    min-height: 0.4rem;
    padding: 0;
    position: absolute;
    top: 3rem;
    left: 0.9rem;
    z-index: 2;
  }
  .ss_btn{
    width: 1.2rem;
    text-align: center;
    line-height: 0.4rem;
    font-size: 0.16rem;
    color: #FFFFFF;
  }
  .ss_closeBtn{
    padding: 0.09rem;
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    top: -1.32rem;
    right: -0.35rem;
    z-index: 2;
  }
  .null{
    width: 3.75rem;
    height: 6.67rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
  }
</style>
