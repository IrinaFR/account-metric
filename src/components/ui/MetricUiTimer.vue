<template>
<div class="clock">
	<span class="time">{{ timer }}</span>
	<div class="day-week">{{ dayWeek }}</div>
	{{ new Date().toLocaleDateString('ru') }}
</div>
</template>
<script setup lang="ts">
	import { ref, computed, onMounted } from "vue";

	let timer = ref<string>('00 : 00 : 00')
	const days: string[] = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
	const day: number = new Date().getDay()

	const dayWeek = computed<string>(() => {
		return days[day - 1]
	})
	onMounted(() => setInterval(() => {
		getCurrentTime()
	}, 1000))

	const getCurrentTime = (): void => {
		const date: Date = new Date()
		const hours: string | number = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
		const minutes: string | number = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
		const seconds: string | number = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
		timer.value = hours + ' : ' + minutes + ' : ' + seconds
	}
</script>

<style scoped lang="scss">
	@import '@/style/variables';
	.clock{
		height: 50px;
		border-radius: $border-radius;
		border: solid 1px $color-blue;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		column-gap: 6px;
		font-family: $font-bold;
		margin-bottom: $offset-28;
		padding: 0 $offset-24;
		white-space: nowrap;
		letter-spacing: -0.3px;
		.time{
			width: 80px;
		}
		.day-week{
			color: $color-blue;
		}
		@media(max-width: 1260px){
			&:last-child{
				width: 100%;
			}
		}
		@media(max-width: 991px){
			letter-spacing: 0;
		}
	}
</style>