<template>
<div class="info-list">
	<div class="info-list-item">
		<div class="title">Всего клиентов</div>
		{{ info.all }}
	</div>
	<div class="info-list-item">
		<div class="title">На адаптации</div>
		{{ info.adaptive }}
	</div>
	<div class="info-list-item">
		<div class="title">Переданы в ТП</div>
		{{ info.support }}
	</div>
	<div class="info-list-item">
		<div class="title">Отток клиентов</div>
		{{ info.loss }}
	</div>
	<div class="info-list-item">
		<div class="title">Процент оттока</div>
		{{ info.percent_loss }}%
	</div>
</div>
</template>

<script setup lang="ts">
	import { reactive, onMounted } from "vue";
	import axios from 'axios'

	interface Info{
		all: number,
		adaptive: number,
		support: number,
		loss: number,
		percent_loss: number
	}

	let info = reactive<Info>({
		all: 720,
		adaptive: 40,
		support: 624,
		loss: 624,
		percent_loss: 15
	})

	const $_ui_info_loadData = async () => {
		try {
			const { data } = await axios({
				method: 'GET',
				url: encodeURI('https://url.ru/info'),
				headers: { Authorization: 'Bearer '  } // если надо
			})

			if(data) {
				info = data
			}
		} catch(e){
			console.error(e.msg)
		}
	}

	// onMounted(() => $_ui_info_loadData())
</script>

<style scoped lang="scss">
	@import '@/style/variables';
	.info-list{
		display: inline-flex;
		align-items: flex-start;
		gap: 13px;
		justify-content: space-between;
		width: 100%;
		max-width: 100%;
		overflow-x: auto;
		margin-bottom: $offset-28;
		-ms-overflow-style: none;
		scrollbar-width: none;
		&::-webkit-scrollbar{
			display: none;
		}
		&-item{
			height: 50px;
			min-width: 224px;
			max-width: 224px;
			padding: 0 $offset-24;
			border-radius: $border-radius;
			border: solid 1px $color-violet;
			font-size: $font-size-18;
			font-family: $font-bold;
			display: flex;
			align-items: center;
			column-gap: $offset-6;
			.title{
				font-size: $font-size-16;
				font-family: $font-regular;
				flex-grow: 1;
			}
		}
	}
</style>