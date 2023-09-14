<template>
<div class="header-filter">
	<div class="filter bg-block">
		<label class="filter-params" for="filterToday">
			Сегодня
			<input type="radio" v-model="checkboxDatePeriod" name="filterDate" id="filterToday" value="today" @change="$_ui_filter_filterDate">
		</label>
		<label class="filter-params" for="filterYesterday">
			Вчера
			<input type="radio" v-model="checkboxDatePeriod" name="filterDate" id="filterYesterday" value="yesterday" @change="$_ui_filter_filterDate">
		</label>
		<label class="filter-params" for="filterWeek">
			Неделя
			<input type="radio" v-model="checkboxDatePeriod" name="filterDate" id="filterWeek" value="lastWeek" @change="$_ui_filter_filterDate">
		</label>
		<VueDatePicker
			v-model="selectDate"
			ref="datepicker"
			range
			dark
			:max-date="maxDate"
			locale="ru"
			multi-calendars
			hide-offset-dates
			:enable-time-picker="false"
			:class="{selectedDate:!checkboxDatePeriod}"
			:format="$_ui_filter_formatDate">
			<template #input-icon><!--	Скрытие иконки календаря --> </template>
			<template #arrow-left> <!--Стрелка влево-->
				<img class="custom-arrow-left" src="/img/blue-arrow.svg" alt="Назад"/>
			</template>
			<template #arrow-right> <!--Стрелка вправо-->
				<img class="custom-arrow-right" src="/img/blue-arrow.svg" alt="Вперёд"/>
			</template>
			<template #action-buttons="{ value }">
				<!--	Кнопки		-->
				<p class="custom-select" @click="$_ui_filter_selectDate(value)">Применить</p>
			</template>
			<template #clear-icon>
				<!--	Иконка стрелки	-->
				<img src="/img/arrow-down.svg" alt="Выбрать дату" class="input-slot-image">
			</template>

			<template #action-preview="{ value }">
				<!--превью даты-->
				<span class="custom-preview">{{new Date(value[0]).toLocaleDateString()}} {{value[1] ? '- ' + new Date(value[1]).toLocaleDateString() : ''}}</span>
			</template>
		</VueDatePicker>
	</div>
	<div class="search">
		<input
			v-model="search"
			type="text"
			placeholder="Поиск"
			class="search"
			@change="$_ui_filter_search"
			>
		<img src="/img/search.svg" alt="Поиск">
	</div>
</div>
</template>
<script setup lang="ts">
	import VueDatePicker from '@vuepic/vue-datepicker';
	import type { DatePickerInstance } from "@vuepic/vue-datepicker"
	import '@/style/datepicker.scss'
	import { ref, defineEmits } from "vue";

	const emit = defineEmits<{
		(e: 'search', text: string): void
		(e: 'selectDate', period: Date[]): void
	}>()

	let checkboxDatePeriod = ref<string>('')

	const datepicker = ref<DatePickerInstance>(null);

	const maxDate: Date = new Date()
	const minDate: Date = new Date(new Date().setDate(new Date().getDate() - 7))
	// const maxDate = 'Fri Jul 07 2023 17:58:00 GMT+0300 (Москва, стандартное время)'
	// const minDate = 'Tue Jul 18 2023 17:58:00 GMT+0300 (Москва, стандартное время)'
	const month: string[] = [
			'янв.',
			'февр.',
			'март',
			'апр.',
			'май',
			'июнь',
			'июль',
			'авг.',
			'сент.',
			'окт.',
			'нояб.',
			'дек.',
		]

	// формат даты для datepicker
	const $_ui_filter_formatDate = (date: Date[]): string => {
		// format Mon Jul 03 2023 18:23:00 GMT+0300 (Москва, стандартное время)
		const day_start: number = date[0].getDate();
		const month_start: number = date[0].getMonth() + 1;
		const year_start: number = date[0].getFullYear();
		if(date[1]){
			const day_end: number = date[1].getDate();
			const month_end: number = date[1].getMonth() + 1;
			const year_end: number = date[1].getFullYear();
			return `${day_start} ${month[month_start - 1]} ${year_start} - ${day_end} ${month[month_end - 1]} ${year_end}`;
		}
		return `${day_start} ${month[month_start - 1]} ${year_start} -`;
	}

	let search = ref<string>('')
	const $_ui_filter_search = (): void => {
		emit('search', search.value.toLowerCase().trim())
	}


	let selectDate = ref<Date[]>([maxDate, minDate])
	const $_ui_filter_selectDate = (data: Date[]) => {
		selectDate.value = data
		checkboxDatePeriod.value = ''
		$_ui_filter_filterDate()
	}
	const $_ui_filter_filterDate = (): void => {
		switch (checkboxDatePeriod.value){
			case 'today': {
				const today: Date = new Date();
				emit('selectDate', [today, today])
				break
			}
			case 'yesterday': {
				const yesterday: Date = new Date()
				yesterday.setDate(yesterday.getDate() - 1)
				emit('selectDate', [yesterday, yesterday])
				break
			}
			case 'lastWeek': {
				const today: Date = new Date()
				const lastWeek: Date = new Date();
				lastWeek.setDate(lastWeek.getDate() - 7);
				emit('selectDate', [today, lastWeek ])
				break
			}
			default: {
				emit('selectDate', [selectDate.value[1], selectDate.value[0]])
				if(datepicker.value) datepicker.value.closeMenu()
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "@/style/variables";

	.header-filter{
		position: sticky;
		top: 24px;
		z-index: 1;
		width: 100%;
		display: flex;
		align-items: center;
		column-gap: $offset-12;
		justify-content: space-between;
		margin-bottom: $offset-30;
		&.sticky{
			background: $bg;
		}
		@media(max-width: 1252px) {
			row-gap: $offset-30;
			flex-wrap: wrap;
		}
		@media(max-width: 991px) {
			top: 12px;
		}
		.filter{
			width: 532px;
			display: flex;
			align-items: center;
			padding: 0 6px 0 11px;
			height: fit-content;
			min-height: 50px;
			@media(max-width: 991px){
				width: 100%;
			}
			&-params{
				display: block;
				cursor: pointer;
				padding: 0 16px;
				line-height: 38px;
				border-radius: 16px;
				background: transparent;
				transition: .15s ease;
				input{
					display: none;
				}
				&:has(input:checked){
					background: $color-dark-grey;
					color: $bg;
				}
			}
			&-date{
				display: flex;
				column-gap: 9px;
				padding: 5px 9px;
				white-space: nowrap;
				border-radius: $border-radius;
				background: transparent;
				color: $color-black-text;
				&.active{
					background: $color-dark-grey;
				}
			}
			@media(max-width: 590px){
				flex-wrap: wrap;
				padding: $offset-24;
				row-gap: $offset-24;
				.filter-date{
					flex: 1;
				}
			}
		}
		.search{
			width: 462px;
			height: 50px;
			position: relative;
			& input.search{
				display: block;
				height: 100%;
				width: 100%;
				border-radius: $border-radius;
				background: rgba(33, 32, 40, 0.80);
				border: solid 1px rgba(33, 32, 40, 0.80);
				padding: 0 46px 0 24px;
				font-size: 16px;
				color: $color-input-text;
				&:focus{
					border: solid 1px $color-input-border;
				}
				&::placeholder{
					color: $color-white-transparent;
					font-family: $font-regular;
				}
			}
			& img{
				position: absolute;
				right: 22px;
				top: 50%;
				transform: translateY(-50%);
			}
			@media(max-width: 1252px) {
				width: 100%;
			}
		}
	}
</style>
