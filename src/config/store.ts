import {createStore} from "vuex";

interface State {
	auth: boolean,
	url: string
}

const store = createStore({
	state: (): State => ({
		auth: true,
		url: process.env.VUE_APP_SERVER
	}),
	getters: {
		getAuth(state): boolean{
			return state.auth
		}
	},
	mutations: {
		auth: (state, auth) => {
			state.auth = auth
		}
	}
})

export default store