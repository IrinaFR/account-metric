<template>
<div class="container-spinner bg-block">
	<div class="lds-spinner">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
</div>
</template>

<style scoped lang="scss">
	.container-spinner{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 774px;
		@media(max-width: 1252px){
			height: 695px;
		}
		@media(max-width: 991px){
			height: 500px;
		}
		.lds-spinner {
			color: #4C3FA5;
			display: inline-block;
			position: relative;
			width: 80px;
			height: 80px;
			div {
				transform-origin: 40px 40px;
				animation: lds-spinner 1.2s linear infinite;
				&:after {
					content: "";
					display: block;
					position: absolute;
					top: 3px;
					left: 37px;
					width: 6px;
					height: 18px;
					border-radius: 20%;
					background: #4C3FA5;
				}
				&:nth-child(1) {
					transform: rotate(0deg);
					animation-delay: -1.1s;
				}
				&:nth-child(2) {
					transform: rotate(30deg);
					animation-delay: -1s;
				}
				&:nth-child(3) {
					transform: rotate(60deg);
					animation-delay: -0.9s;
				}
				&:nth-child(4) {
					transform: rotate(90deg);
					animation-delay: -0.8s;
				}
				&:nth-child(5) {
					transform: rotate(120deg);
					animation-delay: -0.7s;
				}
				&:nth-child(6) {
					transform: rotate(150deg);
					animation-delay: -0.6s;
				}
				&:nth-child(7) {
					transform: rotate(180deg);
					animation-delay: -0.5s;
				}
				&:nth-child(8) {
					transform: rotate(210deg);
					animation-delay: -0.4s;
				}
				&:nth-child(9) {
					transform: rotate(240deg);
					animation-delay: -0.3s;
				}
				&:nth-child(10) {
					transform: rotate(270deg);
					animation-delay: -0.2s;
				}
				&:nth-child(11) {
					transform: rotate(300deg);
					animation-delay: -0.1s;
				}
				&:nth-child(12) {
					transform: rotate(330deg);
					animation-delay: 0s;
				}
			}
		}
	}
	@keyframes lds-spinner {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
<script setup lang="ts">
</script>