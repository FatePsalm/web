import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex);

const state = {
	userInfo: {

	}, //用户信息
	counter: "",		//当前返回键状态
	atState: "",		//拍卖状态
	detailScroll: "",		//详情滚动条位置
	dIstate: "",		//显性损伤离开时状态状态
	homeState: "",	//首页离开时状态
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
})
