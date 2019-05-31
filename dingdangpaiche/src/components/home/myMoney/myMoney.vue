<!-- myMoney -->
<!-- 我的资金 -->
<template>
  <div class="" id='myMoney'>
    <header class="oh mm_header" :class="{ 'pad_ios': isiOS, 'pad_android': isAndroid}">
      <div class="head oh">
        <router-link to="home"><img class="fl" src="../../../img/icon_all_backWhite@3x.png" alt=""></router-link>
        <p class="fl text">我的资金</p>
      </div>
      <div class="body">
        <h1 v-if='datas.freeze == null && datas.balance == null'>0</h1>
        <h1 v-else>{{this.calc.add(datas.freeze,datas.balance)}}</h1>
        <p>您的余额</p>
      </div>
      <ul class="footer">
        <li class="fl lattice">
          <h3 v-if='datas.balance == null'>0</h3>
          <h3 v-else>{{datas.balance}}</h3>
          <p>可使用</p>
        </li>
        <li class="fl lattice">
          <h3 v-if='datas.freeze == null'>0</h3>
          <h3 v-else>{{datas.freeze}}</h3>
          <p>冻结</p>
        </li>
        <li class="fl lattice">
          <h3 v-if='datas.money == null'>0</h3>
          <h3 v-else>{{datas.money}}</h3>
          <p>支出</p>
        </li>
      </ul>
      <div class="recharge">
        <router-link to="recharge"><p>充值</p></router-link>
      </div>
    </header>
    <div class="mm_content" :style="'height:'+this.pullHeight+'px'">
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
        <ul class="list">
          <li class="oh" v-for='(capitl,index) in datas.Capitls'>
            <div class="time fl">
              <p class="date">{{capitl.name}}</p>
              <p class="_time">{{capitl.time}}</p>
            </div>
            <img v-if='capitl.mtype == 3' class="state fl" src="../../../img/icon_record_thaw@3x.png" alt="">
            <img v-if='capitl.mtype == 4' class="state fl" src="../../../img/icon_record_takeoff@3x.png" alt="">
            <img v-if='capitl.mtype == 1' class="state fl" src="../../../img/icon_record_frozen@3x.png" alt="">
            <img v-if='capitl.mtype == 2' class="state fl" src="../../../img/icon_record_frozen@3x.png" alt="">
            <img v-if='capitl.mtype == 5' class="state fl" src="../../../img/icon_record_frozen@3x.png" alt="">
            <div class="money fl">
              <p v-if='capitl.mtype == 2 || capitl.mtype == 3 || capitl.mtype == 5' class="_money">+{{capitl.money}}</p>
              <p v-if='capitl.mtype == 1 || capitl.mtype == 4' class="_money">-{{capitl.money}}</p>
              <p class="whereabouts">{{capitl.number}}订单完成交易，
                <span v-if='capitl.mtype == 1'>冻结资金</span>
                <span v-if='capitl.mtype == 2'>提现</span>
                <span v-if='capitl.mtype == 3'>解冻资金</span>
                <span v-if='capitl.mtype == 4'>扣除保证金</span>
                <span v-if='capitl.mtype == 5'>充值</span>
              </p>
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
  import popUp from "../../../components/common/popUp.vue";
  import { Indicator } from 'mint-ui';
  import PullTo from 'vue-pull-to';

  export default {
    name: 'certificates',
    data () {
      return {
        popState: false,
        popName: "",
        datas: {}, //获取的数据
        dates: [], //转化后的时间
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
    methods:{
      //调用弹层
      popUp (text) {
        this.popState = true;
        this.popName = text;
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
          this.$http.post(this.rootUrl + 'auser/getUserCapitlAccount',{
              userId: localStorage.getItem("userId"),
              pageCurrent: this.currentPage
            },{emulateJSON:true}).then((data) => {
              if(data.body.status == 1000){
                if(data.body.data.Capitls.length == 0){
                  this.loadMore = false;
                }
                this.currentPage = data.body.data.pageObject.pageCurrent + 1; //当前页数绑定
                data.body.data.Capitls.map((value,index) => {
                  this.datas.Capitls.push(value);
                })
              }else if(data.body.status == 1001){
                this.popUp(data.body.message);
              }
          }, (data) => {
            this.popUp("服务器响应失败");
          });
        },500)
      },
      //获取数据
      getData(judge,loaded){
        if(judge != "refresh"){
          Indicator.open();
        }
        this.$http.post(this.rootUrl + 'auser/getUserCapitlAccount',{
            userId: localStorage.getItem("userId"),
            pageCurrent: 1
          },{emulateJSON:true}).then((data) => {
            if(data.body.status == 1000){
              this.currentPage = data.body.data.pageObject.pageCurrent + 1; //当前页数绑定
              this.datas = data.body.data;
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
      }
    },
    mounted () {
      $("body").css("background-color","#fff");
      this.getData();
    },
  }
</script>

<style lang="scss" scoped>
  body{
    background: #fff;
  }
  .mm_header{
    width: 3.75rem;
    // height: 2.55rem;
    background-color: #6AA8E1;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    .head{
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
        color: #fff;
      }
    }
    .body{
      width: 3.75rem;
      height: 1.36rem;
      padding: 0.29rem 0;
      text-align: center;
      h1{
        font-size: 0.48rem;
        color: #FFFFFF;
        line-height: 0.67rem;
        margin: 0;
      }
      p{
        font-size: 0.14rem;
        color: #FFFFFF;
        line-height: 0.2rem;
        margin-top: -0.09rem;
      }
    }
    .footer{
      width: 3.75rem;
      height: 0.74rem;
      background-color: #659ED6;
      padding: 0.15rem 0;
      .lattice{
        width: 33.3%;
        height: 0.44rem;
        text-align: center;
        color: #fff;
        h3{
          font-size: 0.2rem;
          color: #FFFFFF;
          line-height: 0.28rem;
        }
        p{
          font-size: 0.12rem;
          color: #FFFFFF;
          line-height: 0.16rem;
        }
      }
    }
    .recharge{
      width: 3.75rem;
      height: 0.6rem;
      background-color: #fafafa;
      padding: 0.08rem 0.12rem;
      p{
        width: 3.51rem;
        height: 0.44rem;
        background: #50C572;
        border-radius: 0.04rem;
        font-size: 0.18rem;
        color: #FFFFFF;
        text-align: center;
        line-height: 0.44rem;
      }
    }
  }
  .mm_content{
    width: 3.75rem;
    position: relative;
    z-index: 1;
    padding-top: 3.15rem;
    .list{
      width: 3.75rem;
      padding-left: 0.12rem;
      overflow: auto;
      li{
        width: 3.63rem;
        height: 0.6rem;
        padding: 0.1rem 0.12rem 0.1rem 0;
        border-bottom: 1px solid #D8D8D8;
        .time{
          width: 0.5rem;
          height: 0.4rem;
          margin-right: 0.06rem;
          text-align: left;
          .date{
            font-size: 0.16rem;
            color: #999999;
            line-height: 0.22rem;
          }
          ._time{
            font-size: 0.13rem;
            color: #999999;
            line-height: 0.18rem;
          }
        }
        .state{
          width: 0.34rem;
          height: 0.34rem;
          margin-top: 0.03rem;
          margin-right: 0.16rem;
        }
        .money{
          ._money{
            font-size: 0.18rem;
            color: #333333;
            line-height: 0.25rem;
          }
          .whereabouts{
            font-size: 0.12rem;
            color: #B2B2B2;
            line-height: 0.15rem;
          }
        }
      }
      .loadMore{
        font-size: 0.14rem;
        line-height: 0.3rem;
        text-align: center;
      }
    }
  }
  .mu-refresh-control{
    margin-top: 0rem!important;
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
