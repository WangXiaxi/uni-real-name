<template>
	<view class="content">
		<image class="bg" src="../../static/login-bg.jpg"></image>
		<view class="center">
			<view class="title">welcome</view>
			<view class="item">
				<image class="left-ico" src="../../static/user.png"></image>
				<input type="text" v-model.trim="formData.loginInfo" class="" name="loginInfo" placeholder="请输入用户名" placeholder-class="placeholder" />
			</view>
			<view class="item">
				<image class="left-ico" src="../../static/idcard.png"></image>
				<input type="text" v-model.trim="formData.idNum" class="" name="idNum" placeholder="请输入身份证号" placeholder-class="placeholder" />
			</view>
			<view class="item">
				<image class="left-ico" src="../../static/password.png"></image>
				<input type="password" v-model.trim="formData.password" class="" name="password" placeholder="请输入密码"
				 placeholder-class="placeholder" />
			</view>
			<button type="primary" class="no-border confirm-btn" @click="confirm" :loading="loading" :disabled="loading">登录</button>
		</view>
	</view>
</template>

<script>
	import ApiModel from '../../api/api.js'
	import {
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				loading: false,
				formData: {
					password: '', // 密码
					idNum: '', // 身份证
					loginInfo: '' // 用户名
				},
				rules: {
					loginInfo: {
						required: true
					},
					idNum: {
						required: true,
						idcard: true
					},
					password: {
						required: true,
						minlength: 6
					}
				},
				messages: {
					loginInfo: {
						required: '请输入用户名！'
					},
					idNum: {
						required: '请输入身份证！'
					},
					password: {
						required: '请输入密码！',
						minlength: '密码不能低于6位！'
					}
				}
			}
		},
		computed: {},
		methods: {
			...mapMutations(['login']),
			...mapActions(['getUserInfo']),
			navTo(url, type = true) {
				uni.navigateTo({
					url
				})
			},
			confirm() { // 确定操作
				const {
					formData,
					rules,
					messages,
					loading
				} = this
				ApiModel.initValidate(rules, messages)
				if (!ApiModel.WxValidate.checkForm(formData)) return
				this.loading = true
				ApiModel.login(formData).then(result => {
					this.login(result.data.userToken)
					this.getUserInfo().then(res => {
						this.loading = false
						uni.redirectTo({
							url: '/pages/mine/index'
						})
					})
				}).catch(() => {
					this.loading = false
				})
			}
		}
	}
</script>

<style lang="scss">
	.bg {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		z-index: 0;
		width: 750rpx;
		height: 100%;
	}

	.center {
		padding: 180rpx 32rpx 0;
		position: relative;
		z-index: 1;
		.title {
			color: #FFFFFF;
			font-size: 60rpx;
			text-align: center;
			margin-bottom: 40px;
		}

		.item {
			margin-top: 30rpx;
			padding: 0 20rpx;
			border-radius: 50rpx;
			background-color: #B3DFE2;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 96rpx;

			.left-ico {
				width: 48rpx;
				height: 48rpx;
			}

			input {
				flex: 1;
				height: 96rpx;
				margin-left: 20rpx;
				color: #ffffff;
			}
		}

		.confirm-btn {
			margin: 50rpx 80rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #FFFFFF;
			border-radius: 50rpx;
			line-height: 1;
			height: 96rpx;
			color: #74C3CA;
		}
	}
</style>
