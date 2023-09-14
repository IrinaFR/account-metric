<template>
<div class="login">
	<div class="bg-block">
		<div class="logo">
			<img src="/img/logo.svg" alt="CORE12 АБОНЕНТ">
		</div>
		<form class="login-form" @submit.prevent="$_login_submit">
			<div class="form-group">
				<input type="text" v-model="form.login" :class="['login-form-input', {invalid:!form.login && invalid}]" @input="invalid=false" id="login" autocomplete>
			</div>
			<div class="form-group">
				<input type="text" v-model="form.password" :class="['login-form-input', {invalid:!form.password && invalid}]" @input="invalid=false" id="password" autocomplete>
			</div>
			<button class="login-btn" type="submit" :disabled="invalid">Войти</button>
		</form>
	</div>
</div>
</template>

<script setup lang="ts">
	import {reactive, ref} from "vue";
	import {useStore} from "vuex";

	import { useRouter, useRoute } from 'vue-router'
	const store = useStore()
	const router = useRouter()
	const route = useRoute()

	const form = reactive<{
		login: string,
		password: string
	}>({
		login: '',
		password: ''
	})
	let invalid = ref<boolean>(false)



	const $_login_submit = async () => {
		if(form.login&&form.password){
			await store.commit('auth', true)
			if(route.query.redirect) router.replace(route.query.redirect)
			else router.replace('/')

			form.login = ''
			form.password = ''
		} else invalid.value = true
	}
</script>

<style scoped lang="scss">
	@import "@/style/variables";
	.login{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100%;
		.bg-block{
			padding: 28px 60px $offset-30;
			width: 378px;
			max-width: 100%;
			@media(max-width: 378px){
				padding: $offset-30;
			}
		}
		.logo{
			text-align: center;
			img{
				height: 15px;
			}
		}
		&-form{
			margin-top: 60px;
			display: flex;
			flex-direction: column;
			row-gap: 22px;
			&-input{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				max-width: 258px;
				height: 50px;
				border-radius: $border-radius;
				border: solid 1px #1A1A21;
				background: rgba(22, 22, 22, 0.70);
				text-align: center;
				color: $color-input-text;
				font-size: 16px;
				&.invalid{
					border: solid 1px rgba(246, 76, 87, 0.70);
				}
				&:focus{
					border: solid 1px $color-input-border;
				}
				@media(max-width: 378px){
					max-width: 100%;
				}
			}
			.login-btn{
				border: none;
				margin-top: 41px;
				width: 100%;
				height: 50px;
				font-size: 16px;
				background: $color-blue;
				border-radius: $border-radius;
				font-family: $font-semibold;
				color: $color-white;
				cursor: pointer;
				&:disabled{
					opacity: .7;
				}
			}
		}
	}
</style>