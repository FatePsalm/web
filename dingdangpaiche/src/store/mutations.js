import {
	setuserInfo,
	setcounter,
	setatState,
	setdetailScroll,
	setdIstate,
	sethomeState,

} from './mutation-types.js'

export default {
	[setuserInfo](state, information) {
		state.userInfo = information;
	},
	[setcounter](state, msg) {
		state.counter = msg;
	},
	[setatState](state, atState) {
		state.atState = atState;
	},
	[setdetailScroll](state, detailScroll) {
		state.detailScroll = detailScroll;
	},
	[setdIstate](state, dIstate) {
		state.dIstate = dIstate;
	},
	[sethomeState](state, homeState) {
		state.homeState = homeState;
	}
}
