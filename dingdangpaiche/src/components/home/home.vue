<!-- 首页 -->
<template>
  <div class="oh home" id='home'>
    <header class="oh home_header" :class="{ 'pad_ios': isiOS, 'pad_android': isAndroid}">
      <img class="fl home_personal" @click="toggle(true)" src="../../img/btn_home_personal@3x.png" alt="">
      <div class="fl home_title">
        <img class="fl" src="../../img/icon_home_logo@3x.png" alt="">
        <p class="fl">叮当拍车</p>
      </div>
      <div class="fr home_address">
        <img class="fl" src="../../img/Combined Shape@3x.png" alt="">
        <p class="fl">成都</p>
      </div>
    </header>
    <div class="home_content">
      <div class="home_content_header" :class="{ 'pad_ios': isiOS, 'pad_android': isAndroid}">
        <div class="lsAuction fl" @click='stateSel(0)'>
          <div v-if='lsAuction_l_bool'>
            <img src="../../img/img_home_titleSell_sel@3x.png" alt="">
            <span class="lsAuction_l"><span class="lsAuction_Y">{{hour}}</span>开拍(<span class="lsAuction_Y">{{carCurrent}}</span>/{{carCount}})</span>
          </div>
          <div v-else>
            <img src="../../img/img_home_titleSell_unsel@3x.png" alt="">
            <span class="lsAuction_N">{{hour}}开拍({{carCurrent}}/{{carCount}})</span>
          </div>
        </div>
        <div class="lsAuction fl"  @click='stateSel(1)'>
          <div v-if='lsAuction_r_bool'>
            <img src="../../img/img_home_titleready_sel@3x.png" alt="">
            <span class="lsAuction_r lsAuction_Y">车源持续准备中</span>
          </div>
          <div v-else>
            <img src="../../img/img_home_titleready_unsel@3x.png" alt="">
            <span class="lsAuction_r">车源持续准备中</span>
          </div>
        </div>
        <div class="lsAuction fr"  @click='stateSel(2)'>
          <div v-if='lsAuction_y_bool'>
            <img src="../../img/img_title_seckill_pre.png" alt="">
            <span class="lsAuction_r lsAuction_Y">不定时更新</span>
          </div>
          <div v-else>
            <img src="../../img/img_title_seckill_unpre.png" alt="">
            <span class="lsAuction_r">不定时更新</span>
          </div>
        </div>
      </div>
      <div class="home_content_body" :style="'height:'+this.pullHeight+'px'">
        <!-- 拍卖中 -->
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
          <ul
            id='lsAuction_l'
            v-show='lsAuction_l_bool'>
              <li class="home_list oh" @click='to_datail(car.auctionId,car.id)' v-for='(car,index) in inTheAuction'>
                <div class="fl home_list_img por">
                  <img :src="car.url" alt="">
                  <span v-if='car.status == 2' class="auctionIng">拍卖中</span>
                  <span v-if='car.status != 2' class="auctionNo">未开始</span>
                </div>
                <div class="fr home_list_text">
                  <p class="home_list_models">{{car.carname}}{{car.cars}}{{car.carModel}}</p>
                  <p class="home_list_survey">{{car.reTime}}年 | {{car.mileage}}km | {{car.carNumber}}</p>
                  <div class="home_list_price oh">
                    <span class="home_price_l fl">{{car.askingPrice/10000}}万</span>
                    <span class="home_price_r fl">起拍</span>
                    <img v-if='car.isbid == 1' class="fr home_price_img" src="../../img/icon_window_tab_blue@3x.png" alt="">
                  </div>
                </div>
              </li>
          </ul>
          <!-- 预报价 -->
          <div v-show='lsAuction_r_bool' id='lsAuction_r'>
            <ul>
              <li class="home_list oh" @click='to_datail(car.auctionId,car.id)' v-for='(car,index) in inTheAuction'>
                <div class="fl home_list_img por">
                  <img :src="car.url" alt="">
                  <span v-if='car.status == 2' class="auctionIng">拍卖中</span>
                  <span v-if='car.status != 2' class="auctionNo">未开始</span>
                </div>
                <div class="fr home_list_text">
                  <p class="home_list_models">{{car.carname}}{{car.cars}}{{car.carModel}}</p>
                  <p class="home_list_survey">{{car.reTime}}年 | {{car.mileage}}km | {{car.carNumber}}</p>
                  <div class="home_list_price oh">
                    <span class="home_price_l fl">{{car.askingPrice/10000}}万</span>
                    <span class="home_price_r fl">起拍</span>
                    <img v-if='car.isbid == 1' class="fr home_price_img" src="../../img/icon_window_tab_blue@3x.png" alt="">
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 一口价 -->
          <ul v-show='lsAuction_y_bool'>
            <li class="home_list oh" @click='to_datail(0,car.id)' v-for='(car,index) in inTheAuction'>
              <div class="fl home_list_img por">
                <img :src="car.url" alt="">
                <span v-if='car.status == 2' class="auctionIng">秒杀中</span>
                <span v-if='car.status != 2' class="auctionNo">{{car.countdown | timer}}</span>
              </div>
              <div class="fr home_list_text">
                <p class="home_list_models">{{car.carname}}{{car.cars}}{{car.carModel}}</p>
                <p class="home_list_survey">{{car.reTime}}年 | {{car.mileage}}km | {{car.carNumber}}</p>
                <div class="home_list_price oh">
                  <span class="home_price_l fl">{{calc.div(car.carMony,10000)}}万</span>
                  <span class="price fl">一口价</span>
                </div>
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
      <img class="order" @click='to_order' src="../../img/icon_home_order@3x.png" alt="">
    </div>
    <mu-drawer class="muDrawer" :open="open" :docked="false" @close="toggle(false)">
      <div class="head por">
        <div class="outer fl">
          <img v-if='personalInformation.headImg == null' src='../../img/headImg.jpg' class="headPortrait" alt="">
          <img v-else class="headPortrait" :src="personalInformation.headImg" alt="">
        </div>
        <div class="fl information">
          <p v-if='personalInformation.phone != null' class="tel">{{personalInformation.phone}}</p>
          <p v-else class="tel">用户手机号</p>
          <p class="name">叮当师傅二手车买卖网</p>
        </div>
        <div class="money" @click='myMoney'>
          <div class="account fl">
            <p v-if='personalInformation.balance == null && personalInformation.freeze == null' class="price">0</p>
            <p v-else class="price">{{personalInformation.balance+personalInformation.freeze}}</p>
            <p class="name">账户余额</p>
          </div>
          <div class="frozen fl">
            <p v-if='personalInformation.freeze == null' class="price">0</p>
            <p v-else class="price">{{personalInformation.freeze}}</p>
            <p class="name">冻结额度</p>
          </div>
          <img class="fl jump" src="../../img/jump.jpg" alt="">
        </div>
      </div>
      <div class="background"></div>
      <div class="data" @click='personalData'>
        <img class="icon fl" src="../../img/personalData.jpg" alt="">
        <p class="key fl">个人资料</p>
        <!-- <p class="state fr">未完善</p> -->
      </div>
      <div class="home_footer">
        <div class="fl information">
          <p class="text">专属客服</p>
          <p class="content">
            <b v-if='personalInformation.uphone == null'>客服手机号</b>
            <b v-else>{{personalInformation.uphone}}</b>
            (
            <span v-if='personalInformation.uname == null'>客服</span>
            <span v-else>{{personalInformation.uname}}</span>
            )
          </p>
        </div>
        <div class="fr tel">
          <a v-if='personalInformation.uphone == null'><img src="../../img/icon_sidebar_phone@3x.png" alt=""></a>
          <a v-else :href="'tel:'+personalInformation.uphone"><img src="../../img/icon_sidebar_phone@3x.png" alt=""></a>
        </div>
      </div>
    </mu-drawer>

    <mu-dialog :open="dialog" title='提示' dialogClass="dialogClass" titleClass="titleClass" bodyClass="bodyClass" actionsContainerClass="actionsContainerClass">
      <p>该车辆竞拍已结束</p>
      <span slot="actions" @click="close" primary class="actions_btn">确定</span>
    </mu-dialog>
    <pop-up :state.sync='popState' :name="popName"></pop-up>
  </div>
</template>

<script>
  import popUp from "../../components/common/popUp.vue";
  import {mapState, mapMutations} from 'vuex';
  import { Indicator  } from 'mint-ui';
  import PullTo from 'vue-pull-to';

  export default {
    name: 'home',
    data () {
      return {
        popState: false,
        popName: "",
        lsAuction_l_bool: true,
        lsAuction_r_bool: false,
        lsAuction_y_bool: false,
        open: false,
        inTheAuction: null, //拍卖中数据
        hour: "00:00", //开拍时间
        carCurrent: "00",  //当前车辆
        carCount: "00",  //拍卖车辆总数
        status: 2,  //拍卖状态
        personalInformation: {}, //个人信息数据
        dialog: false,  //确认弹层
        record: false,
        state: 0,
        currentPage: 1,  //当前页数
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
    filters: {
      timer: function (value) {
        if (!value || value < 0) return '已开始'
        let mm,hh;
        if(value%60 < 10){
          mm = "0" + value%60;
        }else{
          mm = value%60;
        }
        return "0" + Math.floor(value/60) + ":" + mm;
      }
    },
    components: {
      popUp,
      PullTo
		},
    computed: {
      ...mapState({
				atState: state => state.atState,
        homeState: state => state.homeState,
			})
    },
    methods:{
      //下拉刷新
      refreshT(loaded) {
        setTimeout(() => {
          if(this.status == 3){
            this.getData_seckill("refresh",loaded);
          }else{
            this.getData("refresh",loaded);
          }
        },1000)
      },
      //滚动时触发
      loadmore(){
        if(this.status != 3){
          this.loadMore = true;
          this.loadIf = true;
        }
      },
      //上拉加载更多
      //监听滚动条是否滚动到底部
      doSth() {
        if(this.status != 3){
          this.loadIf = false;
          setTimeout(() => {
            this.$http.post(this.rootUrl + 'AuctionSession/queryAuctionCar',{
                userId: localStorage.getItem("userId"),
                status: this.status,
                pageCurrent: this.currentPage,
              },{emulateJSON:true})
            .then((data) => {
                if(data.body.status == 1000){
                  if(data.body.data != null){
                    if(data.body.data.auctionCar.length == 0){
                      this.loadMore = false;
                    }
                    this.currentPage = data.body.data.pageObject.pageCurrent + 1; //当前页数绑定
                    data.body.data.auctionCar.map((value,index) => {
                      value.reTime = value.reTime.substr(0,4);
                      this.inTheAuction.push(value);
                    })
                    if(this.status == 2){
                      this.carCount = data.body.data.carCount-0;
                      if(data.body.data.hour && data.body.data.hour != null){
                        this.hour = data.body.data.hour.slice(0,5);
                      }
                      this.carCurrent = ((data.body.data.carCount - data.body.data.auctionCar.length) + 1)-0;
                      this.carCurrent < 10 ? this.carCurrent = "0" + this.carCurrent : this.carCurrent = this.carCurrent;
                      this.carCount < 10 ? this.carCount = "0" + this.carCount : this.carCount = this.carCount;
                    }
                  }
                }else{
                  this.popUp(data.body.message);
                }
            }, (data) => {
              Indicator.close();
              this.popUp("服务器响应失败");
            });
          },500)
        }
      },
      openDl () {
        this.dialog = true;
      },
      close () {
        this.dialog = false;
        this.getData();
      },
      //修改vuex
      ...mapMutations([
        'setatState',
        'sethomeState'
      ]),
      //调用弹层
      popUp (text) {
        this.popState = true;
        this.popName = text;
      },
      //切换模块
      stateSel (state) {
        this.currentPage = 1;
        this.loadMore = false;
        this.loadIf = false;
        if(state == 0){
          this.state = 0;
          this.lsAuction_l_bool = true;
          this.lsAuction_r_bool = false;
          this.lsAuction_y_bool = false;
          this.status = 2;
          this.getData();
        }else if(state == 1){
          this.state = 1;
          this.lsAuction_l_bool = false;
          this.lsAuction_r_bool = true;
          this.lsAuction_y_bool = false;
          this.status = 1;
          this.getData();
        }else if(state == 2){
          this.state = 2;
          this.lsAuction_l_bool = false;
          this.lsAuction_r_bool = false;
          this.lsAuction_y_bool = true;
          this.status = 3;
          this.getData_seckill();
        }
      },
      //跳转详情
      to_datail (auctionId,id) {
        //获取拍卖状态
        this.$http.post(this.rootUrl + 'AuctionSession/getAuctionCarStatus',{
            carId: id,
            userId: localStorage.getItem("userId")
          },{emulateJSON:true}).then((data) => {
            if(data.body.status == 1000){
              let atContent = {
                atState: this.status,
                atLimits: data.body.data.limits
              }
              this.setatState(atContent)
              // limits  是否有钱出价 1是有钱 0是没钱
              if(data.body.data.status == 2 || data.body.data.status == 6){
                this.record = true;
                this.$router.push({ path: '/auction', query: {auctionId: auctionId,carId: id,status: data.body.data.status}})
              }else{
                this.openDl();
              }
            }else if(data.body.status == 1001 || data.body.status == 1003){
              this.popUp(data.body.message);
            }
        }, (data) => {
          this.popUp("服务器响应失败");
        });
      },
      //跳转订单页
      to_order() {
        this.record = true;
        this.$router.push({ path: '/order'})
      },
      //展开侧边栏
      toggle (flag) {
        this.open = flag;
        if(this.open){
          Indicator.open();
          this.$http.post(this.rootUrl + 'auser/queryUserInfo',{
              userId: localStorage.getItem("userId")
            },{emulateJSON:true}).then((data) => {
              Indicator.close();
              if(data.body.status == 1000){
                this.personalInformation = data.body.data;
              }else if(data.body.status == 1001){
                this.popUp(data.body.message);
              }
          }, (data) => {
            Indicator.close();
            this.popUp("服务器响应失败");
          });
        }
      },
      //个人中心
      personalData () {
        this.$router.push({ path: '/personalData'})
      },
      //我的资金
      myMoney () {
        this.$router.push({ path: '/myMoney'})
      },
      //获取数据
      getData (judge,loaded) {
        //获取拍卖车辆信息
        this.inTheAuction = [];
        if(judge != "refresh"){
          Indicator.open();
        }
        this.$http.post(this.rootUrl + 'AuctionSession/queryAuctionCar',{
            userId: localStorage.getItem("userId"),
            status: this.status,
            pageCurrent: 1,
          },{emulateJSON:true})
        .then((data) => {
            if(data.body.status == 1000){
              if(data.body.data != null){
                this.currentPage = data.body.data.pageObject.pageCurrent + 1; //当前页数绑定
                this.inTheAuction = data.body.data.auctionCar;
                this.inTheAuction.map((value,index) => {
                  value.reTime = value.reTime.substr(0,4);
                })
                if(this.status == 2){
                  this.carCount = data.body.data.carCount-0;
                  if(data.body.data.hour && data.body.data.hour != null){
                    this.hour = data.body.data.hour.slice(0,5);
                  }
                  this.carCurrent = ((data.body.data.carCount - data.body.data.auctionCar.length) + 1)-0;
                  this.carCurrent < 10 ? this.carCurrent = "0" + this.carCurrent : this.carCurrent = this.carCurrent;
                  this.carCount < 10 ? this.carCount = "0" + this.carCount : this.carCount = this.carCount;
                }
              }
            }else{
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
      },
      //获取秒杀数据
      getData_seckill(judge,loaded) {
        this.inTheAuction = [];
        if(judge != "refresh"){
          Indicator.open();
        }
        this.$http.post(this.rootUrl + 'Seconds/doSecondsList',{

          },{emulateJSON:true}).then((data) => {
            if(data.body.status == 1000){
              if(data.body.data != null){
                this.inTheAuction = data.body.data;
                this.inTheAuction.map((value,index) => {
                  value.reTime = value.reTime.substr(0,4);
                  if(value.status == 6){
                    let timeS = setInterval(() => {
                      if(value.countdown > 0){
                        value.countdown--;
                      }else{
                        clearInterval(timeS)
                      }
                    },1000)
                  }
                })
                if(this.status == 2){
                  this.carCount = data.body.data.carCount-0;
                  if(data.body.data.hour && data.body.data.hour != null){
                    this.hour = data.body.data.hour.slice(0,5);
                  }
                  this.carCurrent = ((data.body.data.carCount - data.body.data.auctionCar.length) + 1)-0;
                  this.carCurrent < 10 ? this.carCurrent = "0" + this.carCurrent : this.carCurrent = this.carCurrent;
                  this.carCount < 10 ? this.carCount = "0" + this.carCount : this.carCount = this.carCount;
                }
              }
            }else if(data.body.status == 1001 || data.body.status == 1004){
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
      $("body").css({"background-color":"#fff"});

      if(this.homeState != ""){
        this.stateSel(this.homeState)
      }else {
        if(this.state == 2){
          this.getData_seckill();
        }else{
          this.getData();
        }
      }
    },
    beforeDestroy () {
      if(this.record){
        this.sethomeState(this.state);
      }else{
        this.sethomeState("");
      }
    }
  }
</script>

<style lang="scss">
  body{
    background: #fff;
  }
  .home_header{
    width: 3.75rem;
    // height: 0.45rem;
    background: #F9F9F9;
    border-bottom: 1px solid #D8D8D8;
    position: fixed;
    top: 0;
    z-index: 1000;
    .home_personal{
      width: 0.24rem;
      height: 0.24rem;
      margin: 0.1rem 0.12rem;
    }
    .home_title{
      height: 0.45rem;
      margin-left: 0.84rem;
      img{
        width: 0.375rem;
        height: 0.28rem;
        margin-top: 0.115rem;
        margin-right: 0.04rem;
      }
      p{
        font-size: 0.17rem;
        color: #030303;
        font-weight: 400;
        line-height: 0.45rem;
      }
    }
    .home_address{
      height: 0.45rem;
      margin-right: 0.14rem;
      img{
        width: 0.13rem;
        height: 0.15rem;
        margin-top: 0.15rem;
        margin-right: 0.04rem;
      }
      p{
        font-size: 0.17rem;
        color: #333333;
        line-height: 0.45rem;
      }
    }
  }
  .home_content{
    background-color: #fff;
    .home_content_header{
      width: 3.75rem;
      box-shadow: 0rem -0.05rem 0.1rem 0.1rem rgba(0,0,0,0.05);
      position: fixed;
      top: 0.45rem;
      left: 0;
      z-index: 2;
      background-color: #fff;
      .lsAuction{
        height: 0.6rem;
        padding: 0.13rem 0 0.13rem 0rem;
        width: 1.25rem;
        text-align: center;
        img{
          width: 0.69rem;
          height: 0.17rem;
          display: block;
          margin: auto;
        }
        .lsAuction_r{
          color: #BFBFBF;
        }
        .lsAuction_l{
          color: #2A2A2A;
        }
        .lsAuction_Y{
          color: #50C572;
        }
        .lsAuction_N{
          color: #BFBFBF;
        }
        >div>span{
          font-size: 0.12rem;
          color: #000;
          line-height: 0.14rem;
        }
      }
    }
    .home_content_body{
      width: 3.75rem;
      overflow: auto;
      padding-top: 1.15rem;
      ul{
        padding: 0 0.12rem;
      }
      .home_list{
        width: 3.51rem;
        padding: 0.13rem 0;
        border-bottom: 1px solid #F3F4F5;
        .home_list_img{
          width: 1.08rem;
          height: 0.7rem;
          background-color: #999;
          img{
            width: 1.08rem;
            height: 0.7rem;
          }
          span{
            width: 0.5rem;
            height: 0.17rem;
            font-size: 0.1rem;
            color: #FFFFFF;
            padding: 0.01rem 0.05rem;
            position: absolute;
            top: 0;
            left: 0;
            line-height: 0.15rem;
            text-align: center;
          }
          .auctionIng{
            background-color: #50C572;
          }
          .auctionNo{
            background-color: #6D9EE1;
          }
        }
        .home_list_text{
          width: 2.32rem;
          .home_list_models{
            font-size: 0.14rem;
            color: #333333;
            line-height: 0.2rem;
          }
          .home_list_survey{
            margin-top: 0.03rem;
            font-size: 0.11rem;
            color: #808080;
            line-height: 0.16rem;
          }
          .home_list_price{
            margin-top: 0.02rem;
            .home_price_l{
              font-size: 0.16rem;
              color: #FF7400;
              line-height: 0.22rem;
            }
            .home_price_r{
              font-size: 0.12rem;
              color: #808080;
              line-height: 0.17rem;
              margin-top: 0.05rem;
            }
            .price{
              width: 0.4rem;
              height: 0.17rem;
              background: #FFFFFF;
              border: 1px solid #50C572;
              border-radius: 0.02rem;
              text-align: center;
              line-height: 0.17rem;
              font-size: 0.1rem;
              color: #50C572;
              margin-left: 0.1rem;
              margin-top: 0.025rem;
            }
            .home_price_img{
              width: 0.14rem;
              height: 0.15rem;
              margin-top: 0.05rem;
            }
          }
        }
      }
    }
    .order{
      width: 0.5rem;
      height: 0.46rem;
      position: fixed;
      right: -0.05rem;
      bottom: 0.67rem;
    }
    .dataNull{
      width: 3.75rem;
      margin-left: -0.12rem;
      font-size: 0.14rem;
      line-height: 0.3rem;
      text-align: center;
    }
    .mu-refresh-control{
      margin-top: 0!important;
    }
    .loadMore{
      font-size: 0.14rem;
      line-height: 0.3rem;
      text-align: center;
    }
  }
  .mu-drawer.muDrawer{
    width: 3rem;
    .head{
      width: 3rem;
      height: 1.55rem;
      padding: 0.29rem 0 0.44rem 0.19rem;
      background: #6D9EE1;
      .outer{
        width: 0.82rem;
        height: 0.82rem;
        border-radius: 50%;
        border: 0.05rem solid rgba(255,255,255,0.10);
        margin-right: 0.15rem;
        .headPortrait{
          width: 0.72rem;
          height: 0.72rem;
          border-radius: 50%;
          border: 0.05rem solid rgba(255,255,255,0.20);
        }
      }
      .information{
        .tel{
          font-size: 0.19rem;
          color: #FFFFFF;
          line-height: 0.28rem;
          margin-top: 0.16rem;
        }
        .name{
          font-size: 0.12rem;
          color: #FFFFFF;
          line-height: 0.17rem;
        }
      }
      .money{
        width: 2.84rem;
        height: 0.68rem;
        border-radius: 0.04rem;
        position: absolute;
        left: 0.08rem;
        top: 1.31rem;
        background-image: url("../../img/img_account_whiteBg@3x.png");
        background-repeat: no-repeat;
        background-size: 100%;
        >div{
          width: 1.42rem;
          height: 0.6rem;
          text-align: center;
          .price{
            font-size: 0.18rem;
            color: #FF7400;
            line-height: 0.25rem;
            margin-top: 0.1rem;
          }
          .name{
            font-size: 0.14rem;
            color: #999999;
            line-height: 0.2rem;
          }
        }
        .frozen{
          margin-left: -0.1rem;
        }
        .jump{
          width: 0.1rem;
          height: 0.18rem;
          position: absolute;
          top: 0.23rem;
          right: 0.18rem;
        }
      }
    }
    .background{
      width: 3rem;
      height: 0.48rem;
      background-color: #FAFAFA;
    }
    .data{
      width: 3rem;
      height: 0.5rem;
      margin-top: 0.1rem;
      padding: 0.14rem 0.14rem 0.14rem 0.2rem;
      .icon{
        width: 0.25rem;
        height: 0.22rem;
        margin-right: 0.1rem;
        line-height: 0.22rem;
      }
      .key{
        font-size: 0.16rem;
        color: #333333;
      }
      .state{
        font-size: 0.16rem;
        color: #999999;
      }
    }
    .home_footer{
      width: 3rem;
      height: 0.6rem;
      border-top: 1px solid #D8D8D8;
      position: absolute;
      bottom: 0;
      left: 0;
      .information{
        padding: 0.1rem 0 0.11rem 0.2rem;
        .text{
          font-size: 0.11rem;
          color: #333333;
          line-height: 0.16rem;
        }
        .content{
          font-size: 0.16rem;
          color: #151515;
          line-height: 0.22rem;
        }
      }
      .tel{
        width: 0.9rem;
        height: 0.59rem;
        padding: 0.15rem 0.3rem;
        background-color: #6D9EE1;
        a{
          width: 0.3rem;
          height: 0.3rem;
          display: inline-block;
          img{
            width: 0.3rem;
            height: 0.3rem;
          }
        }
      }
    }
  }
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
    margin-top: 0.1rem;
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
