import {createRouter, createWebHistory} from "vue-router";
import store from './store'

const router = createRouter({
	history: createWebHistory(),
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { top: 0 };
		}
	},
	routes: [
		{
			path: '/',
			component: () => import('@/components/MetricIndex.vue'),
			name: 'index',
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/login',
			component: () => import('@/components/MetricLogin.vue'),
			name: 'login'
		},
	]
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if(!store.getters.getAuth) {
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				}
			})
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router