<!-- recessiveInjury -->
<!-- 隐性损伤 -->
<template>
  <div class="">
    <header class="oh ri_header" :class="{ 'pad_ios': isiOS, 'pad_android': isAndroid}">
      <img @click='reTurn' src="../../../img/icon_all_backBlack@3x.png" alt="" class="fl">
      <p>隐性损伤</p>
    </header>
    <div class="ri_content oh">
      <div class="nav">
        <ul class="nav_ul oh por">
          <li class="nav_li fl sel_nav" @click='selDi($event,1)'>外观</li>
          <li class="nav_li fl" @click='selDi($event,2)'>骨架</li>
          <span class="line"></span>
        </ul>
      </div>
      <div v-show='wg_if'>
        <div class="svg por">
          <ul class="legend">
            <li class="fl legendList">
              <span class="le_1 span"></span>
              <span>无损伤</span>
            </li>
            <li class="fl legendList">
              <span class="le_2 span"></span>
              <span>喷漆</span>
            </li>
            <li class="fl legendList">
              <span class="le_3 span"></span>
              <span>钣金</span>
            </li>
            <li class="fl legendList">
              <span class="le_4 span"></span>
              <span>更换</span>
            </li>
          </ul>
          <svg-appearance :node-content='wg_detail'></svg-appearance>
        </div>
        <div class="ri_vehicleInformation">
          <div class="ri_list_head">
            <span class="fl span"></span>
            <span class="fl text">详细检测</span>
          </div>
          <div class="content oh">
            <div class="modelBox fl" :class="{'mt':index >= 4}" v-for='(msg,index) in wg_detail'>
              <div>
                <nobr v-if='msg.isY' class="fl name nor nameSel">{{msg.recessive}}</nobr>
                <p v-else class="fl name nor">正常</p>
              </div>
              <span class="type" :class='{"typeSel":msg.isY == true}'>{{msg.dictName}}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-show='gj_if'>
        <div class="svg por">
          <ul class="legend">
            <li class="fl legendList">
              <span class="le_1 span"></span>
              <span>无损伤</span>
            </li>
            <li class="fl legendList">
              <span class="le_2 span"></span>
              <span>喷漆</span>
            </li>
            <li class="fl legendList">
              <span class="le_3 span"></span>
              <span>钣金</span>
            </li>
            <li class="fl legendList">
              <span class="le_4 span"></span>
              <span>更换</span>
            </li>
          </ul>
          <svg-skeleton :node-content='gj_detail'></svg-skeleton>
        </div>
        <div class="ri_vehicleInformation">
          <div class="ri_list_head">
            <span class="fl span"></span>
            <span class="fl text">详细检测</span>
          </div>
          <div class="content oh">
            <div class="modelBox fl" :class="{'mt':index >= 4}" v-for='(msg,index) in gj_detail'>
              <div>
                <nobr v-if='msg.isY' class="fl name nor nameSel">{{msg.recessive}}</nobr>
                <p v-else class="fl name nor">正常</p>
              </div>
              <span class="type" :class='{"typeSel":msg.isY == true}'>{{msg.dictName}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <pop-up :state.sync='popState' :name="popName"></pop-up>
  </div>
</template>

<script>
  import popUp from "../../../components/common/popUp.vue";
  import SvgAppearance from "../svg/ri_svgAppearance.vue";
  import SvgSkeleton from "../svg/ri_svgSkeleton.vue";
  import { Indicator } from 'mint-ui';
  import {mapState, mapMutations} from 'vuex';

  export default {
    name: 'recessiveInjury',
    data () {
      return {
        popState: false,
        popName: "",
        wg_detail: [],  //外观数据
        gj_detail: [],  //骨架数据
        appearanceAry: ["无损伤","喷漆","钣金","更换"], //隐性损伤内容
        wg_if: true,
        gj_if: false,
      }
    },
    components: {
      popUp,
      SvgAppearance,
      SvgSkeleton,
		},
    computed: {
      ...mapState({
        atState: state => state.atState,
			})
    },
    methods:{
      //调用弹层
      popUp (text) {
        this.popState = true;
        this.popName = text;
      },
      //返回
      reTurn () {
        this.$router.push({ path: '/auction/details', query: this.$route.query})
      },
      //隐性损伤切换
      selDi (e,type) {
        $(".sel_nav").removeClass("sel_nav");
        $(e.target).addClass("sel_nav");
        this.wg_if = false;
        this.gj_if = false;
        if(type == 1){
          $(".line").css("left","0");
          this.wg_if = true;
        }else if(type == 2){
          $(".line").css("left","50%")
          this.gj_if = true;
        }
      },
      //数据处理
      detail_map (detail_val,val) {
        if(val.recessive != "1"){
          if(detail_val.dictValue == val.typeNumber){
            //底部检测数组
            detail_val.recessive = this.appearanceAry[val.recessive - 1];
            detail_val.isY = true;
          }
        }
      },
    },
    mounted () {
      $("body").css("background-color","#fff");
      $(window).scrollTop(0);
      if(this.$route.query.status == 2 && this.atState.atState == 2){
        $(".detail").css("margin-bottom","2.06rem")
      }
      Indicator.open();
      setTimeout(() => {
        this.$http.post(this.rootUrl + 'AuctionSession/queryCarDamageEntity',{
            carId: this.$route.query.carId
          },{emulateJSON:true}).then((data) => {
            Indicator.close();
            if(data.body.status == 1000){
              data.body.data.dict.map((val,index) => {
                let msg = {
                  dictName: val.dictName,
                  dictValue: val.dictValue
                }
                if(val.code == 6){
                  this.wg_detail.push(msg)
                }else if(val.code == 4){
                  this.gj_detail.push(msg)
                }
              })
              data.body.data.carDamge.map((val,index) => {
                if(val.damageType == 1){
                  this.wg_detail.map((detail_val,detail_index) => {
                    if(detail_val.dictValue == val.typeNumber){
                      detail_val.recessive = val.recessive;
                      detail_val.isY = true;
                    }
                  })
                }else if(val.damageType == 2){
                  this.gj_detail.map((detail_val,detail_index) => {
                    if(detail_val.dictValue == val.typeNumber){
                      detail_val.recessive = val.recessive;
                      detail_val.isY = true;
                    }
                  })
                }
              })
            }else if(data.body.status == 1001){
              this.popUp(data.body.message);
            }
        }, (data) => {
          Indicator.close();
          this.popUp("服务器响应失败");
        });
      },500)
    }
  }
</script>

<style lang="scss" scoped>
  body{
    background: #fff;
  }
  .ri_header{
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
  .ri_content{
    margin-top: 0.45rem;
    width: 3.75rem;
    .nav{
      width: 3.75rem;
      height: 0.6rem;
      border-bottom: 0.1rem solid #FAFAFA;
      .nav_ul{
        height: 0.5rem;
        .nav_li{
          width: 50%;
          height: 0.5rem;
          text-align: center;
          line-height: 0.5rem;
          font-size: 0.16rem;
          color: #030303;
          opacity: 0.4;
        }
        .line{
          display: block;
          width: 50%;
          height: 0.02rem;
          background-color: #4A90E2;
          position: absolute;
          bottom: 0;
          left: 0;
          transition: all .3s;
        }
        .sel_nav{
          opacity: 1;
        }
      }
    }
    .svg{
      padding-top: 0.2rem;
      .legend{
        width: 3.75rem;
        height: 0.2rem;
        padding: 0 0.4rem 0 0.5rem;
        position: absolute;
        top: 0.2rem;
        .legendList{
          width: 25%;
          height: 0.2rem;
          font-size: 0.14rem;
          color: #333333;
          line-height: 0.2rem;
          .span{
            width: 0.12rem;
            height: 0.12rem;
            margin-right: 0.04rem;
            display: inline-block;
            position: relative;
            left: 0;
            top: 0.01rem;
          }
          .le_1{
            border: 1px solid #979797;
          }
          .le_2{
            background-color: #FFD900;
          }
          .le_3{
            background-color: #F60000;
          }
          .le_4{
            background-color: #ACCFFF;
          }
        }
      }
    }
    .ri_vehicleInformation{
      border-top: 0.1rem solid #FAFAFA;
      border-bottom: 0.2rem solid #FAFAFA;
      .content{
        width: 3.75rem;
        padding: 0.17rem 0.13rem;
        .modelBox{
          width: 0.87rem;
          // height: 0.45rem;
          text-align: center;
          div{
            height: 0.2rem;
          }
          .name{
            width: 0.87rem;
            height: 0.2rem;
            font-size: 0.14rem;
            color: #999;
            line-height: 0.2rem;
          }
          .nor{
            width: 0.87rem;
            height: 0.2rem;
            font-size: 0.14rem;
            color: #999;
            line-height: 0.2rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
          }
          .type{
            width: 0.87rem;
            margin-top: 0.05rem;
            font-size: 0.12rem;
            color: #999999;
            line-height: 0.2rem;
            display: block;
            clear: both;
          }
          .nameSel{
            color: #FF7400;
          }
          .typeSel{
            color: #333;
          }
        }
        .mt{
          margin-top: 0.2rem;
        }
      }
    }
  }
  .ri_list_head{
    width: 3.75rem;
    height: 0.4rem;
    border-top: 1px solid #F1F2F2;
    border-bottom: 1px solid #F3F4F5;
    padding: 0.1rem 0.14rem 0.08rem 0.14rem;
    .text{
      font-size: 0.16rem;
      color: #333333;
      line-height: 0.2rem;
      margin-left: 0.04rem;
    }
    .span{
      width: 0.04rem;
      height: 0.15rem;
      display: inline-block;
      background-color: #FF7400;
      margin-top: 0.025rem;
    }
    .img{
      width: 0.18rem;
      height: 0.18rem;
      margin-top: 0.01rem;
    }
  }
</style>
