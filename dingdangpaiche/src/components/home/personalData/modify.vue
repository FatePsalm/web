<!-- modify -->
<!-- 修改资料 -->
<template>
  <div class="">
    <header class="oh md_header" :class="{ 'pad_ios': isiOS, 'pad_android': isAndroid}">
      <router-link to="personalData"><img class="fl" src="../../../img/icon_all_backBlack@3x.png" alt=""></router-link>
      <p class="fl text">修改资料</p>
      <p class="fr subtn" @click='subtn'>确定</p>
    </header>
    <div class="md_content">
      <input class="content" placeholder="请输入内容" type="text" name="" value="">
    </div>

    <pop-up :state.sync='popState' :name="popName"></pop-up>
  </div>
</template>

<script>
  import popUp from "../../../components/common/popUp.vue";

  export default {
    name: 'certificates',
    data () {
      return {
        popState: false,
        popName: "",
      }
    },
    components: {
      popUp,
		},
    methods:{
      //调用弹层
      popUp (text) {
        this.popState = true;
        this.popName = text;
      },
      subtn () {
        this.$router.push({ path: '/personalData'})
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
  .md_header{
    width: 3.75rem;
    height: 0.45rem;
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
    .subtn{
      width: 0.47rem;
      text-align: center;
      line-height: 0.45rem;
      font-size: 0.17rem;
      color: #030303;
      padding-right: 0.1rem;
    }
  }
  .md_content{
    margin-top: 0.45rem;
    padding: 0.14rem 0.4rem;
    background-color: #fff;
    .content{
      width: 2.95rem;
      height: 0.3rem;
      background-color: #fafafa;
      border: 1px solid #D6D6D6;
      outline: none;
      border-radius: 0.05rem;
      padding: 0 0.1rem;
    }
  }
</style>
