<template>
	<view class="content">
		
		<view class="tip"><text>1.</text>&nbsp;银行卡信息必须填写完整准确；</view>
		<view class="tip"><text>2.</text>&nbsp;绑定的必须是本人的银行卡；</view>
		<view class="tip"><text>3.</text>&nbsp;一个银行卡、手机号只能绑定一次；</view>
		
		<view class="row b-b b-t">
			<text class="tit">姓名</text>
			<view class="input">{{ userInfo.name | fill }}</view>
		</view>

		<view class="row b-b b-t">
			<text class="tit">身份证</text>
			<view class="input">{{ userInfo.id_num | fill }}</view>
		</view>
		
		<view class="row b-b" style="margin-top: 30upx;">
			<text class="tit">开户银行</text>
			<input class="input" type="text" v-model="formData.bank" placeholder="请输入开户银行" placeholder-class="placeholder" />
		</view>

		<view class="row b-b">
			<text class="tit">开户地区</text>
			<text @click="chooseCity" class="input">
				{{region.label}}
			</text>
			<text class="yticon icon-shouhuodizhi"></text>
		</view>

		<view class="row b-b">
			<text class="tit">开户支行</text>
			<input class="input" type="text" v-model="formData.bank_branch" placeholder="请输入开户支行" placeholder-class="placeholder" />
		</view>

		<view class="row b-b">
			<text class="tit">银行卡号</text>
			<input class="input" type="number" v-model="formData.card_num" placeholder="请输入银行卡号" placeholder-class="placeholder" />
		</view>
		
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="formData.mobile" placeholder="请输入手机号" placeholder-class="placeholder" />
		</view>

		<view class="row b-b">
			<text class="tit">短信验证码</text>
			<input class="input" type="number" v-model="formData.mobile_code" placeholder="请输入验证码" placeholder-class="placeholder" />
			<button class="code-btn" :disabled="sending" @click="sendCode">{{sendMessage}}</button>
		</view>

		<button class="add-btn" :loading="btnLoading" :disabled="btnLoading || !!userInfo.card_num" @click="confirm">提交</button>
		
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onCancel="onCancel"
		 @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import apiModel from '../../api/api.js'
	import {
		CheckBankNo
	} from '../../utils/isBankCard.js'
	import {
		mapActions,
		mapGetters,
		mapMutations
	} from 'vuex'

	import mpvueCityPicker from '@/components/ydui-citypicker/mpvueCityPicker.vue'

	const fields = {
		mobile: '',
		province: '',
		city: '',
		area: '',
		bank: '',
		bank_branch: '',
		card_num: '',
		mobile_code: ''
	}

	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				btnLoading: false,
				sendMessage: '发送验证码',
				sending: false,
				formData: JSON.parse(JSON.stringify(fields)),
				cityPickerValue: [0, 0, 0],
				themeColor: '#ea1212',
				region: {
					label: '请点击选择地址',
					value: [],
					code: []
				},
				rules: {
					bank: {
						required: true
					},
					bank_branch: {
						required: true
					},
					card_num: {
						required: true
					},
					area: {
						required: true
					},
					mobile: {
						required: true,
						tel: true
					}
				},
				messages: {
					bank: {
						required: '请输入开户银行！'
					},
					bank_branch: {
						required: '请输入开户支行！'
					},
					card_num: {
						required: '请输入银行卡号！'
					},
					area: {
						required: '请选择开户地区！'
					},
					mobile: {
						required: '请输入手机号码！'
					}
				}
			}
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.logout()
				this.goLogin()
			}
		},
		onLoad() {
			// this.goLogin(() => {
			// 	if (this.userInfo.card_num) {
			// 		uni.redirectTo({
			// 			url: '/pages/mine/index'
			// 		})
			// 		return
			// 	}
			// })
		},
		onBackPress() {
			if (this.$refs.mpvueCityPicker && this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		onUnload() {
			if (this.$refs.mpvueCityPicker && this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		},
		methods: {
			...mapActions(['goLogin', 'getUserInfo']),
			...mapMutations(['logout']),
			// 发送验证码
			sendCode() {
				const {
					formData: {
						mobile
					},
					rules: {
						mobile: mobileRule
					},
					messages: {
						mobile: mobileMessage
					}
				} = this
				const sendData = {
					mobile
				}
				apiModel.initValidate({
					mobile: mobileRule
				}, {
					mobile: mobileMessage
				})
				if (!apiModel.WxValidate.checkForm(sendData)) return
				this.sending = true
				apiModel.getCallCode(sendData).then(res => {
					this.code = res.data.json
					this.$api.msg('短信发送成功！')
					this.mobile = sendData.mobile
					this.timeAction()
				}).catch(() => {
					this.sending = false
				})
			},
			// 倒计时
			timeAction() {
				let t = 120
				const fun = () => {
					t--
					this.sendMessage = `${t}s重新获取`
					if (t <= 0) {
						this.sendMessage = '发送验证码'
						this.sending = false
						clearInterval(inter)
					}
				}
				this.sendMessage = `${t}s重新获取`
				let inter = setInterval(fun, 1000)
			},
			chooseCity() {
				this.$refs.mpvueCityPicker.show()
			},
			onCancel(e) {},
			onConfirm(e) {
				this.region = e;
				this.cityPickerValue = e.value;
			},
			//提交
			confirm() {
				const {
					rules,
					messages
				} = this
				const {
					bank,
					bank_branch,
					card_num,
					mobile,
					mobile_code
				} = this.formData;
				const [province, city, area] = this.region.code
				const sendData = {
					bank,
					bank_branch,
					card_num,
					province,
					city,
					area,
					mobile
				}
				apiModel.initValidate(rules, messages)
				if (!apiModel.WxValidate.checkForm(sendData)) return
				if (mobile !== this.mobile) return this.$api.msg('手机与验证码不匹配请重新获取！')
				if (!mobile_code || mobile_code != this.code) return this.$api.msg('短信验证码不正确！')
				if (!CheckBankNo(card_num)) return this.$api.msg('请检查银行卡输入是否正确！')

				uni.showModal({
					title: '提示',
					content: '提交成功后不能修改，确认提交吗？',
					success: (res) => {
						if (res.confirm) {
							this.btnLoading = true
							apiModel.bindCardInfo(sendData).then(res => {
								this.$api.msg(`完善信息成功！`);
								setTimeout(() => {
									this.getUserInfo().then(res => {
										this.btnLoading = false
										uni.redirectTo({
											url: '/pages/mine/index'
										})
									})
								}, 1500)
							}).catch(() => {
								this.btnLoading = false
							})
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.tip {
		padding-left: 30upx;
		font-size: 24upx;
		color: #999999;
		margin-bottom: 10upx;
		text {
			color: $base-color;
		}
	}
	.code-btn {
		height: 64upx;
		line-height: 60upx;
		border: 1px solid #1890FF;
		background-color: #fff;
		color: #1890FF;
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
		margin: 60upx auto 20upx;
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
	.b-b:after {
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

	.b-t:after {
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
s
