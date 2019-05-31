<!-- personalData -->
<!-- 个人中心 -->
<template>
  <div class="">
    <header class="oh pd_header" :class="{ 'pad_ios': isiOS, 'pad_android': isAndroid}">
      <router-link to="home"><img src="../../../img/icon_all_backBlack@3x.png" alt="" class="fl"></router-link>
      <p>个人中心</p>
    </header>
    <ul class="pd_content">
      <li class="header">
        <p class="text fl">头像</p>
        <img class="next fr" src="../../../img/jump.jpg" alt="">
        <img v-if='userInfomation.headImg == null' class="portrait fr" src="../../../img/headImg.jpg" alt="">
        <img v-else class="portrait fr" :src="userInfomation.headImg" alt="">
      </li>
      <li class="content">
        <p class="text fl">姓名</p>
        <img class="next fr" src="../../../img/jump.jpg" alt="">
        <p v-if='userInfomation.nickname == null' class="content fr">名字</p>
        <p v-else class="content fr">{{userInfomation.nickname}}</p>
      </li>
      <li class="content">
        <p class="text fl">性别</p>
        <img class="next fr" src="../../../img/jump.jpg" alt="">
        <p v-if='userInfomation.sex == null' class="content fr">性别</p>
        <p v-else class="content fr">{{userInfomation.sex}}</p>
      </li>
      <li class="last">
        <p class="text fl">身份证</p>
        <img class="next fr" src="../../../img/jump.jpg" alt="">
        <p v-if='userInfomation.card == null' class="content fr">身份证</p>
        <p v-else class="content fr">{{userInfomation.card}}</p>
      </li>
    </ul>
    <pop-up :state.sync='popState' :name="popName"></pop-up>
  </div>
</template>

<script>
  import popUp from "../../../components/common/popUp.vue";
  import { Indicator } from 'mint-ui';

  export default {
    name: 'certificates',
    data () {
      return {
        popState: false,
        popName: "",
        userInfomation: {} //用户信息
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
      // //修改
      // to_modify () {
      //   this.$router.push({ path: '/modify'})
      // }
    },
    mounted () {
      $("body").css("background-color","#FAFAFA");

      Indicator.open();
      setTimeout(() => {
        this.$http.post(this.rootUrl + 'auser/getUserInfo',{
            userId: localStorage.getItem("userId")
          },{emulateJSON:true}).then((data) => {
            Indicator.close();
            if(data.body.status == 1000){
              this.userInfomation = data.body.data;
              this.userInfomation.sex == 0 ? this.userInfomation.sex = "男" : this.userInfomation.sex = this.userInfomation.sex;
              this.userInfomation.sex == 1 ? this.userInfomation.sex = "女" : this.userInfomation.sex = this.userInfomation.sex;
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
    background: #FAFAFA;
  }
  .pd_header{
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
  .pd_content{
    padding-left: 0.1rem;
    border-bottom: 1px solid #F1F2F2;
    margin-top: 0.45rem;
    background-color: #fff;
    li{
      width: 3.65rem;
      height: 0.5rem;
      border-bottom: 1px solid #F3F4F5;
      padding: 0.14rem 0.14rem 0.14rem 0;
      .text{
        font-size: 0.16rem;
        color: #333333;
        line-height: 0.22rem;
      }
      .content{
        font-size: 0.16rem;
        color: #999999;
        line-height: 0.22rem;
      }
      .next{
        width: 0.12rem;
        height: 0.2rem;
        margin-left: 0.05rem;
        margin-top: 0.01rem;
      }
    }
    .header{
      height: 0.6rem;
      padding: 0.1rem 0.14rem 0.1rem 0;
      .portrait{
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
      }
      .text{
        line-height: 0.4rem;
      }
      .content{
        line-height: 0.4rem;
      }
      .next{
        margin-top: 0.1rem;
      }
    }
    .last{
      border-bottom: none;
    }
  }
</style>
