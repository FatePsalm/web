<!-- order -->
<!-- 订单管理 -->
<template>
  <div class="order oh" id='order'>
    <header class="oh order_header" :class="{ 'pad_ios': isiOS, 'pad_android': isAndroid}">
      <router-link to="home"><img src="../../img/icon_all_backBlack@3x.png" alt="" class="fl"></router-link>
      <p>订单管理</p>
    </header>
    <div class="order_content" :style="'height:'+this.pullHeight+'px'">
      <pull-to
      :top-load-method="refreshT"
      :top-config='top_config'
      @infinite-scroll="doSth"
      @scroll='loadmore'>
        <template slot="top-block" slot-scope="props">
          <div class="top-load-wrapper">
            <icon name="long-arrow-down" v-if="props.state === 'pull'"></icon>
            <icon name="long-arrow-up" v-if="props.state === 'trigger'"></icon>
            <icon name="spinner" pulse v-if="props.state === 'loading'"></icon>
            <icon name="check-circle-o" v-if="props.state === 'loaded-done'"></icon>
            <icon name="times-circle" v-if="props.state === 'loaded-fail'"></icon>
            {{ props.stateText }}
          </div>
        </template>
        <ul class="oh">
          <li class="list" v-for='(data,index) in orderData' @click='seeOrder(data.id,data.totalMoney)'>
            <p class="title">
              <span class="fl num">订单号:{{data.orderNum}}</span>
              <span v-if='data.status == 1' class="fr type payment">未付款</span>
              <span v-if='data.status == 3' class="fr type">已完成</span>
              <span v-if='data.status == 2' class="fr type transfer">过户中</span>
              <span v-if='data.status == 5' class="fr type">超时未付款</span>
              <span v-if='data.status == 4' class="fr type">已撤销</span>
            </p>
            <div class="content">
              <img class="img fl" :src="data.url" alt="">
              <div class="text fr">
                <p class="license">{{data.carNumer}}</p>
                <nobr class="model">{{data.carName}} {{data.cars}} {{data.carModel}}</nobr>
              </div>
            </div>
            <p class="information">
              <span class="fl text">请在4个工作小时内完成付款！</span>
              <span class="fr price">合手价：<b>{{data.totalMoney}}元</b></span>
            </p>
            <div class="btn">
              <a class="tel fr" @click='telNo($event)' :href="'tel:'+userInfo.staff">联系客服</a>
            </div>
          </li>
        </ul>
        <div class="loading-bar">
          <p v-if='loadIf'>滑动至底部进行加载</p>
          <div v-else>
            <p v-if='loadMore'><icon name="spinner" pulse></icon> 加载中...</p>
            <p v-else>暂无更多数据</p>
          </div>
        </div>
      </pull-to>
    </div>

    <pop-up :state.sync='popState' :name="popName"></pop-up>
  </div>
</template>

<script>
  import popUp from "../../components/common/popUp.vue";
  import {mapState, mapMutations} from 'vuex';
  import { Indicator } from 'mint-ui';
  import PullTo from 'vue-pull-to';

  export default {
    name: 'order',
    data () {
      return {
        popState: false,
        popName: "",
        orderData: null, //订单数据
        proportion: window.innerWidth/375,  //页面比例
        loadMore: false, //是否加载
        loadIf: false, //滑动至底部进行加载
        top_config: {   //下拉刷新配置项
          pullText: '下拉刷新', // 下拉时显示的文字
          triggerText: '释放更新', // 下拉到触发距离时显示的文字
          loadingText: '加载中...', // 加载中的文字
          doneText: '加载完成', // 加载完成的文字
          failText: '加载失败', // 加载失败的文字
          loadedStayTime: 1000, // 加载完后停留的时间ms
          stayDistance: 50, // 触发刷新后停留的距离
          triggerDistance: 70 // 下拉刷新触发的距离
        },
      }
    },
    components: {
      popUp,
      PullTo
		},
    computed: {
      ...mapState({
				userInfo: state => state.userInfo,
			})
    },
    methods:{
      //调用弹层
      popUp (text) {
        this.popState = true;
        this.popName = text;
      },
      telNo(e) {
        e.stopPropagation();
      },
      //刷新数据
      refreshT(loaded) {
        setTimeout(() => {
          this.getData("refresh",loaded);
        },1000)
      },
      //滚动时触发
      loadmore(){
        this.loadMore = true;
        this.loadIf = true;
      },
      //上拉加载更多
      //监听滚动条是否滚动到底部
      doSth() {
        this.loadIf = false;
        setTimeout(() => {
          this.$http.post(this.rootUrl + 'AuctionSession/getAuctionOrder',{
              userId: localStorage.getItem("userId"),
              pageCurrent: this.currentPage
            },{emulateJSON:true}).then((data) => {
              if(data.body.status == 1000){
                if(data.body.data.orders.length == 0){
                  this.loadMore = false;
                }
                this.currentPage = data.body.data.pageObject.pageCurrent + 1; //当前页数绑定
                data.body.data.orders.map((value,index) => {
                  this.orderData.push(value);
                })
              }else if(data.body.status == 1001){
                this.popUp(data.body.message);
              }
          }, (data) => {
            this.popUp("服务器响应失败");
          });
        },500)
      },
      //查看订单车辆
      seeOrder(id,carMoney) {
        this.$router.push({ path: '/auction', query: {carId: id,carMoney: carMoney}})
      },
      //获取数据
      getData (judge,loaded){
        if(judge != "refresh"){
          Indicator.open();
        }
        setTimeout(() => {
          this.$http.post(this.rootUrl + 'AuctionSession/getAuctionOrder',{
              userId: localStorage.getItem("userId"),
              pageCurrent: 1
            },{emulateJSON:true}).then((data) => {
              if(data.body.status == 1000){
                this.currentPage = data.body.data.pageObject.pageCurrent + 1; //当前页数绑定
                this.orderData = data.body.data.orders;
              }else if(data.body.status == 1001){
                this.popUp(data.body.message);
              }
              if(judge == "refresh"){
                data.body.status === 1000 ? loaded('done') : loaded('fail');
              }else{
                Indicator.close();
              }
          }, (data) => {
            this.popUp("服务器响应失败");
            judge === "refresh" ? loaded('fail') : Indicator.close();
          });
        },500)

      }
    },
    mounted () {
      $("body").css("background-color","#FAFAFA");
      //获取数据
      this.getData();
      //获取客服
      if(this.userInfo.staff == undefined){
        this.userInfo.staff = localStorage.getItem("staff");
      }
    }
  }
</script>

<style lang="scss">
  .order{
    body{
      background: #FAFAFA;
    }
    .order_header{
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
      p{
        width: 3.38rem;
        text-align: center;
        line-height: 0.45rem;
        font-size: 0.17rem;
        color: #030303;
      }
    }
    .order_content{
      padding-top: 0.45rem;
      width: 3.75rem;
      .list{
        width: 3.75rem;
        margin-top: 0.19rem;
        border-top: 1px solid #F1F2F2;
        border-bottom: 1px solid #F1F2F2;
        .title{
          width: 3.75rem;
          height: 0.3rem;
          background-color: #fff;
          padding: 0 0.14rem;
          .num{
            line-height: 0.3rem;
            font-size: 0.12rem;
            color: #333333;
          }
          .type{
            line-height: 0.3rem;
            font-size: 0.14rem;
          }
          .payment{
            color: #FF7400;
          }
          .transfer{
            color: #4A90E2;
          }
        }
        .content{
          width: 3.75rem;
          height: 0.8rem;
          background-color: #fafafa;
          padding: 0.1rem 0.14rem;
          .img{
            width: 0.98rem;
            height: 0.6rem;
            background-color: #999;
          }
          .text{
            width: 2.39rem;
            height: 0.6rem;
            .license{
              font-size: 0.16rem;
              color: #333333;
              line-height: 0.22rem;
              margin-top: 0.05rem;
            }
            .model{
              font-size: 0.12rem;
              color: #333333;
              overflow: hidden;
              text-overflow: ellipsis;
              display: block;
              line-height: 0.17rem;
              margin-top: 0.05rem;
            }
          }
        }
        .information{
          width: 3.75rem;
          height: 0.4rem;
          background-color: #fff;
          padding: 0 0.14rem;
          line-height: 0.4rem;
          .text{
            font-size: 0.12rem;
            color: #333333;
            letter-spacing: -0.42px;
          }
          .price{
            font-size: 0.14rem;
            color: #191919;
            letter-spacing: -0.34px;
          }
        }
        .btn{
          width: 3.75rem;
          height: 0.4rem;
          background-color: #fff;
          padding: 0 0.14rem;
          border-top: 1px solid #F3F4F5;
          .tel{
            width: 0.88rem;
            height: 0.28rem;
            border: 1px solid #333333;
            border-radius: 0.02rem;
            font-size: 0.14rem;
            color: #333333;
            text-align: center;
            line-height: 0.28rem;
            margin-top: 0.06rem;
          }
        }
      }
      .loadMore{
        font-size: 0.14rem;
        line-height: 0.3rem;
        text-align: center;
      }
    }
    .mu-refresh-control{
      margin-top: 0.45rem!important;
    }
  }
  .top-load-wrapper {
    line-height: 50px;
    text-align: center;
    font-size: 0.14rem;
    color: #34495E;
  }
  .loading-bar{
    line-height: 50px;
    text-align: center;
    font-size: 0.14rem;
    color: #34495E;
  }
  .fa-icon {
    width: auto;
    height: 0.16rem; /* 或任意其它字体大小相对值 */
    /* 要在 Safari 中正常工作，需要再引入如下两行代码 */
    max-width: 100%;
    max-height: 100%;
    position: relative;
    top: 0.03rem;
  }
</style>
