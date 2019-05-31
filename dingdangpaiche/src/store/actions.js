import * as types from './mutation-types'

export default {
	[types.setuserInfo]({ commit }, { bool }) {
		commit('setuserInfo', bool);
	},
	[types.setcounter]({ commit }, { bool }) {
		commit('setcounter', bool);
	},
	[types.setatState]({ commit }, { bool }) {
		commit('setatState', bool);
	},
	[types.setdetailScroll]({ commit }, { bool }) {
		commit('setdetailScroll', bool);
	},
	[types.setdIstate]({ commit }, { bool }) {
		commit('setdIstate', bool);
	},
	[types.sethomeState]({ commit }, { bool }) {
		commit('sethomeState', bool);
	}


}
