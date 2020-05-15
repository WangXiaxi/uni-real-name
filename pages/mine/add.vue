<template>
	<view class="content">
		<view class="row b-b b-t">
			<text class="tit">用户名</text>
			<input class="input" type="text" v-model="formData.bindUserName" placeholder="请输入用户名" placeholder-class="placeholder-dark" />
		</view>

		<view class="row b-b">
			<text class="tit">密码</text>
			<input class="input" type="password" v-model="formData.bindUserPass" placeholder="请输入密码" placeholder-class="placeholder-dark" />
		</view>

		<button class="add-btn" :loading="loading" :disabled="loading" @click="confirm">提交</button>
	</view>
</template>

<script>
	import apiModel from '../../api/api.js'
	import {
		mapActions,
	} from 'vuex'
	const formFields = {
		bindUserName: '',
		bindUserPass: ''
	}
	
	export default {
		data() {
			return {
				sending: false,
				sendMessage: '发送验证码',
				formData: JSON.parse(JSON.stringify(formFields)),
				loading: false,
				rules: {
					bindUserName: {
						required: true
					},
					bindUserPass: {
						required: true,
						minlength: 6
					}
				},
				messages: {
					bindUserName: {
						required: '请输入用户名！'
					},
					bindUserPass: {
						required: '请输入密码！',
						minlength: '密码不能低于6位！'
					}
				}
			}
		},
		onLoad() {
			this.goLogin()
		},
		methods: {
			...mapActions(['goLogin']),
			confirm() {
				const {
					formData,
					rules,
					messages,
					loading
				} = this
				ApiModel.initValidate(rules, messages)
				if (!ApiModel.WxValidate.checkForm(formData)) return
				this.loading = true
				ApiModel.bindIDNum(formData).then(result => {
					Object.assign(this.formData, formFields)
					this.$api.msg('绑定成功！')
				}).catch(() => {
					this.loading = false
				})
			}
		}
	}
</script>

<style lang="scss">
	.code-btn {
		height: 64upx;
		line-height: 60upx;
		border: 1px solid $base-color;
		background-color: #fff;
		color: $base-color;
		font-size: $font-base;

		&::after {
			border: none;
		}

		&[disabled] {
			border-color: rgba(0, 0, 0, .3);
		}
	}

	page {
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 160upx;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
		}
	}

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: #1890FF;
		border-radius: 10upx;
	}

	.code-image {
		width: 260upx;
		height: 90upx;
	}
	.xieyi-section {
		width: 100%;
		margin-top: 20upx;
		margin-left: 30upx;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		display: flex;
		align-items: center;
		text {
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
	/*边框*/
	.b-b:after{
		position: absolute;
		bottom: 0;
		z-index: 3;
		left: 0;
		right: 0;
		height: 0;
		content: '';
		transform: scaleY(.5);
		border-bottom: 1px solid $border-color-base;
	}
	.b-t:after{
		position: absolute;
		top: 0;
		z-index: 3;
		left: 0;
		right: 0;
		height: 0;
		content: '';
		transform: scaleY(.5);
		border-bottom: 1px solid $border-color-base;
	}
</style>
