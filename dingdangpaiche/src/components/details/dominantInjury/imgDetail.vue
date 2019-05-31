<!-- imgDetail -->
<!-- 显性损伤图片查看 -->
<template>
  <div>
    <header class="oh id_header" :class="{ 'pad_ios': isiOS, 'pad_android': isAndroid}">
      <img @click='reTurn' src="../../../img/icon_all_backBlack@3x.png" alt="" class="fl">
      <p>故障图片-{{this.$route.query.type}}</p>
    </header>
    <div class="id_content" :class="{ 'pad_ios': isiOS, 'pad_android': isAndroid}">
      <div class="content por">
        <p class="title">{{this.$route.query.msg[this.swiperIndex].name}}：{{this.$route.query.msg[this.swiperIndex].dominant}}</p>
        <swiper :options="swiperOption" ref="mySwiper" class="main car-list my-gallery">
          <swiper-slide v-for='(img,index) in imgList' :key="index">
            <figure class="figure">
              <div>
                <a :href="img.imgUrl" :data-size="dataSize"><img class="img" :index='index' v-lazy="img.imgUrl"></a>
              </div>
              <figcaption>{{img.dominant}}</figcaption>
            </figure>
          </swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
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
  </div>
</template>

<script>
import yulan from "../../../style/tupianyulan.js";

export default {
  name: "imgDetail",
  data() {
    return {
      imgList: [],
      dataSize:
        window.innerWidth / 375 * 375 + "x" + window.innerWidth / 375 * 210, //data-size
      swiperOption: {
        effect: "slide",
        pagination: {
          el: ".swiper-pagination",
          type: "fraction"
        },
        on: {
          //滑动后执行事件
          slideChangeTransitionEnd: () => {
            //切换结束时执行
            this.swiperIndex = this.swiper.activeIndex;
          }
        }
      },
      swiperIndex: 0 //当前页数
    };
  },
  components: {},
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    //返回
    reTurn() {
      this.$router.go(-1);
    }
  },
  mounted() {
    $("body").css("background-color", "#fff");

    this.imgList = this.$route.query.msg;
    yulan();
  }
};
</script>

<style lang="scss" scoped>
body {
  background: #fff;
}
.id_header {
  width: 3.75rem;
  background-color: #f9f9f9;
  border-bottom: 1px solid #d6d6d6;
  position: fixed;
  top: 0;
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
.id_content {
  width: 3.75rem;
  position: fixed;
  top: 0.45rem;
  left: 0;
  z-index: 60;
  .title {
    width: 3.75rem;
    // height: 0.45rem;
    line-height: 0.45rem;
    text-align: center;
    background-color: #000;
    font-size: 0.16rem;
    color: #ffffff;
  }
  .content {
    width: 3.75rem;
    height: 6.22rem;
    background-color: #333333;
    .main {
      width: 3.75rem;
      height: 2.1rem;
      position: absolute;
      top: 1.5rem;
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
  }
}
/*分页器样式*/
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 0.1rem;
  font-size: 0.12rem;
  color: #fff;
}
</style>
