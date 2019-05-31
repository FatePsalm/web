<!-- 详情 -->
<template>
  <div @click='closeInfor' class="detail">
    <header class="oh dt_header" :class="{ 'pad_ios': isiOS, 'pad_android': isAndroid}">
      <img @click='reTurn' src="../../img/icon_all_backBlack@3x.png" alt="" class="fl">
      <p>详情</p>
    </header>
    <div class="dt_content">
      <div class="dt_content_head por">
        <swiper :options="swiperOption" ref="mySwiper" class="dt_swipe car-list my-gallery">
          <swiper-slide v-for='(img,index) in imgList' :key="img.id">
            <figure class="figure">
              <div>
                <a :href="img.url" :data-size="dataSize"><img class="img" :index='index' v-lazy="img.url"></a>
              </div>
              <figcaption>{{img.name}}</figcaption>
            </figure>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <img @click='reTurn' class="swipeReturn" src="../../img/icon_all_backWhite@3x.png" alt="">
      </div>
      <div class="dt_basicInformation por">
        <h3 class="dt_bf_title">{{datas.carName}} {{datas.cars}} {{datas.carModel}}</h3>
        <div class="dt_bf_carCondition">
          <span class="fl" style="margin-right:0.04rem;">{{datas.reTime}}年 | {{datas.mileage}}km | 排放标准</span>
          <div class="demo-icon-tip fl" ref="demo" @mouseenter="show=true" @mouseleave="show=false">
            <span class="dt_hintInformation">?</span>
            <mu-tooltip label="需要自行确认" :show="show" :trigger="$refs.demo" :touch="true" verticalPosition="top" horizontalPosition="center"/>
          </div>
          <span class="fl" style="margin-left:0.07rem;">| {{datas.carNumber}}</span>
        </div>
        <p class="dt_bf_serviceCharge cb" v-if='this.atState.atState == 3'>服务费：{{this.seckill_data.serverMoney}}元 | 过户费：800元</p>
        <p v-else class="dt_bf_serviceCharge cb">服务费：车价2%，最低2000元 | 过户费：800元</p>
        <div class="dt_bf_price">
          <div v-if='this.$route.query.carMoney'>
            <span class="fl price">{{this.calc.div(this.$route.query.carMoney,10000)}}万</span>
            <span class="fl text">成交</span>
          </div>
          <div v-else>
            <span v-if='this.atState.atState == 3' class="fl price">{{this.seckill_data.carMoney}}万</span>
            <span v-else class="fl price">{{datas.askingPrice}}万</span>
            <span v-if='this.atState.atState == 3' class="fl onePrice">一口价</span>
            <span v-else class="fl text">起拍</span>
          </div>

          <!-- <img class="fl" src="../../img/icon_home_tab_yellow@3x.png" alt=""> -->
          <img v-if='datas.isbid == 1' class="fl" src="../../img/icon_window_tab_blue@3x.png" alt="">
        </div>
        <img v-if='datas.status == 2' class="dt_auctionIng" src="../../img/icon_cardetails_table@3x.png" alt="">
      </div>
      <div class="dt_testingInformation">
        <div class="dt_list_head">
          <span class="fl span"></span>
          <span class="fl text">检测师报告</span>
          <img class="fr img" src="../../img/icon_cardetails_explain@3x.png" alt="">
        </div>
        <div class="dt_ti_title_content oh">
          <div class="dt_ti_title_quality fl por">
            <span>{{conditionIdJ[datas.conditionId-1]}}{{maintenanceJ[datas.maintenance-1]}}</span>
            <img src="../../img/cardetails_grade.png" alt="">
          </div>
          <div class="fr dt_ti_title_presentation">
            <div class="oh">
              <p class="fl">重要损伤：</p>
              <div class="fl">
                <span v-if='this.datas.synthesise == null'>无</span>
                <span v-if='this.datas.synthesise !=null ? this.datas.synthesise.includes("1") : this.datas.synthesise = this.datas.synthesise'>该车为水泡车</span>
                <span v-if='this.datas.synthesise !=null ? this.datas.synthesise.includes("2") : this.datas.synthesise = this.datas.synthesise'>该车为火烧车</span>
                <span v-if='this.datas.synthesise !=null ? this.datas.synthesise.includes("3") : this.datas.synthesise = this.datas.synthesise'>该车有重要损伤</span>
              </div>
            </div>
            <div class="oh">
              <p class="fl">综合车况：</p>
              <span class="fl">{{this.conditionGrade}}</span>
            </div>
            <div class="oh">
              <p class="fl">车龄里程：</p>
              <span class="fl">{{maintenanceX[datas.maintenance-1]}}</span>
            </div>
          </div>
        </div>
        <div class="dt_ti_describe">
          <h3 class="title">综合描述</h3>
          <p class="content">{{datas.remarks}}</p>
        </div>
      </div>
      <div class="dt_vehicleInformation">
        <div class="dt_list_head">
          <span class="fl span"></span>
          <span class="fl text">基本信息</span>
        </div>
        <div class="content">
          <div class="modelBox fl" @mouseenter="shows=true" @mouseleave="shows=false">
            <div>
              <nobr class="fl name nor">{{datas.carName}} {{datas.cars}} {{datas.carModel}}</nobr>
              <div v-if='datas.carName != null || datas.cars != null || datas.carModel != null' class="demo-icon-tip fl" ref="demos">
                <img class="tooltipImg" src="../../img/Group 26.png" alt="">
                <mu-tooltip class="toolTip" :label="datas.carName+' '+datas.cars+' '+datas.carModel" :show="shows" :trigger="$refs.demos" :touch="true" verticalPosition="bottom" horizontalPosition="right"/>
              </div>
            </div>
            <span class="type">车型</span>
          </div>
          <div class="modelBox fl">
            <p class="name">{{datas.powerType}}</p>
            <span class="type">动力类型</span>
          </div>
          <div class="modelBox fl">
            <p class="name">{{datas.displacement}}L</p>
            <span class="type">排量</span>
          </div>
          <div class="modelBox fl">
            <p class="name">{{datas.transmission}}</p>
            <span class="type">变速箱</span>
          </div>

          <div class="modelBox fl mt">
            <p class="name">{{datas.skylight}}</p>
            <span class="type">天窗</span>
          </div>
          <div class="modelBox fl mt">
            <p class="name">{{datas.color}}</p>
            <span class="type">车辆颜色</span>
          </div>
          <div class="modelBox fl mt">
            <p class="name">{{datas.keys}}</p>
            <span class="type">钥匙数量</span>
          </div>
          <div class="modelBox fl mt">
            <p class="name">{{datas.manufacture}}</p>
            <span class="type">出厂日期</span>
          </div>

          <div class="modelBox fl mt">
            <p class="name">{{datas.carUseType}}</p>
            <span class="type">使用性质</span>
          </div>
          <div class="modelBox fl mt">
            <p v-if='datas.masterType == 1' class="name">个人</p>
            <p v-if='datas.masterType == 2' class="name">企业</p>
            <p v-if='datas.masterType == 3' class="name">机构</p>
            <span class="type">车辆所属</span>
          </div>
          <div class="modelBox fl mt">
            <p v-if='datas.mortgage == 0' class="name">无</p>
            <p v-if='datas.mortgage == 1' class="name">有</p>
            <span class="type">有无抵押</span>
          </div>
          <div class="modelBox fl mt">
            <p v-if='datas.mortgagePeriod == null' class="name">-</p>
            <p v-else class="name">{{datas.mortgagePeriod}}</p>
            <span class="type">解押周期</span>
          </div>

          <div class="modelBox fl mt">
            <p class="name">{{datas.changeNumber}}</p>
            <span class="type">过户次数</span>
          </div>
          <div class="modelBox fl mt">
            <p v-if='datas.paper == 0' class="name">无</p>
            <p v-if='datas.paper == 1' class="name">有</p>
            <span class="type">过户票据</span>
          </div>
          <div class="modelBox fl mt">
            <p v-if='datas.changeTime == null' class="name">-</p>
            <p v-else class="name">{{datas.changeTime}}</p>
            <span class="type">上次过户时间</span>
          </div>
          <div class="modelBox fl mt">
            <p v-if='datas.changeMoney == null' class="name">-</p>
            <p v-else class="name">{{datas.changeMoney}}</p>
            <span class="type">上次过户价格</span>
          </div>
        </div>
      </div>
      <div class="dt_usage">
        <div class="dt_list_head">
          <span class="fl span"></span>
          <span class="fl text">使用情况</span>
        </div>
        <ul class="us_list">
          <li class="us_listLi">
            <span class="name fl">行使里程</span>
            <span class="text fr">{{datas.mileage}}Km</span>
          </li>
          <li class="us_listLi">
            <span class="name fl">交强险</span>
            <span class="text fr">{{datas.insuranceTime}}止</span>
          </li>
          <li class="us_listLi">
            <span class="name fl">商业险</span>
            <span v-if='datas.business == 0' class="text fr">无</span>
            <span v-if='datas.business == 1' class="text fr">有</span>
          </li>
          <li class="us_listLi borBN">
            <span class="name fl">被保人与车主</span>
            <span v-if='datas.consistent == 1' class="text fr">一致</span>
            <span v-if='datas.consistent == 0' class="text fr">不一致</span>
          </li>
        </ul>
      </div>
      <div class="dt_certificates" @click='toCf'>
        <div class="dt_list_head">
          <span class="fl span"></span>
          <span class="fl text">手续证件</span>
          <img class="jump fr" src="../../img/jump.jpg" alt="">
        </div>
      </div>
      <div class="dt_damage">
        <div class="dt_list_head">
          <span class="fl span"></span>
          <span class="fl text">损伤检测</span>
        </div>
        <ul class="list">
          <li class="listBar" @click='to_di'>
            <span class="name fl">显性损伤</span>
            <img class="jump fr marT" src="../../img/jump.jpg" alt="">
            <span class="text fr">({{datas.dcount}})</span>
          </li>
          <li class="listBar borBN" @click='to_ri'>
            <span class="name fl">隐性损伤</span>
            <img class="jump fr marT" src="../../img/jump.jpg" alt="">
            <span class="text fr">({{datas.rcount}})</span>
          </li>
        </ul>
      </div>
      <div class="dt_electrical dt_vehicleInformation">
        <div class="dt_list_head">
          <span class="fl span"></span>
          <span class="fl text">电气及附件检测</span>
        </div>
        <div class="">
          <mt-swipe :auto="0" :show-indicators="true" class="dt__ele_swipe">
            <mt-swipe-item>
              <div class="content">
                <div class="modelBox fl">
                  <p class="name">{{datas.acoustics}}</p>
                  <span class="type">音响</span>
                </div>
                <div class="modelBox fl">
                  <p class="name">{{datas.skylightCheck}}</p>
                  <span class="type">天窗装置</span>
                </div>
                <div class="modelBox fl">
                  <p class="name">{{datas.door}}</p>
                  <span class="type">车门电动窗</span>
                </div>
                <div class="modelBox fl">
                  <p class="name">{{datas.lighting}}</p>
                  <span class="type">车内外照明</span>
                </div>

                <div class="modelBox fl mt">
                  <p class="name">{{datas.electric}}</p>
                  <span class="type">电动座椅</span>
                </div>
                <div class="modelBox fl mt">
                  <p class="name">{{datas.hot}}</p>
                  <span class="type">电加热座椅</span>
                </div>
                <div class="modelBox fl mt">
                  <p class="name">{{datas.steering}}</p>
                  <span class="type">方向盘多功能按键</span>
                </div>
                <div class="modelBox fl mt">
                  <p class="name">{{datas.safety}}</p>
                  <span class="type">安全带</span>
                </div>

                <div class="modelBox fl mt">
                  <p class="name">{{datas.airbag}}</p>
                  <span class="type">安全气囊</span>
                </div>
                <div class="modelBox fl mt">
                  <p class="name">{{datas.parking}}</p>
                  <span class="type">驻车系统</span>
                </div>
                <div class="modelBox fl mt">
                  <p class="name">{{datas.booster}}</p>
                  <span class="type">方向机助力系统</span>
                </div>
                <div class="modelBox fl mt">
                  <p class="name">{{datas.start}}</p>
                  <span class="type">点火启动系统</span>
                </div>

                <div class="modelBox fl mt">
                  <p class="name">{{datas.cooling}}</p>
                  <span class="type">冷却空调管路系统</span>
                </div>
                <div class="modelBox fl mt">
                  <p class="name">{{datas.jack}}</p>
                  <span class="type">千斤顶</span>
                </div>
                <div class="modelBox fl mt">
                  <p class="name">{{datas.spare}}</p>
                  <span class="type">备胎</span>
                </div>
                <div class="modelBox fl mt">
                  <p class="name">{{datas.attrition}}</p>
                  <span class="type">备胎磨损情况</span>
                </div>
              </div>
            </mt-swipe-item>
            <mt-swipe-item>
              <div class="content">
                <div class="modelBox fl">
                  <p class="name">{{datas.tools}}</p>
                  <span class="type">工具</span>
                </div>
                <div class="modelBox fl">
                  <p class="name">{{datas.extinguisher}}</p>
                  <span class="type">灭火器</span>
                </div>
                <div class="modelBox fl">
                  <p class="name">{{datas.placard}}</p>
                  <span class="type">警示牌</span>
                </div>
                <div class="modelBox fl">
                  <p class="name">{{datas.stall}}</p>
                  <span class="type">变速箱是否有顿挫</span>
                </div>

                <div class="modelBox fl mt">
                  <p class="name">{{datas.speed}}</p>
                  <span class="type">发动机运转状况</span>
                </div>
                <div class="modelBox fl mt">
                  <p class="name">{{datas.burning}}</p>
                  <span class="type">发动机是否烧油</span>
                </div>
                <div class="modelBox fl mt">
                  <p class="name">{{datas.damping}}</p>
                  <span class="type">减震器是否漏油</span>
                </div>
                <div class="modelBox fl mt">
                  <p class="name">{{datas.clutch}}</p>
                  <span class="type">离合器</span>
                </div>

                <div class="modelBox fl mt">
                  <p class="name">{{datas.muffler}}</p>
                  <span class="type">消声器</span>
                </div>
                <div class="modelBox fl mt">
                  <p class="name">{{datas.suspension}}</p>
                  <span class="type">四避震系统</span>
                </div>
              </div>
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </div>
    <div v-if='!this.$route.query.carMoney'>
      <footer v-if='!this.isbidY' class="dt_footer oh">
        <div class="fl text">
          <p class="people">已有<span>{{this.datas.pcount}}</span>人参与竞价</p>
          <p class="money">起拍价：<span>{{datas.askingPrice}}万</span></p>
        </div>
        <div class="fr oh btn">
          <!-- <p class="fl tixing">提醒</p> -->
          <p class="fr yubao" @click='openBottomSheet'>预报价</p>
          <mu-bottom-sheet :open="bottomSheet" sheetClass='sheetPrice'>
            <img @click='closeBottomSheet' src="../../img/icon_all_close@3x.png" alt="">
            <p>起拍价：<span>{{datas.askingPrice}}</span>万</p>
            <div class="input" id='input'>
              <input class="fl" :placeholder="this.calc.add(datas.askingPrice,0.02)+'万起'" type="number" name="" v-model='newPrice' @input='priceInput'>
              <span class="fr">万</span>
            </div>
            <span v-if='priceBtn' class="btn" @click='priceConfirm'>确定</span>
            <span v-else class="btn btnN">确定</span>
          </mu-bottom-sheet>
          <mu-bottom-sheet :open="confirmSheet" sheetClass='confirmPrice'>
            <img @click='closeConfirmSheet' src="../../img/icon_all_close@3x.png" alt="">
            <div class="title">
              <img class="fl" src="../../img/icon_window_tab_blue@3x.png" alt="">
              <p class="fl">确认竞价</p>
            </div>
            <p class="explain">车价{{this.newPrice}}万+服务费{{this.serviceCharge}}+过户费800</p>
            <p class="price"><span>{{this.calc.mul(this.newPrice,10000) + this.serviceCharge + 800}}</span>元</p>
            <p class="btn" @click='determinePrice'>确定</p>
          </mu-bottom-sheet>
        </div>
      </footer>
      <footer v-else class="footerEnd">
        <div class="fl text">
          <p class="people">已有<span>{{this.datas.pcount}}</span>人参与竞价</p>
          <p class="money">
            <span>{{this.confirmPrice + this.confirmSC + 800}}</span>
            元(合手价)
            <span class="infor por">
              <span @click='infor_click(suitablePrice,$event)'>!</span>
              <div class="oh infor_pre">
                <div class="infor_poa">
                  <p>车价：{{this.confirmPrice}}元</p>
                  <p>服务费：{{this.confirmSC}}元</p>
                  <p>过户费：800元</p>
                  <img src="../../img/Group-29_03.png" alt="">
                </div>
              </div>
            </span>
          </p>
        </div>
        <div class="fr oh btn">
          <!-- <p class="fl tixing">已设置</p> -->
          <p class="fr">已出价</p>
        </div>
      </footer>
    </div>

    <div class="notOpen_s" v-show='notOpen'>
      <p>该车辆还未开拍</p>
    </div>
    <div class="insufficient_s oh" v-show='insufficient'>
      <p class="fl text">保证金不足2000无法参与出价</p>
      <router-link to="/recharge"><p class="fr btn">立即充值</p></router-link>
    </div>
    <div class="insufficient_s oh" v-show='seckill_noM'>
      <p class="fl text">保证金不足2000无法参与出价</p>
      <p v-if='!this.startB' class="time fl">{{this.countdown | timer}}</p>
      <router-link to="/recharge"><p class="fr btn">立即充值</p></router-link>
    </div>
    <div class="seckill_s oh" v-show='seckill_y'>
      <p class="money">合手价：<span>{{calc.add(calc.add(this.seckill_data.carMoney,calc.div(this.seckill_data.serverMoney,10000)),0.08)}}</span>万</p>
      <p class="moneyDetail">车价：{{this.seckill_data.carMoney}}万 | 服务费：{{this.seckill_data.serverMoney}}元 | 过户费：800元</p>
      <p v-if='this.startB' class="btn_y btn" @click='robBtn'>立即秒杀</p>
      <p v-else class="btn_n btn">即将开抢<span>{{this.countdown | timer}}</span></p>
    </div>

    <!-- 信息确认框 -->
    <mu-dialog :open="diaFail" title='秒杀失败' dialogClass="dialogClass" titleClass="titleClass" bodyClass="bodyClass" actionsContainerClass="actionsContainerClass">
      <p>该车已不存在或已被其他用户购买</p>
      <span slot="actions" @click="close" primary class="actions_btn">返回</span>
    </mu-dialog>
    <mu-dialog :open="diaNull" title='该车辆已不存在' dialogClass="dialogClass" titleClass="titleClass" bodyClass="bodyClass" actionsContainerClass="actionsContainerClass">
      <span slot="actions" @click="close" primary class="actions_btn">返回</span>
    </mu-dialog>
    <!-- 拍卖成功提示 -->
    <mu-dialog :open="success" dialogClass="ss_Class" bodyClass="ss_bodyClass" actionsContainerClass="ss_ac_Class">
      <img class="img" src="../../img/img_feedback_success.png" alt="">
      <div class="content_body">
        <p class="head por">{{calc.add(calc.add(this.seckill_data.carMoney,calc.div(this.seckill_data.serverMoney,10000)),0.08)}}万</p>
        <p class="content por">{{datas.carName}} {{datas.cars}} {{datas.carModel}}</p>
        <p class="content por">
          您以<span class="red">{{calc.add(calc.add(this.seckill_data.carMoney,calc.div(this.seckill_data.serverMoney,10000)),0.08)}}万</span>的价格秒杀成功
        </p>
      </div>
      <p class="remark">备注：秒杀成功需在4个工作小时内完成付款，否则系统将扣除保证金哦！</p>
      <span slot="actions" @click="ss_close" primary class="ss_btn">返回</span>
    </mu-dialog>
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
  import {mapState, mapMutations} from 'vuex';
  import { Lazyload,Indicator } from 'mint-ui';
  import Vue from 'vue';

  Vue.use(Lazyload);

  export default {
    name: 'details',
    data () {
      return {
        popState: false,
        popName: "",
        show: false,
        shows: false,
        imgList: [],  //特写图片
        otherList: [],  //其他图片
        datas: {},  //数据
        conditionIdJ: ["优","良","中","差"], //综合评级简评
        maintenanceJ: ["A","B","C","D"], //维护成本简评
        conditionIdX: ["骨架完好，车身覆盖件无板金修复（不含前后保险杠），外观漆面整洁完好。",
          "骨架完好，车身可拆卸覆盖件有不超过3个面曾板金修复或更换，外观不超过4个面有明显损伤。",
          "3",
          "龙门架有变形修复痕迹或未修复；",
          "前后翼子板内衬受损有修复痕迹；",
          "备胎槽有损伤修复 或者车身覆盖面有超4个面以上曾扳金修复(不含前后保险杠)；",
          "做全车漆；",
          "8",
          "ABC柱板金或切割修复；",
          "前后纵梁有变形修复；",
          "安全气囊曾弹出；",
          "后翼子板切割；",
          "后围板切割；"
        ], //综合评级详评
        conditionGrade: "", //综合车况评级
        maintenanceX: ["车龄0-4年，平均1年内2万公里内且累计不超过5万公里，发动机无明显漏油，内饰干净整洁",
          "车龄4-8年，平均一年2万公里内且累计不超过10万",
          "车龄8-10年，公里数累计不超过18万公里",
          "10年以上"],  //维护成本详评
        dataSize: ((window.innerWidth/375)*375)+'x'+((window.innerWidth/375)*210), //data-size
        suitablePrice: false,
        bottomSheet: false, //填写预报价
        confirmSheet: false,  //确认预报价
        newPrice: "", //填写的报价
        priceBtn: false, //预报价填写确认验证按钮
        serviceCharge: "", //确认预报价服务费
        isbidY: "", //是否已有竞价
        confirmSC: "",   //已有竞价服务费
        confirmPrice: "",   //已有竞价车价
        dtScroll: true,  //是否记录滚动条位置
        notOpen: false,   //车辆是否开拍显示
        insufficient: false,  //账户金额是否足够参与竞拍
        seckill_noM: false,  //帐户金额是否足够参与秒杀
        seckill_y: false,   //秒杀
        success: false,   //秒杀成功弹层
        diaFail: false,  //秒杀失败确认弹层
        diaNull: false, //车辆已不存在
        seckill_data: "",   //秒杀数据
        countdown: "",   //倒计时
        startB: false,    //是否开始秒杀
        swiperOption: {
           effect:"slide",
           pagination : {
             el: '.swiper-pagination',
             type: 'fraction',
           }
        }
      }
    },
    filters: {
      timer: function (value) {
        if (!value) return ''
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
		},
    computed: {
      ...mapState({
				detailScroll: state => state.detailScroll,
        atState: state => state.atState,
			}),
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods:{
      ...mapMutations([
        'setdetailScroll'
      ]),
      //秒杀失败弹层
      close () {
        this.diaFail = false;
        this.diaNull = false;
        this.$router.push({ path: '/home'})
      },
      //秒杀成功弹层
      ss_open () {
        this.success = true;
      },
      ss_close () {
        this.success = false;
        this.$router.push({ path: '/home'})
      },
      reTurn () {
        this.dtScroll = false;
        this.$router.push({ path: '/home'})
      },
      //调用提示弹层
      popUp (text) {
        this.popState = true;
        this.popName = text;
      },
      //手续证件
      toCf () {
        this.dtScroll = true;
        this.$router.push({ path: '/auction/certificates', query: this.$route.query})
      },
      //显性损伤
      to_di () {
        this.dtScroll = true;
        this.$router.push({ path: '/auction/dominantInjury', query: this.$route.query})
      },
      //隐性损伤
      to_ri () {
        this.dtScroll = true;
        this.$router.push({ path: '/auction/recessiveInjury', query: this.$route.query})
      },
      //显示/隐藏头部
      menu() {
        let sTop = document.body.scrollTop+document.documentElement.scrollTop;
        if(sTop > 45){
          $(".dt_header").css("display","block")
        }else{
          $(".dt_header").css("display","none")
        }
      },
      //合手价查看
      infor_click (price,event) {
        !price ? $(".infor_pre").css("height","0.59rem") : $(".infor_pre").css("height","0rem");
        this.suitablePrice = !price;
        event.stopPropagation();
      },
      //合手价查看关闭
      closeInfor () {
        $(".infor_pre").css("height","0rem");
        this.suitablePrice = false;
      },
      //填写预报价close
      closeBottomSheet () {
        this.bottomSheet = false
        this.newPrice = "";
        $("body").off("touchmove");
      },
      //填写预报价open
      openBottomSheet () {
        this.bottomSheet = true
        $("body").on("touchmove",function(event){ event.preventDefault; }, false)
      },
      //确认预报价close
      closeConfirmSheet () {
        this.confirmSheet = false;
        this.newPrice = "";
        $("body").off("touchmove");
      },
      //确认预报价open
      openConfirmSheet() {
        this.confirmSheet = true;
        $("body").off("touchmove");
      },
      //预报价表单验证
      priceInput () {
        if(this.newPrice-0 >= this.datas.askingPrice+0.02){
          $("#input").css("border-color","#CBCBCB");
          this.priceBtn = true;
        }else{
          $("#input").css("border-color","#f00");
          this.priceBtn = false;
        }
      },
      //预报价填写确认
      priceConfirm () {
        $("body").on("touchmove",function(event){ event.preventDefault; }, false)
        this.bottomSheet = false;
        setTimeout(() => {
          this.confirmSheet = true;
          $("#input").css("border-color","#f00");
          this.priceBtn = false;
        },300)
        if(this.newPrice-0 < 10){
          this.serviceCharge = 2000;
        }else{
          this.serviceCharge = this.calc.mul(this.newPrice-0,200);
        }
      },
      //预报价最终确认
      determinePrice () {
        $("body").off("touchmove");
        if(this.atState.atLimits == 1){
          Indicator.open();
          this.$http.post(this.rootUrl + 'AuctionSession/addBidding',{
              auctionId: this.$route.query.auctionId,
              auserId: localStorage.getItem("userId"),
              money: this.calc.mul(this.newPrice,10000),
              carId: this.$route.query.carId,
              totalPrire: this.calc.mul(this.newPrice,10000) + this.serviceCharge + 800
            },{emulateJSON:true}).then((data) => {
              Indicator.close();
              if(data.body.status == 1000){
                this.popUp("添加成功");
                this.datas.pcount = this.datas.pcount+1;
                this.confirmPrice = this.calc.mul(this.newPrice,10000);
                this.confirmPrice < 100000 ? this.confirmSC = 2000 : this.confirmSC = this.calc.div(this.confirmPrice,50);
                this.isbidY = true;
                this.confirmSheet = false;
                this.newPrice = "";
              }else{
                this.popUp("添加失败");
                this.confirmSheet = false;
                this.newPrice = "";
              }
          }, (data) => {
            Indicator.close();
            this.popUp("服务器响应失败");
            this.confirmSheet = false;
            this.newPrice = "";
          });
        }else{
          this.popUp("您的可用余额不足，请先充值");
          this.confirmSheet = false;
          this.newPrice = "";
        }
      },
      //秒杀
      robBtn() {
        Indicator.open();
        this.$http.post(this.rootUrl + 'Seconds/doCarSeconds',{
            carId: this.$route.query.carId,
            userId: localStorage.getItem("userId")
          },{emulateJSON:true}).then((data) => {
            Indicator.close();
            if(data.body.status == 1000){
              clearInterval(this.timeS)
              data.body.data == 1 ? this.ss_open() : this.diaFail = true;
            }else{
              this.popUp(data.body.message);
            }
        }, (data) => {
          Indicator.close();
          this.popUp("服务器响应失败");
        });
      },
      //获取详情信息
      getData () {
        Indicator.open();
        setTimeout(() => {
          this.$http.post(this.rootUrl + 'AuctionSession/queryTCarinfo',{
              asid: this.$route.query.auctionId,
              carId: this.$route.query.carId,
              userId: localStorage.getItem("userId")
            },{emulateJSON:true}).then((data) => {
              Indicator.close();
              if(data.body.status == 1000){
                this.datas = data.body.data.carInfo;
                //综合详情评级
                let cond = this.datas.conditionId + "";
                if(cond.indexOf("3") == 0 || cond.indexOf("8") == 0){
                  let arrAy = cond.split(",");
                  arrAy.splice(0,1);
                  arrAy.map((value,index) => {
                    this.conditionGrade += this.conditionIdX[value - 1];
                  })
                }else{
                  this.conditionGrade = this.conditionIdX[cond - 1];
                }
                this.confirmPrice = this.datas.carMoney-0;
                this.confirmPrice < 100000 ? this.confirmSC = 2000 : this.confirmSC = this.calc.div(this.confirmPrice,50);
                this.datas.reTime = this.datas.reTime.substr(0,4);
                this.datas.askingPrice = this.calc.div(this.datas.askingPrice,10000);
                this.datas.isbid == 0 ? this.isbidY = false : this.isbidY = true;
                data.body.data.carInfo.imgList.map((val,index) => {
                  if(val.imgType == 1){
                    let thisJson = {
                      name: "",
                      url: ""
                    };
                    thisJson.url = val.url;
                    data.body.data.dicts.map((value) => {
                      if(value.dictValue == val.ddDictId && val.imgType == value.code){
                        thisJson.name = value.dictName;
                      }
                    })
                    this.imgList.push(thisJson);
                  }else if(val.imgType == 7){
                    // this.otherList
                    let thisJson = {
                      name: "",
                      url: ""
                    };
                    thisJson.url = val.url;
                    data.body.data.dicts.map((value) => {
                      if(value.dictValue == val.ddDictId && val.imgType == value.code){
                        thisJson.name = value.dictName;
                      }
                    })
                    this.otherList.push(thisJson);
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
      },
      //秒杀车辆详情获取
      getData_seckill() {
        Indicator.open();
        setTimeout(() => {
          this.$http.post(this.rootUrl + 'Seconds/doFindCarInfo',{
              carId: this.$route.query.carId
            },{emulateJSON:true}).then((data) => {
              Indicator.close();
              if(data.body.status == 1000){
                this.datas = data.body.data.carInfo;
                //综合详情评级
                let cond = this.datas.conditionId + "";
                if(cond.indexOf("3") == 0 || cond.indexOf("8") == 0){
                  let arrAy = cond.split(",");
                  arrAy.splice(0,1);
                  arrAy.map((value,index) => {
                    this.conditionGrade += this.conditionIdX[value - 1];
                  })
                }else{
                  this.conditionGrade = this.conditionIdX[cond - 1];
                }
                this.seckill_data = data.body.data.seconds;
                this.countdown = data.body.data.countdown;
                this.datas.carState == 2 ? this.startB = true : this.startB = false;
                this.timeS = setInterval(() => {
                  if(this.countdown > 0){
                    this.countdown--;
                  }else{
                    this.startB = true;
                    clearInterval(this.timeS)
                  }
                },1000)
                this.confirmPrice = this.datas.carMoney-0;
                this.confirmPrice < 100000 ? this.confirmSC = 2000 : this.confirmSC = this.calc.div(this.confirmPrice,50);
                this.datas.reTime = this.datas.reTime.substr(0,4);
                this.seckill_data.carMoney = this.calc.div(this.seckill_data.carMoney,10000);
                this.datas.isbid == 0 ? this.isbidY = false : this.isbidY = true;
                data.body.data.carInfo.imgList.map((val,index) => {
                  if(val.imgType == 1){
                    let thisJson = {
                      name: "",
                      url: ""
                    };
                    thisJson.url = val.url;
                    data.body.data.dicts.map((value) => {
                      if(value.dictValue == val.ddDictId && val.imgType == value.code){
                        thisJson.name = value.dictName;
                      }
                    })
                    this.imgList.push(thisJson);
                  }else if(val.imgType == 7){
                    let thisJson = {
                      name: "",
                      url: ""
                    };
                    thisJson.url = val.url;
                    data.body.data.dicts.map((value) => {
                      if(value.dictValue == val.ddDictId && val.imgType == value.code){
                        thisJson.name = value.dictName;
                      }
                    })
                    this.otherList.push(thisJson);
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
      },
      //订单车辆详情获取
      getData_order() {
        Indicator.open();
        setTimeout(() => {
          this.$http.post(this.rootUrl + 'AuctionSession/getCarInfoID',{
              carId: this.$route.query.carId,
            },{emulateJSON:true}).then((data) => {
              Indicator.close();
              if(data.body.status == 1000){
                this.datas = data.body.data.carInfo;
                //综合详情评级
                let cond = this.datas.conditionId + "";
                if(cond.indexOf("3") == 0 || cond.indexOf("8") == 0){
                  let arrAy = cond.split(",");
                  arrAy.splice(0,1);
                  arrAy.map((value,index) => {
                    this.conditionGrade += this.conditionIdX[value - 1];
                  })
                }else{
                  this.conditionGrade = this.conditionIdX[cond - 1];
                }
                this.confirmPrice = this.datas.carMoney-0;
                this.confirmPrice < 100000 ? this.confirmSC = 2000 : this.confirmSC = this.calc.div(this.confirmPrice,50);
                this.datas.reTime = this.datas.reTime.substr(0,4);
                this.datas.askingPrice = this.calc.div(this.datas.askingPrice,10000);
                this.datas.isbid == 0 ? this.isbidY = false : this.isbidY = true;
                data.body.data.carInfo.imgList.map((val,index) => {
                  if(val.imgType == 1){
                    let thisJson = {
                      name: "",
                      url: ""
                    };
                    thisJson.url = val.url;
                    data.body.data.dicts.map((value) => {
                      if(value.dictValue == val.ddDictId && val.imgType == value.code){
                        thisJson.name = value.dictName;
                      }
                    })
                    this.imgList.push(thisJson);
                  }else if(val.imgType == 7){
                    // this.otherList
                    let thisJson = {
                      name: "",
                      url: ""
                    };
                    thisJson.url = val.url;
                    data.body.data.dicts.map((value) => {
                      if(value.dictValue == val.ddDictId && val.imgType == value.code){
                        thisJson.name = value.dictName;
                      }
                    })
                    this.otherList.push(thisJson);
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
      },
      //获取当前滚动条位置
      getScrollTop () {
        var scrollTop=0;
        if(document.documentElement&&document.documentElement.scrollTop){
            scrollTop=document.documentElement.scrollTop;
        }else if(document.body){
            scrollTop=document.body.scrollTop;
        }
        return scrollTop;
      }
    },
    mounted () {
      $("body").css("background-color","#FAFAFA");
      window.addEventListener('scroll', this.menu);

      if(this.$route.query.carMoney){
        $(".dt_content").css("margin-bottom","0rem");
        this.getData_order();
      }else{
        this.notOpen = false;
        this.insufficient = false;
        this.seckill_noM = false;
        this.seckill_y = false;
        if(this.atState.atState == 2){
          if(this.$route.query.status == 2){  //车辆拍卖中
            if(this.atState.atLimits == 1){
              $(".detail").css("margin-bottom","2.06rem")
            }else{
              this.insufficient = true;
            }
          }else{    //车辆未开拍
            this.notOpen = true;
          }
        }else if(this.atState.atState == 3){
          if(this.atState.atLimits == 1){
            this.seckill_y = true;
            $(".detail").css("margin-bottom","1.3rem")
          }else{
            this.seckill_noM = true;
          }
        }
        if(this.atState.atState == 3){
          this.getData_seckill();
        }else{
          this.getData();
        }
      }

      if(this.detailScroll.state == true){
        $(window).scrollTop(this.detailScroll.scroll);
      }
      yulan();
    },
    beforeDestroy () {
      clearInterval(this.timeS)
      let scroll = {
        scroll: this.getScrollTop(),
        state: this.dtScroll
      }
      this.setdetailScroll(scroll)
    }
  }
</script>

<style lang="scss">
  body{
    background: #FAFAFA;
  }
  .dt_header{
    width: 3.75rem;
    // height: 0.45rem;
    background: #F1F1F1;
    position: fixed;
    top: 0;
    z-index: 1000;
    display: none;
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
  .dt_content{
    width: 3.75rem;
    border-bottom: 0.2rem solid #FAFAFA;
    background-color: #fff;
    margin-bottom: 0.6rem;
    .dt_content_head{
      width: 3.75rem;
      height: 2.1rem;
      .dt_swipe{
        width: 3.75rem;
        height: 2.1rem;
        img{
          width: 3.75rem;
          height: 2.1rem;
          // background-color: #999;
          background: url("../../img/loading.gif") no-repeat center 50%;
          background-repeat: no-repeat;
        }
        figure{
          width: 3.75rem;
          height: 2.1rem;
          margin: 0;
          position: absolute;
          top: 0;
          z-index: 1;
        }
      }
      .swipeReturn{
        width: 0.37rem;
        height: 0.45rem;
        padding: 0.12rem;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 33;
      }
      .swipeNum{
        width: 0.34rem;
        height: 0.22rem;
        line-height: 0.22rem;
        text-align: center;
        font-size: 0.14rem;
        color: #FFFFFF;
        position: absolute;
        bottom: 0.03rem;
        left: 50%;
        margin-left: -0.17rem;
        z-index: 33;
      }
    }
    .dt_basicInformation{
      width: 3.75rem;
      padding: 0.1rem 0.12rem 0.08rem 0.12rem;
      border-bottom: 1px solid #F1F2F2;
      .dt_bf_title{
        font-size: 0.18rem;
        color: #191919;
        line-height: 0.25rem;
        font-weight: 600;
      }
      .dt_bf_carCondition{
        margin-top: 0.04rem;
        font-size: 0.13rem;
        color: #808080;
        line-height: 0.18rem;
      }
      .dt_bf_serviceCharge{
        margin-top: 0.04rem;
        font-size: 0.12rem;
        color: #B2B2B2;
        line-height: 0.17rem;
      }
      .dt_bf_price{
        width: 3.75rem;
        height: 0.3rem;
        margin-left: -0.12rem;
        background-color: #F7FAFD;
        padding-left: 0.12rem;
        line-height: 0.3rem;
        margin-top: 0.04rem;
        .price{
          font-size: 0.16rem;
          color: #FF7400;
        }
        .text{
          font-size: 0.12rem;
          color: #808080;
          margin-left: 0.02rem;
        }
        .onePrice{
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
          margin-top: 0.065rem;
        }
        img{
          width: 0.13rem;
          height: 0.15rem;
          margin-top: 0.075rem;
          margin-left: 0.07rem;
        }
      }
      .dt_auctionIng{
        width: 0.74rem;
        height: 0.59rem;
        position: absolute;
        bottom: 0.21rem;
        right: 0.14rem;
      }
    }
    .dt_testingInformation{
      width: 3.75rem;
      border-top: 0.09rem solid #FAFAFA;
      border-bottom: 1px solid #F3F4F5;
      .dt_ti_title_content{
        width: 3.75rem;
        padding: 0.11rem 0.14rem;
        border-bottom: 1px solid #F3F4F5;
        .dt_ti_title_quality{
          width: 0.59rem;
          height: 0.74rem;
          // background-image: url("../../img/cardetails_grade.png");
          // background-size: 100%;
          // background-repeat: no-repeat;
          span{
            width: 0.3rem;
            height: 0.2rem;
            line-height: 0.2rem;
            display: inline-block;
            font-size: 0.14rem;
            color: #333333;
            margin-top: 0.37rem;
            margin-left: 0.16rem;
            font-weight: 600;
            text-align: center;
            position: relative;
            z-index: 2;
          }
          img{
            position: absolute;
            top: 0;
            left: 0;
            width: 0.59rem;
            height: 0.74rem;
            z-index: 1;
          }
        }
        .dt_ti_title_presentation{
          width: 2.72rem;
          div{
            p{
              width: 0.7rem;
              font-size: 0.13rem;
              color: #666666;
              line-height: 0.22rem;
            }
            span{
              width: 2rem;
              display: block;
              font-size: 0.13rem;
              color: #666666;
              line-height: 0.22rem;
            }
          }
        }
      }
      .dt_ti_describe{
        width: 3.75rem;
        padding: 0.11rem 0.14rem;
        .title{
          font-size: 0.16rem;
          color: #333333;
          line-height: 0.22rem;
        }
        .content{
          font-size: 0.14rem;
          color: #666666;
          line-height: 0.2rem;
          margin-top: 0.05rem;
        }
      }
    }
    .dt_vehicleInformation{
      border-top: 0.09rem solid #FAFAFA;
      border-bottom: 1px solid #F3F4F5;
      .content{
        width: 3.75rem;
        height: 2.75rem;
        padding: 0.17rem 0.13rem;
        .modelBox{
          width: 0.87rem;
          height: 0.45rem;
          text-align: center;
          >div{
            height: 0.2rem;
          }
          .name{
            width: 0.87rem;
            height: 0.2rem;
            font-size: 0.14rem;
            color: #333333;
            line-height: 0.2rem;
          }
          .nor{
            width: 0.7rem;
            height: 0.2rem;
            font-size: 0.14rem;
            color: #333333;
            line-height: 0.2rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
          }
          .type{
            margin-top: 0.05rem;
            font-size: 0.12rem;
            color: #999999;
            line-height: 0.2rem;
            display: block;
            clear: both;
          }
        }
        .mt{
          margin-top: 0.2rem;
        }
      }
    }
    .dt_usage{
      border-top: 0.09rem solid #FAFAFA;
      border-bottom: 1px solid #F3F4F5;
      .us_list{
        width: 3.75rem;
        .us_listLi{
          width: 3.52rem;
          height: 0.4rem;
          margin-left: 0.23rem;
          border-bottom: 1px solid #F3F4F5;
          .name{
            font-size: 0.14rem;
            color: #999999;
            line-height: 0.4rem;
          }
          .text{
            font-size: 0.14rem;
            color: #333333;
            line-height: 0.4rem;
            margin-right: 0.14rem;
          }
        }
        .borBN{
          border-bottom: none;
        }
      }
    }
    .dt_certificates{
      border-top: 0.09rem solid #FAFAFA;
      border-bottom: 1px solid #F3F4F5;
    }
    .dt_damage{
      border-top: 0.09rem solid #FAFAFA;
      border-bottom: 1px solid #F3F4F5;
      .list{
        width: 3.75rem;
      }
      .listBar{
        width: 3.75rem;
        height: 0.4rem;
        padding: 0 0.14rem 0 0.23rem;
        border-bottom: 1px solid #F3F4F5;
        .name{
          line-height: 0.4rem;
          font-size: 0.15rem;
          color: #999999;
        }
        .text{
          line-height: 0.4rem;
          font-size: 0.15rem;
          color: #FF7400;
          margin-right: 0.05rem;
        }
        .marT{
          margin-top: 0.12rem;
        }
      }
      .borBN{
        border-bottom: none;
      }
    }
    .dt_electrical{
      border-top: 0.09rem solid #FAFAFA;
      border-bottom: 1px solid #F3F4F5;
      .dt__ele_swipe{
        width: 3.75rem;
        height: 3rem;
        .type{
          width: 0.7rem;
          margin-left: 0.08rem;
        }
        .mint-swipe-indicator{
          width: 0.12rem;
          height: 0.06rem;
          border-radius: 1rem;
          background-color: #E8EAEB;
          opacity: 1;
        }
        .mint-swipe-indicator.is-active{
          background-color: #4A90E2;
        }
      }
    }
  }
  .dt_list_head{
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
  .jump{
    width: 0.12rem;
    height: 0.2rem;
  }
  .dt_hintInformation{
    width: 0.14rem;
    height: 0.14rem;
    display: inline-block;
    background-color: #4A90E2;
    border-radius: 50%;
    text-align: center;
    line-height: 0.14rem;
    color: #fff;
    font-size: 0.11rem;
  }
  .tooltipImg{
    width: 0.14rem;
    height: 0.14rem;
  }
  .demo-icon-tip{
    display: inline-block;
    cursor: default;
    position: relative;
  }
  .toolTip{
    width: 3rem;
    left: -0.6rem!important;
    .mu-tooltip-label{
      white-space: normal;
    }
  }
  .dt_footer{
    width: 3.75rem;
    height: 0.6rem;
    border-top: 1px solid #D6D6D6;
    padding: 0.1rem 0.14rem;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    .text{
      padding-left: 0.1rem;
      .people{
        font-size: 0.12rem;
        color: #999999;
        line-height: 0.15rem;
        span{
          color: #FF7400;
        }
      }
      .money{
        font-size: 0.14rem;
        color: #999999;
        line-height: 0.25rem;
        span{
          font-size: 0.2rem;
          color: #FF7400;
        }
      }
    }
    .btn{
      height: 0.4rem;
      p{
        width: 0.8rem;
        height: 0.4rem;
        line-height: 0.4rem;
        border-radius: 0.02rem;
        font-size: 0.14rem;
        color: #FFFFFF;
        text-align: center;
      }
      .tixing{
        background-color: #FF7400;
        margin-right: 0.04rem;
      }
      .yubao{
        background-color: #50C572;
      }
    }
  }
  .footerEnd{
    width: 3.75rem;
    height: 0.6rem;
    border-top: 1px solid #D6D6D6;
    padding: 0.1rem 0.14rem;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    .text{
      padding-left: 0.1rem;
      .people{
        font-size: 0.12rem;
        color: #999999;
        line-height: 0.15rem;
        span{
          color: #FF7400;
        }
      }
      .money{
        font-size: 0.12rem;
        color: #999999;
        line-height: 0.25rem;
        >span{
          font-size: 0.2rem;
          color: #FF7400;
        }
        .infor{
          font-size: 0.12rem;
          color: #fff;
          width: 0.13rem;
          height: 0.13rem;
          display: inline-block;
          border-radius: 50%;
          background-color: #666;
          text-align: center;
          line-height: 0.13rem;
          margin-left: 0.04rem;
          .infor_pre{
            position: absolute;
            top: -0.6rem;
            left: -0.54rem;
            width: 1.25rem;
            height: 0rem;
            transition: height .3s;
          }
          .infor_poa{
            position: absolute;
            top: 0rem;
            left: 0rem;
            width: 1.14rem;
            height: 0.53rem;
            background-color: #333333;
            border-radius: 0.02rem;
            padding: 0.05rem 0.1rem;
            img{
              width: 0.1rem;
              height: 0.06rem;
              position: absolute;
              top: 0.52rem;
              left: 0.55rem;
            }
            p{
              font-size: 0.1rem;
              color: #FFFFFF;
              text-align: left;
              line-height: 0.14rem;
            }
          }
        }
      }
    }
    .btn{
      height: 0.4rem;
      p{
        width: 0.8rem;
        height: 0.4rem;
        line-height: 0.4rem;
        border-radius: 0.02rem;
        font-size: 0.14rem;
        color: #FFFFFF;
        text-align: center;
        background-color: #B2B2B2;
      }
      .tixing{
        margin-right: 0.04rem;
      }
    }
  }
  .sheetPrice{
    width: 3.75rem;
    height: 2.2rem;
    padding: 0.1rem 0.12rem;
    >img{
      width: 0.15rem;
      height: 0.15rem;
      position: absolute;
      top: 0.1rem;
      right: 0.12rem;
    }
    >p{
      width: 3.51rem;
      height: 0.25rem;
      text-align: center;
      font-size: 0.18rem;
      color: #333333;
      line-height: 0.25rem;
      margin-top: 0.3rem;
      span{
        color: #FF7400;
      }
    }
    .input{
      width: 3.51rem;
      height: 0.4rem;
      border-radius: 0.02rem;
      padding: 0.08rem;
      border: 1px solid #CBCBCB;
      margin-top: 0.25rem;
      font-size: 0.14rem;
      input{
        width: 3.1rem;
        height: 0.24rem;
        outline: none;
        border: none;
      }
    }
    .btn{
      display: block;
      width: 3.51rem;
      height: 0.4rem;
      margin-top: 0.15rem;
      text-align: center;
      line-height: 0.4rem;
      font-size: 0.16rem;
      color: #FFFFFF;
      background-color: #6D9EE1;
      border-radius: 0.02rem;
    }
    .btnN{
      background-color: #CBCBCB;
    }
  }
  .confirmPrice{
    width: 3.75rem;
    height: 1.8rem;
    padding: 0.1rem 0.12rem;
    >img{
      width: 0.15rem;
      height: 0.15rem;
      position: absolute;
      top: 0.1rem;
      right: 0.12rem;
    }
    .title{
      width: 1rem;
      height: 0.25rem;
      margin: auto;
      margin-top: 0.08rem;
      img{
        width: 0.16rem;
        height: 0.17rem;
        margin-right: 0.04rem;
        margin-top: 0.04rem;
      }
      p{
        font-size: 0.18rem;
        color: #333333;
        line-height: 0.25rem;
      }
    }
    .explain{
      width: 3.51rem;
      font-size: 0.13rem;
      color: #666666;
      line-height: 0.18rem;
      text-align: center;
      margin-top: 0.1rem;
    }
    .price{
      width: 3.51rem;
      font-size: 0.18rem;
      color: #FF7400;
      line-height: 0.25rem;
      text-align: center;
      margin-top: 0.1rem;
    }
    .btn{
      width: 3.51rem;
      height: 0.4rem;
      text-align: center;
      line-height: 0.4rem;
      font-size: 0.16rem;
      color: #FFFFFF;
      background-color: #6D9EE1;
      margin-top: 0.15rem;
    }
  }
  .notOpen_s{
    width: 3.75rem;
    height: 0.6rem;
    border-top: 1px solid #D6D6D6;
    padding: 0.1rem 0.14rem;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    p{
      font-size: 0.14rem;
      color: #333333;
      text-align: center;
      line-height: 0.4rem;
    }
  }
  .insufficient_s{
    width: 3.75rem;
    height: 0.6rem;
    border-top: 1px solid #D6D6D6;
    padding: 0.1rem 0.14rem;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    p{
      font-size: 0.14rem;
    }
    .text{
      line-height: 0.4rem;
      color: #333333;
    }
    .time{
      line-height: 0.4rem;
      color: #50C572;
      margin-left: 0.12rem;
    }
    .btn{
      width: 0.9rem;
      height: 0.3rem;
      line-height: 0.3rem;
      text-align: center;
      color: #fff;
      background: #50C572;
      border-radius: 0.02rem;
      margin-top: 0.05rem;
    }
  }
  .seckill_s{
    width: 3.75rem;
    height: 1.3rem;
    border-top: 1px solid #D6D6D6;
    padding: 0.1rem 0.14rem;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    box-shadow: 0 -0.04rem 0.1rem 0 rgba(0,0,0,0.08);
    .money{
      width: 3.47rem;
      font-size: 0.12rem;
      line-height: 0.28rem;
      text-align: center;
      color: #333333;
      span{
        font-size: 0.2rem;
        color: #FF7400;
      }
    }
    .moneyDetail{
      width: 3.47rem;
      font-size: 0.12rem;
      color: #999999;
      margin-top: 0.1rem;
      line-height: 0.17rem;
      text-align: center;
    }
    .btn{
      width: 3.47rem;
      height: 0.4rem;
      border-radius: 0.02rem;
      text-align: center;
      line-height: 0.4rem;
      font-size: 0.16rem;
      color: #FFFFFF;
      margin-top: 0.1rem;
    }
    .btn_y{
      background: #50C572;
    }
    .btn_n{
      background: #B2B2B2;
    }
  }
  // image[lazy=loading] {
  //   width: 0.4rem;
  //   height: 3rem;
  //   margin: auto;
  // }
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
    position: relative;
  }
  /*内容样式*/
  .mu-dialog-body.ss_bodyClass{
    width: 2.5rem;
    min-height: 0.9rem;
    text-align: left;
    padding: 0;
    position: absolute;
    top: 1.22rem;
    left: 0.25rem;
    z-index: 2;
    overflow: inherit!important;
    .content_body{
      width: 2.5rem;
      padding: 0 0.1rem 0.1rem;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      background-color: #fff;
      border-radius: 0.1rem;
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
        line-height: 0.18rem;
        text-align: center;
        z-index: 3;
        .tel{
          color: #0E81FF;
        }
        .price{
          color: #F60000;
        }
        .red{
          color: #F60000;
        }
      }
    }
    .img{
      width: 3rem;
      height: 3.6rem;
      border-radius: 0.06rem;
      position: absolute;
      top: -1.22rem;
      left: -0.25rem;
      z-index: 1;
    }
    .remark{
      font-size: 0.11rem;
      color: #1D3D56;
      line-height: 0.16rem;
      text-align: left;
      position: absolute;
      top: 1.1rem;
      z-index: 3;
    }
  }
  /*按钮容器样式*/
  .ss_ac_Class{
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
  /*分页器样式*/
  .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
    bottom: 0.1rem;
    font-size: 0.12rem;
    color: #fff;
  }
</style>
