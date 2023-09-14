<template>
<div class="contragent-table" v-if="agent">
	<div :class="['day', { red : agent.loss }]">{{ agent.day }}</div>
	<div class="info">
		<span class="id">{{ agent.core_id }}</span>
		<span class="name">{{ agent.name }}</span>
		<span :class="['status', {red : !agent.status}]">
			<span class="circle"></span>
		</span>
		<span :class="['visit', { red : !agent.visits }]">{{ agent.visits }}</span>
		<span :class="['revenue', { red : !agent.revenue }]">{{ (agent.revenue).toLocaleString('ru') }} р</span>
		<span :class="['check', { red : !agent.average_check }]">{{ (agent.average_check).toLocaleString('ru') }} р</span>
		<span class="bot">
			<img v-if="agent.bot" src="/img/check-active.svg" alt="Подключён">
			<img v-else src="/img/check-disable.svg" alt="Не подключён">
		</span>
		<span class="sms">
			<img v-if="agent.sms" src="/img/check-active.svg" alt="Подключены">
			<img v-else src="/img/check-disable.svg" alt="Не подключены">
		</span>
		<span class="player" :style="`--fillPercent:${executorProgress}%`">
			{{ agent.executor_current }} / {{ agent.executor_max }}
		</span>
	</div>
</div>
</template>
<script setup lang="ts">
	import { defineProps, computed, withDefaults } from "vue";
	import Contragent from "@/types/contragent";

	const props = withDefaults(defineProps<{
		agent: null | Contragent
	}>(), {
		agent: null
	})

	const executorProgress = computed(() => {
		if(props.agent?.executor_current && props.agent?.executor_max) return props.agent.executor_current * 100 / props.agent.executor_max
		else return 0
	})
</script>

<style scoped lang="scss">
	@import '@/style/variables';

	.contragent-table{
		display: flex;
		column-gap: 8px;
		margin-bottom: $offset-12;
		&:last-child{
			margin-bottom: 0;
		}
		&:nth-child(2n) .day{
			background: $color-black-item-transparent;
		}
		.day{
			min-width: 56px;
			max-width: 56px;
			line-height: 54px;
			border-radius: $border-radius;
			text-align: center;
			background: $color-black-item;
			border: solid 1px $color-black-item;
			&.red{
				border: solid 1px $color-red;
			}
		}
		&:nth-child(2n) .info{
			background: $color-black-item-transparent;
		}
		&:nth-child(2n) span.player{
			background: linear-gradient(90deg, #79B8A0 30%, $color-black 30%);
		}
		.info{
			display: flex;
			flex: 1;
			column-gap: $offset-6;
			align-items: center;
			border-radius: $border-radius;
			background: $color-black-item;
			padding: 0 $offset-24;
			min-width: 1034px;
			span{
				display: block;
				&.red{
					color: $color-red;
				}
			}
			span.id{
				max-width: 95px;
				min-width: 95px;
			}
			span.name{
				max-width: 133px;
				min-width: 133px;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}
			span.status{
				max-width: 94px;
				min-width: 94px;
				text-align: center;
				.circle{
					width: 8px;
					height: 8px;
					min-width: 8px;
					background: $color-green;
					border-radius: 50%;
					margin-left: 20px;
				}
				&.red .circle{
					background: $color-red;
				}
			}
			span.visit{
				max-width: 98px;
				min-width: 98px;
			}
			span.revenue{
				max-width: 110px;
				min-width: 110px;
			}
			span.check{
				max-width: 142px;
				min-width: 142px;
			}
			span.bot{
				max-width: 93px;
				min-width: 93px;
				img{
					margin-left: 15px;
				}
			}
			span.sms{
				max-width: 77px;
				min-width: 77px;
				img{
					margin-left: 8px;
				}
			}
			span.player{
				--fillPercent: 0%;
				height: 28px;
				width: 118px;
				border-radius: $border-radius;
				border: solid 1px $color-green;
				text-align: center;
				line-height: 28px;
				background: linear-gradient(90deg, #79B8A0 var(--fillPercent), $color-black-item-transparent var(--fillPercent));
				@media(max-width: 991px){
					flex: 0;
					max-width: 100px;
					min-width: 100px;
				}
			}
		}
	}
</style>
