<!-- certificates -->
<!-- 手续证件 -->
<template>
  <div class="">
    <header class="oh cf_header" :class="{ 'pad_ios': isiOS, 'pad_android': isAndroid}">
      <img @click='reTurn' src="../../img/icon_all_backBlack@3x.png" alt="" class="fl">
      <p>手续证件</p>
    </header>
    <div class="cf_content oh car-list my-gallery">
      <div class="template fl" v-for='(img,index) in otherList' :key="img.id">
        <figure class="figure">
          <div><a :href="img.url" :data-size="dataSize"><img class="img" :index='index' v-lazy="img.url"></a></div>
          <figcaption>{{img.name}}</figcaption>
        </figure>
        <p class="name">{{img.name}}</p>
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
  import popUp from "../../components/common/popUp.vue";
  import yulan from "../../style/tupianyulan.js";
  import { Lazyload,Indicator } from 'mint-ui';
  import Vue from 'vue';
  import {mapState, mapMutations} from 'vuex';

  Vue.use(Lazyload);

  export default {
    name: 'certificates',
    data () {
      return {
        popState: false,
        popName: "",
        otherList: [], //图片数据
        dataSize: ((window.innerWidth/375)*375)+'x'+((window.innerWidth/375)*210)
      }
    },
    components: {
      popUp,
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
      //获取数据
      getData() {
        Indicator.open();
        setTimeout(() => {
          this.$http.post(this.rootUrl + 'AuctionSession/getRestsPicture',{
              carId: this.$route.query.carId
            },{emulateJSON:true}).then((data) => {
              Indicator.close();
              if(data.body.status == 1000){
                this.otherList = data.body.data;
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
    mounted () {
      $("body").css("background-color","#fff");
      $('body').scrollTop(0);
      if(this.$route.query.status == 2 && this.atState.atState == 2){
        $(".detail").css("margin-bottom","2.06rem")
      }

      this.getData();
      yulan();
    }
  }
</script>

<style lang="scss" scoped>
.animated {
-webkit-animation-duration: 0.8s;
animation-duration: 0.8s;
-webkit-animation-fill-mode: both;
animation-fill-mode: both;
}
.animated.infinite {
-webkit-animation-iteration-count: infinite;
animation-iteration-count: infinite;
}

@-webkit-keyframes slideInLeft {
from {
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
  visibility: visible;
}
to {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
}
@keyframes slideInLeft {
from {
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
  visibility: visible;
}
to {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
}
.slideInLeft {
-webkit-animation-name: slideInLeft;
animation-name: slideInLeft;
}

@-webkit-keyframes slideInRight {
from {
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
  visibility: visible;
}
to {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
}
@keyframes slideInRight {
from {
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
  visibility: visible;
}
to {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
}
.slideInRight {
-webkit-animation-name: slideInRight;
animation-name: slideInRight;
}

@-webkit-keyframes slideOutLeft {
from {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
to {
  visibility: hidden;
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
}
}
@keyframes slideOutLeft {
from {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
to {
  visibility: hidden;
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
}
}
.slideOutLeft {
-webkit-animation-name: slideOutLeft;
animation-name: slideOutLeft;
}

@-webkit-keyframes slideOutRight {
from {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
to {
  visibility: hidden;
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
}
}
@keyframes slideOutRight {
from {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
to {
  visibility: hidden;
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
}
}
.slideOutRight {
-webkit-animation-name: slideOutRight;
animation-name: slideOutRight;
}

@-webkit-keyframes inRight {
0% {
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
}
to {
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}
}
@keyframes inRight {
0% {
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
}
to {
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}
}
@-webkit-keyframes outLeft {
0% {
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}
to {
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
}
}
@keyframes outLeft {
0% {
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}
to {
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
}
}



  body{
    background: #fff;
  }
  .cf_header{
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
  .cf_content{
    margin-top: 0.45rem;
    width: 3.75rem;
    padding: 0 0 0.4rem 0.18rem;
    .template{
      width: 1.6rem;
      height: 1.2rem;
      margin: 0.2rem 0.17rem 0 0;
      figure{
        margin: 0;
        width: 1.6rem;
        height: 0.895rem;
        overflow: hidden;
      }
      .img{
        width: 1.6rem;
        height: 0.895rem;
        background-color: #999;
      }
      .name{
        width: 1.6rem;
        height: 0.2rem;
        line-height: 0.2rem;
        margin-top: 0.1rem;
        font-size: 0.14rem;
        color: #666666;
        text-align: center;
      }
    }
  }
  image[lazy=loading] {
    width: 0.4rem;
    height: 3rem;
    margin: auto;
  }
</style>
