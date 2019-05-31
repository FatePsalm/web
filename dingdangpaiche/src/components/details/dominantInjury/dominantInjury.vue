<!-- dominantInjury -->
<!-- 显性损伤 -->
<template>
  <div class="">
    <header class="oh di_header" :class="{ 'pad_ios': isiOS, 'pad_android': isAndroid}">
      <img @click='reTurn' src="../../../img/icon_all_backBlack@3x.png" alt="" class="fl">
      <p>显性损伤</p>
    </header>
    <div class="di_content oh">
      <div class="nav">
        <ul class="nav_ul oh por">
          <li class="nav_li fl sel_nav" id='wg' @click='selDi("wg",1)'>外观</li>
          <li class="nav_li fl" id="gj" @click='selDi("gj",2)'>骨架</li>
          <li class="nav_li fl" id='ns' @click='selDi("ns",3)'>内饰</li>
          <span class="line"></span>
        </ul>
      </div>
      <div v-show='wg_if'>
        <div class="svg por">
          <svg-appearance></svg-appearance>
          <p class="legend"><span class="spot"></span><span class="text">瑕疵</span></p>
          <span v-if='msg.xy.length > 0' class="flaw" @click='flawClick(index)' :style='"left:"+msg.xy.split(",")[0] + "rem;top:"+msg.xy.split(",")[1] + "rem"' v-for='(msg,index) in wg_list' :key='index'>{{index + 1}}</span>
        </div>
        <div class="di_content_swipe por" v-show='this.wg_list.length > 0 && this.wg_list[0].imgUrl != ""'>
          <span>
            <swiper :options="swiperOption" ref="mySwiper1" class="di_swipe car-list my-gallery">
              <swiper-slide v-for="(msg,index) in wg_list" :key="index">
                <figure class="figure" v-if='wg_if'>
                  <div><a :href="msg.imgUrl" :data-size="dataSize"><img :index='index' :src="msg.imgUrl"></a></div>
                  <figcaption>{{msg.name}}：{{msg.dominant}}</figcaption>
                </figure>
                <div class="swipeFooter">
                  <nobr class="fl swipeText">{{wg_list[index].name}}：{{wg_list[index].dominant}}</nobr>
                  <p class="swipeNum fr">{{index+1}}/{{wg_list.length}}</p>
                </div>
              </swiper-slide>
            </swiper>
          </span>
        </div>
        <div class="di_vehicleInformation">
          <div class="di_list_head">
            <span class="fl span"></span>
            <span class="fl text">详细检测</span>
          </div>
          <div class="content oh">
            <div class="modelBox fl" @click='imgDi(msg,msg.isY,"外观","wg_list")' :class="{'mt':index >= 4}" v-for='(msg,index) in wg_detail'>
              <div>
                <nobr v-if='msg.isY' class="fl name nor nameSel">{{msg.dominant}}</nobr>
                <p v-else class="fl name nor">正常</p>
                <img v-if='msg.isY' class="di_hintInformation" src="../../../img/Group 26.png" alt="">
              </div>
              <span class="type" :class='{"typeSel":msg.isY == true}'>{{msg.dictName}}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-show='gj_if'>
        <div class="svg por">
          <svg-skeleton></svg-skeleton>
          <p class="legend"><span class="spot"></span><span class="text">瑕疵</span></p>
          <span v-if='msg.xy.length > 0' class="flaw" @click='flawClick(index)' :style='"left:"+msg.xy.split(",")[0] + "rem;top:"+msg.xy.split(",")[1] + "rem"' v-for='(msg,index) in gj_list' :key='index'>{{index + 1}}</span>
        </div>
        <div class="di_content_swipe por" v-show='this.gj_list.length > 0 && this.gj_list[0].imgUrl != ""'>
          <li>
            <swiper :options="swiperOption" ref="mySwiper2" class="di_swipe car-list my-gallery">
              <swiper-slide v-for="(msg,index) in gj_list" :key="index">
                <figure class="figure" v-if='gj_if'>
                  <div><a :href="msg.imgUrl" :data-size="dataSize"><img :index='index' :src="msg.imgUrl"></a></div>
                  <figcaption>{{msg.name}}：{{msg.dominant}}</figcaption>
                </figure>
                <div class="swipeFooter">
                  <nobr class="fl swipeText">{{gj_list[index].name}}：{{gj_list[index].dominant}}</nobr>
                  <p class="swipeNum fr">{{index+1}}/{{gj_list.length}}</p>
                </div>
              </swiper-slide>
            </swiper>
          </li>
        </div>
        <div class="di_vehicleInformation">
          <div class="di_list_head">
            <span class="fl span"></span>
            <span class="fl text">详细检测</span>
          </div>
          <div class="content oh">
            <div class="modelBox fl" @click='imgDi(msg,msg.isY,"骨架","gj_list")' :class="{'mt':index >= 4}" v-for='(msg,index) in gj_detail'>
              <div>
                <nobr v-if='msg.isY' class="fl name nor nameSel">{{msg.dominant}}</nobr>
                <p v-else class="fl name nor">正常</p>
                <img v-if='msg.isY' class="di_hintInformation" src="../../../img/Group 26.png" alt="">
              </div>
              <span class="type" :class='{"typeSel":msg.isY == true}'>{{msg.dictName}}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-show='ns_if'>
        <div class="svg por">
          <svg-interior></svg-interior>
          <p class="legend"><span class="spot"></span><span class="text">瑕疵</span></p>
          <span v-if='msg.xy.length > 0' class="flaw" @click='flawClick(index)' :style='"left:"+msg.xy.split(",")[0] + "rem;top:"+msg.xy.split(",")[1] + "rem"' v-for='(msg,index) in ns_list' :key='index'>{{index + 1}}</span>
        </div>
        <div class="di_content_swipe por" v-show='this.ns_list.length > 0 && this.ns_list[0].imgUrl != ""'>
          <div>
            <swiper :options="swiperOption" ref="mySwiper3" class="di_swipe car-list my-gallery">
              <swiper-slide v-for="(msg,index) in ns_list" :key="index">
                <figure class="figure" v-if='ns_if'>
                  <div><a :href="msg.imgUrl" :data-size="dataSize"><img :index='index' :src="msg.imgUrl"></a></div>
                  <figcaption>{{msg.name}}：{{msg.dominant}}</figcaption>
                </figure>
                <div class="swipeFooter">
                  <nobr class="fl swipeText">{{ns_list[index].name}}：{{ns_list[index].dominant}}</nobr>
                  <p class="swipeNum fr">{{index+1}}/{{ns_list.length}}</p>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="di_vehicleInformation">
          <div class="di_list_head">
            <span class="fl span"></span>
            <span class="fl text">详细检测</span>
          </div>
          <div class="content oh">
            <div class="modelBox fl" @click='imgDi(msg,msg.isY,"内饰","ns_list")' :class="{'mt':index >= 4}" v-for='(msg,index) in ns_detail'>
              <div>
                <nobr v-if='msg.isY' class="fl name nor nameSel">{{msg.dominant}}</nobr>
                <p v-else class="fl name nor">正常</p>
                <img v-if='msg.isY' class="di_hintInformation" src="../../../img/Group 26.png" alt="">
              </div>
              <span class="type" :class='{"typeSel":msg.isY == true}'>{{msg.dictName}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片预览 -->
  	<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
	    <div class="pswp__bg"></div>
	    <div class="pswp__scroll-wrap">
	        <div class="pswp__container">
	            <div class="pswp__item"></div>
	            <div class="pswp__item"></div>
	            <div class="pswp__item"></div>
	        </div>
	        <div class="pswp__ui pswp__ui--hidden">
	            <div class="pswp__top-bar">
	                <div class="pswp__counter"></div>
	                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
	                <button class="pswp__button pswp__button--share" title="Share"></button>
	                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
	                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
	                <div class="pswp__preloader">
	                    <div class="pswp__preloader__icn">
	                      <div class="pswp__preloader__cut">
	                        <div class="pswp__preloader__donut"></div>
	                      </div>
	                    </div>
	                </div>
	            </div>
	            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
	                <div class="pswp__share-tooltip"></div>
	            </div>
	            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
	            </button>
	            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
	            </button>
	            <div class="pswp__caption">
	                <div class="pswp__caption__center"></div>
	            </div>
	        </div>
	    </div>
  	</div>
    <pop-up :state.sync='popState' :name="popName"></pop-up>
  </div>
</template>

<script>
import popUp from "../../../components/common/popUp.vue";
import SvgAppearance from "../svg/svgAppearance.vue";
import SvgSkeleton from "../svg/svgSkeleton.vue";
import SvgInterior from "../svg/svgInterior.vue";
import yulan from "../../../style/tupianyulan.js";
import { Indicator } from "mint-ui";
import { mapState, mapMutations } from "vuex";

export default {
  name: "dominantInjury",
  data() {
    return {
      popState: false,
      popName: "",
      dataSize:
        window.innerWidth / 375 * 375 + "x" + window.innerWidth / 375 * 210,
      wg_list: [
        {
          dominant: "",
          imgUrl: "",
          name: "",
          xy: ""
        }
      ],
      wg_detail: [], //外观数据字典
      gj_list: [
        {
          dominant: "",
          imgUrl: "",
          name: "",
          xy: ""
        }
      ],
      gj_detail: [], //骨架数据字典
      ns_list: [
        {
          dominant: "",
          imgUrl: "",
          name: "",
          xy: ""
        }
      ],
      ns_detail: [], //内饰数据字典
      appearanceAry: [
        "划伤,",
        "凹坑,",
        "生锈,",
        "砂眼,",
        "腻子痕迹,",
        "砂纸痕迹,",
        "局部色差,",
        "橘皮垂流,",
        "皲裂痕迹,"
      ], //显性损伤内容
      wg_if: true,
      gj_if: false,
      ns_if: false,
      dom: "wg",
      type: 1,
      record: false,
      swiperOption: {
        effect: "slide",
        pagination: {
          el: ".swiper-pagination",
          type: "fraction"
        }
      }
    };
  },
  components: {
    popUp,
    SvgAppearance,
    SvgSkeleton,
    SvgInterior
  },
  computed: {
    ...mapState({
      dIstate: state => state.dIstate,
      atState: state => state.atState
    }),
    swiper1() {
      return this.$refs.mySwiper1.swiper;
    },
    swiper2() {
      return this.$refs.mySwiper2.swiper;
    },
    swiper3() {
      return this.$refs.mySwiper3.swiper;
    }
  },
  methods: {
    ...mapMutations(["setdIstate"]),
    //调用弹层
    popUp(text) {
      this.popState = true;
      this.popName = text;
    },
    //返回
    reTurn() {
      this.$router.push({ path: "/auction/details", query: this.$route.query });
    },
    //显性损伤切换
    selDi(e, type) {
      this.dom = e;
      this.type = type;
      $(".sel_nav").removeClass("sel_nav");
      $("#" + e).addClass("sel_nav");
      this.wg_if = false;
      this.gj_if = false;
      this.ns_if = false;
      if (type == 1) {
        $(".line").css("left", "0");
        this.wg_if = true;
        this.swiper1.slideTo(0, 0, false);
      } else if (type == 2) {
        $(".line").css("left", "33.3%");
        this.gj_if = true;
        this.swiper2.slideTo(0, 0, false);
      } else if (type == 3) {
        $(".line").css("left", "66.6%");
        this.ns_if = true;
        this.swiper3.slideTo(0, 0, false);
      }
    },
    //数据处理
    detail_map(detail_val, val, list) {
      if (detail_val.dictValue == val.typeNumber && val.imgUrl != null) {
        detail_val.dominant = val.dominant;
        detail_val.imgUrl = val.imgUrl;
        detail_val.isY = true;
        //svg，图片数组
        let eg = {
          imgUrl: val.imgUrl,
          xy: val.xy,
          name: detail_val.dictName,
          dominant: detail_val.dominant,
          dictValue: detail_val.dictValue
        };
        list.push(eg);
      }
    },
    //详细检测点击事件
    imgDi(msg, is, type, array) {
      if (is) {
        this.record = true;
        let newArray = [];
        this[array].map((val, index) => {
          if (msg.dictValue == val.dictValue) {
            newArray.push(val);
          }
        });
        let query = this.$route.query;
        query.type = type;
        query.msg = newArray;
        this.$router.push({ path: "/auction/imgDetail", query: query });
      }
    },
    //瑕疵点
    flawClick(index) {
      if (this.type == 1) {
        this.swiper1.slideTo(index, 300, false);
      } else if (this.type == 2) {
        this.swiper2.slideTo(index, 300, false);
      } else if (this.type == 3) {
        this.swiper3.slideTo(index, 300, false);
      }
    },
    //获取数据
    getData() {
      Indicator.open();
      setTimeout(() => {
        this.$http
          .post(
            this.rootUrl + "AuctionSession/getCarDominant",
            {
              carId: this.$route.query.carId
            },
            { emulateJSON: true }
          )
          .then(
            data => {
              Indicator.close();
              if (data.body.status == 1000) {
                data.body.data.dict.map((val, index) => {
                  let msg = {
                    dictName: val.dictName,
                    dictValue: val.dictValue
                  };
                  val.code == 3
                    ? this.wg_detail.push(msg)
                    : val.code == 4
                      ? this.gj_detail.push(msg)
                      : val.code == 5
                        ? this.ns_detail.push(msg)
                        : console.log();
                });
                let wgMap = false;
                let gjMap = false;
                let nsMap = false;
                data.body.data.carDamge.map((val, index) => {
                  if (val.damageType == 1) {
                    if (val.imgUrl != null && wgMap == false) {
                      this.wg_list = [];
                      wgMap = true;
                    }
                    this.wg_detail.map((detail_val, detail_index) => {
                      this.detail_map(detail_val, val, this.wg_list);
                    });
                  } else if (val.damageType == 2) {
                    if (val.imgUrl != null && gjMap == false) {
                      this.gj_list = [];
                      gjMap = true;
                    }
                    this.gj_detail.map((detail_val, detail_index) => {
                      this.detail_map(detail_val, val, this.gj_list);
                    });
                  } else if (val.damageType == 3) {
                    if (val.imgUrl != null && nsMap == false) {
                      this.ns_list = [];
                      nsMap = true;
                    }
                    this.ns_detail.map((detail_val, detail_index) => {
                      this.detail_map(detail_val, val, this.ns_list);
                    });
                  }
                });
              } else if (data.body.status == 1001) {
                this.popUp(data.body.message);
              }
            },
            data => {
              Indicator.close();
              this.popUp("服务器响应失败");
            }
          );
      }, 500);
    }
  },
  mounted() {
    $("body").css("background-color", "#fff");
    $(window).scrollTop(0);

    if (this.dIstate != "") {
      this.selDi(this.dIstate.dom, this.dIstate.type);
    }
    if (this.$route.query.status == 2 && this.atState.atState == 2) {
      $(".detail").css("margin-bottom", "2.06rem");
    }
    this.getData();
    yulan();
  },
  beforeDestroy() {
    if (this.record) {
      let dIstate = {
        dom: this.dom,
        type: this.type
      };
      this.setdIstate(dIstate);
    } else {
      this.setdIstate("");
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  background: #fff;
}
.di_header {
  width: 3.75rem;
  // height: 0.45rem;
  background-color: #f9f9f9;
  border-bottom: 1px solid #d6d6d6;
  position: fixed;
  top: 0px;
  z-index: 1000;
  img {
    width: 0.37rem;
    height: 0.45rem;
    padding: 0.12rem;
  }
  p {
    width: 3.38rem;
    text-align: center;
    line-height: 0.45rem;
    font-size: 0.17rem;
    color: #030303;
  }
}
.di_content {
  margin-top: 0.45rem;
  width: 3.75rem;
  background-color: #fff;
  .nav {
    width: 3.75rem;
    height: 0.6rem;
    border-bottom: 0.1rem solid #fafafa;
    .nav_ul {
      height: 0.5rem;
      .nav_li {
        width: 33.3%;
        height: 0.5rem;
        text-align: center;
        line-height: 0.5rem;
        font-size: 0.16rem;
        color: #030303;
        opacity: 0.4;
      }
      .line {
        display: block;
        width: 33.3%;
        height: 0.02rem;
        background-color: #4a90e2;
        position: absolute;
        bottom: 0;
        left: 0;
        transition: all 0.3s;
      }
      .sel_nav {
        opacity: 1;
      }
    }
  }
  .svg {
    .legend {
      position: absolute;
      top: 0.2rem;
      left: 0.25rem;
      font-size: 0.14rem;
      color: #333333;
      line-height: 0.2rem;
      .spot {
        display: inline-block;
        width: 0.12rem;
        height: 0.12rem;
        border-radius: 50%;
        margin-right: 0.05rem;
        background-color: #ff7400;
      }
    }
    .flaw {
      width: 0.14rem;
      height: 0.14rem;
      display: block;
      text-align: center;
      line-height: 0.14rem;
      background-color: #ff7400;
      color: #fff;
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 50%;
      font-size: 0.1rem;
    }
  }
  .di_content_swipe {
    width: 3.75rem;
    height: 2.1rem;
    .di_swipe {
      width: 3.75rem;
      height: 2.1rem;
      img {
        width: 3.75rem;
        height: 2.1rem;
        background-color: #999;
      }
      figure {
        width: 3.75rem;
        height: 2.1rem;
        margin: 0;
        position: absolute;
        top: 0;
        z-index: 1;
      }
    }
    .swipeFooter {
      width: 3.75rem;
      height: 0.32rem;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 33;
      background-image: linear-gradient(
        -180deg,
        rgba(0, 0, 0, 0) 0%,
        #000000 100%
      );
      .swipeNum {
        line-height: 0.32rem;
        font-size: 0.12rem;
        color: #ffffff;
        margin-right: 0.1rem;
      }
      .swipeText {
        width: 3rem;
        line-height: 0.32rem;
        font-size: 0.12rem;
        color: #ffffff;
        margin-left: 0.1rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .di_vehicleInformation {
    border-top: 0.1rem solid #fafafa;
    border-bottom: 0.2rem solid #fafafa;
    .content {
      width: 3.75rem;
      padding: 0.17rem 0.13rem;
      .modelBox {
        width: 0.87rem;
        // height: 0.45rem;
        text-align: center;
        div {
          height: 0.2rem;
        }
        .name {
          width: 0.87rem;
          height: 0.2rem;
          font-size: 0.14rem;
          color: #999;
          line-height: 0.2rem;
        }
        .nor {
          width: 0.87rem;
          height: 0.2rem;
          font-size: 0.14rem;
          color: #999;
          line-height: 0.2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
        }
        .type {
          width: 0.87rem;
          margin-top: 0.05rem;
          font-size: 0.12rem;
          color: #999999;
          line-height: 0.2rem;
          display: block;
          clear: both;
        }
        .nameSel {
          color: #ff7400;
          width: 0.7rem;
        }
        .typeSel {
          color: #333;
        }
      }
      .mt {
        margin-top: 0.2rem;
      }
    }
  }
}
.di_list_head {
  width: 3.75rem;
  height: 0.4rem;
  border-top: 1px solid #f1f2f2;
  border-bottom: 1px solid #f3f4f5;
  padding: 0.1rem 0.14rem 0.08rem 0.14rem;
  .text {
    font-size: 0.16rem;
    color: #333333;
    line-height: 0.2rem;
    margin-left: 0.04rem;
  }
  .span {
    width: 0.04rem;
    height: 0.15rem;
    display: inline-block;
    background-color: #ff7400;
    margin-top: 0.025rem;
  }
  .img {
    width: 0.18rem;
    height: 0.18rem;
    margin-top: 0.01rem;
  }
}
.di_hintInformation {
  width: 0.14rem;
  height: 0.14rem;
}
</style>
