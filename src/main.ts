import { createApp } from 'vue'
import App from './App.vue'
import store from "@/config/store";
import router from '@/config/router'
import MetricUiSpinner from "@/components/ui/MetricUiSpinner.vue";

import './style/style.scss'

createApp(App)
	.component('MetricUiSpinner', MetricUiSpinner)
	.use(store)
	.use(router)
	.mount('#app')
