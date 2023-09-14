<template>
<div class="filterCore bg-block">
	<div class="title">CORE ID</div>
	<div class="filterCore-params-list">
		<div class="filterCore-params all">
			<input
				checked
				type="radio"
				id="checkbox-filterCore-all"
				name="checkbox-filterCore"
				@change="$_ui_filterCore_setFilterCore">
			<label
				class="filterCore-params"
				for="checkbox-filterCore-all">
				Все кабинеты
			</label>
		</div>
		<div class="filterCore-params" :style="`--color:${checkbox.color}`" v-for="(checkbox, idx) in list" :key="idx">
			<input
				type="radio"
				:id="`checkbox-filterCore-${checkbox.value}`"
				name="checkbox-filterCore"
				@change="$_ui_filterCore_setFilterCore(checkbox.value)">
			<label
				class="filterCore-params"
				:for="`checkbox-filterCore-${checkbox.value}`">
				{{ checkbox.value }}
			</label>
		</div>
	</div>
</div>
</template>
<script setup lang="ts">
	import { defineProps, defineEmits} from "vue";
	import {withDefaults} from "vue/dist/vue";

	const emit = defineEmits<{
		(e: 'change', value: number[]): void
	}>()

	interface Props{
		list: {
			value: number,
			color: string
		}[]
	}
	const props = withDefaults(defineProps<Props>(), {
		list: () => []
	})

	const $_ui_filterCore_resetfilterCore = () => {
		emit('change', props.list.map(c => c.value))
	}
	const $_ui_filterCore_setFilterCore = (value: number | undefined) => {
		value
			? emit('change', [value])
			: emit('change', props.list.map(c => c.value))
	}
</script>

<style scoped lang="scss">
	@import '@/style/variables';
	.filterCore{
		padding: $offset-24;
		margin-bottom: $offset-24;
		.title{
			font-family: $font-bold;
			line-height: 26px;
			width: 100%;
			text-align: center;
			margin-bottom: $offset-24;
		}
		&-params {
			margin-bottom: $offset-12;
			cursor: pointer;
			&:nth-child(2n) label{
				background: $color-black-item-transparent
			}
			&:last-child{
				margin-bottom: 0;
			}
			&-list{
				overflow: auto;
				max-height: 533px;
				-ms-overflow-style: none;
				scrollbar-width: none;
			}
			&-list::-webkit-scrollbar{
				display: none;
			}
			input{
				display: none;
			}
			input:checked ~ label{
				border: solid 1px var(--color);
				background: var(--color);
			}
			label {
				display: block;
				line-height: 54px;
				text-align: center;
				border-radius: $border-radius;
				background: $color-black-item;
				border: solid 1px var(--color);

			}
			&.all input:checked ~ label{
				border: solid 1px $color-black-item;
				background: $color-green;
			}
			&.all label{
				border: solid 1px $color-black-item;
			}
			@media(max-width: 991px){
				&.all{
					width: 100%;
				}
			}
		}
		@media(max-width: 991px){


			&-params-list{
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: $offset-12;
			}
			&-params{
				margin-bottom: 0;
				min-width: 135px;
				max-width: 135px;
			}
		}
	}
</style>
