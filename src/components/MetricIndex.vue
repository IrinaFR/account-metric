<template>
<div class="content">
	<div class="side">
		<div class="left">
			<div class="logo bg-block">
				<img src="/img/logo.svg" alt="CORE12 АБОНЕНТ">
			</div>
			<MetricUiTimer/>
			<div class="left-side" v-if="loaded">
				<MetricUiSort :list="core_id" @change="$_ui_filter_setAppliedFilter($event, 'core_id')"/>
				<div class="info-all bg-block">
					<div class="progress">
						<div class="red" :style="`width:${percentRed}%`">{{ countRed }}</div>
						<div class="green" :style="`width:${percentGreen}%`">{{ countGreen }}</div>
					</div>
				</div>
			</div>
			<div class="left-side" v-else>
				<MetricUiSpinner/>
			</div>
		</div>
		<div class="right">
			<MetricUiFilter @search="$_ui_filter_setAppliedFilter($event, 'search')" @selectDate="$_ui_filter_setAppliedFilter($event, 'date', true)"/>
			<MetricUiInfo/>

			<div class="contragent-list bg-block" v-if="filteredData.length&&loaded">
				<div class="contragent-title">
					<div class="day">День</div>
					<div class="info">
						<span class="id">Core ID</span>
						<span class="name">Контрагент</span>
						<span class="status">Статус</span>
						<span class="visit">Визиты</span>
						<span class="revenue">Выручка</span>
						<span class="check">Средний чек</span>
						<span class="bot">ТГ-бот</span>
						<span class="sms">СМС</span>
						<span class="player">Исполнитель</span>
					</div>
				</div>
				<MetricUicontragent v-for="(agent, idx) in filteredData.slice(0, countShow)" :key="agent.id+'-'+idx" :agent="agent" />
				<div class="contragent-more">
					<button v-if="countShow < filteredData.length-1" class="btn" @click="$_ui_filter_showMore">Показать еще</button>
					<span>Показано {{countShow}} строк из {{filteredData.length}}</span>
				</div>
			</div>
			<div v-else>
				<div class="contragent-list-empty bg-block" v-if="loaded">По заданным параметрам список <br> контрагентов отсутствует</div>
				<MetricUiSpinner v-else/>
			</div>
		</div>
	</div>
</div>
</template>

<script setup lang="ts">
	import MetricUiFilter from "@/components/ui/MetricUiFilter.vue";
	import MetricUiTimer from "@/components/ui/MetricUiTimer.vue";
	import MetricUiInfo from "@/components/ui/MetricUiInfo.vue";
	import MetricUiSort from "@/components/ui/MetricUiSort.vue";
	import MetricUicontragent from "@/components/ui/MetricUicontragent.vue";
	import {ref, computed, reactive, onMounted} from "vue";
	import Contragent from "@/types/contragent";

	import {useStore} from "vuex";
	const store = useStore()

	import axios from 'axios'
	const loaded = ref<boolean>(false)

	let loadedContragent = ref<Contragent[]>([])
	let filteredData = ref<Contragent[]>([])
	let countShow = ref<number>(9)

	const core_id = ref<{
		value: number,
		color: string
	}[]>([])

	const applied_filter = reactive<{
		search: string,
		core_id: number[],
		date: Date[]
	}>({
		search: '',
		core_id: [],
		date: [new Date(), new Date(new Date().setDate(new Date().getDate() - 7))]
	})

	onMounted(() => {
		$_ui_filter_setData(applied_filter.date)
	})

	const $_ui_filter_loadData = async (period): Contragent[] | boolean => {
		try {
			loaded.value = false
			core_id.value = []
			loadedContragent.value = []

			const start = new Date(period[0])
			const end = new Date(period[1])
			const formData = {
				date_To: `${start.getFullYear()}-${start.getMonth() < 10 ? '0' + (start.getMonth() + 1) : start.getMonth() + 1}-${start.getDate() < 10 ? '0' + start.getDate() : start.getDate()}`,
				date_From: `${end.getFullYear()}-${end.getMonth() < 10 ? '0' + (end.getMonth() + 1) : end.getMonth() + 1}-${end.getDate() < 10 ? '0' + end.getDate() : end.getDate()}`
			}

			const { data } = await axios({
				method: 'POST',
				url: encodeURI(store.state.url + 'info'),
				data: formData
			})
			if(data) {
				return data
			}

			return false

		} catch(e){
			console.error(e.msg)
		}
	}

	const $_ui_filter_setData = async (period) => {
		const res = await $_ui_filter_loadData(period)
		if(res) {
			loadedContragent.value = res
			const core_id = new Set<number>()

			loadedContragent.value.forEach(c => {
				c.day = $_ui_filter_getNumberOfDays(c.date)
				if(!c.visits || !c.revenue || !c.average_check) c.loss = true

				core_id.add(c.core_id)
			})

			loadedContragent.value.sort((a, b) => {return a.day - b.day})
			filteredData.value = [...loadedContragent.value]

			$_ui_filter_setCoreId(core_id)
		}
	}

	const $_ui_filter_setCoreId = (coreId: Set<number>) => {
		coreId.forEach(id => {
			const loss: Contragent | undefined = loadedContragent.value.find(c => (c.core_id === id && c.loss))
			core_id.value.push({
				value: id,
				color: loss ? '#F64C57' : '#81CCAB'
			})
			applied_filter.core_id = core_id.value.map(c => c.value)
		})
		$_ui_filter_filterContragent()
	}

	const $_ui_filter_getNumberOfDays = (date: number) => {
		const today = new Date().getTime()
		const start = new Date(date).getTime()

		const oneDay = 1000 * 60 * 60 * 24

		const diffInTime = today - start

		const diffInDays = Math.round(diffInTime / oneDay)
		return diffInDays + 1;
	}

	const $_ui_filter_setAppliedFilter = (data: string | number[] | Date[], key: string, reset: boolean) => {
		applied_filter[key] = data
		reset
			? $_ui_filter_setData(applied_filter.date)
			: $_ui_filter_filterContragent()
	}

	const $_ui_filter_filterContragent = () => {
		loaded.value = false
		// core_id
		filteredData.value = loadedContragent.value.filter(c => applied_filter.core_id.includes(c.core_id))

		// name
		filteredData.value = filteredData.value.filter(c => c.name.toLowerCase().trim().includes(applied_filter.search))

		countShow.value = filteredData.value.length < 10 ? filteredData.value.length : 10
		loaded.value = true
	}


	const countRed = computed<number>(() => {
		return loadedContragent.value.filter(c => c.loss).length
	})
	const percentRed = computed<number>(() => {
		return Math.ceil(100 * countRed.value / loadedContragent.value.length)
	})
	const countGreen = computed<number>(() => {
		return loadedContragent.value.filter(c => !c.loss).length
	})
	const percentGreen = computed<number>(() => {
		return Math.ceil(100 * countGreen.value / loadedContragent.value.length )
	})

	const $_ui_filter_showMore = () => {
		if(filteredData.value.length - countShow.value <= 10) countShow.value = filteredData.value.length
		else countShow.value += 10
	}
</script>

<style scoped lang="scss">
	.left-side{
		position: sticky;
		top: 24px;
	}
</style>


