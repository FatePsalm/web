import App from '../App'

import login from "../components/login/login.vue"
import userAgreement from "../components/login/userAgreement.vue"
import register from "../components/login/register.vue"
import home from "../components/home/home.vue"
import personalData from "../components/home/personalData/personalData.vue"
import modify from "../components/home/personalData/modify.vue"
import myMoney from "../components/home/myMoney/myMoney.vue"
import recharge from "../components/home/myMoney/recharge.vue"
import rechargeClause from "../components/home/myMoney/rechargeClause.vue"
import details from "../components/details/details.vue"
import auction from "../components/details/auction.vue"
import dominantInjury from "../components/details/dominantInjury/dominantInjury.vue"
import imgDetail from "../components/details/dominantInjury/imgDetail.vue"
import recessiveInjury from "../components/details/recessiveInjury/recessiveInjury.vue"
import certificates from "../components/details/certificates.vue"
import order from "../components/order/order.vue"

export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue
    //地址为空时跳转home页面
    {
      path: '',
      redirect: 'home',
    },{   //登陆页
      path : '/login',
      component : login
    },{   //用户登陆协议
      path : '/userAgreement',
      component : userAgreement
    },{ //注册页
      path : '/register',
      component : register
    },{ //首页
      path : '/home',
      component : home
    },{ //个人中心
      path : '/personalData',
      component : personalData
    },{ //修改资料
      path : '/modify',
      component : modify
    },{ //我的资金
      path : '/myMoney',
      component : myMoney
    },{ //充值
      path : '/recharge',
      component : recharge
    },{ //充值
      path : '/rechargeClause',
      component : rechargeClause
    },{ //拍卖（详情父组件）
      path : '/auction',
      component : auction,
      children: [
        {
          path: '',
          redirect: 'details'
        },{ //详情
          path : 'details',
          component : details
        },{ //显性损伤
          path : 'dominantInjury',
          component : dominantInjury
        },{ //显性损伤图片查看
          path : 'imgDetail',
          component : imgDetail
        },{ //隐性损伤
          path : 'recessiveInjury',
          component : recessiveInjury
        },{//手续证件
          path: 'certificates',
          component: certificates
        }
      ]
    },{//订单管理
      path: 'order',
      component: order
    }
  ]
}]
