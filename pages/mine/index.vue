<template>
	<view class="content">
		<view class="top-part">
			<image class="header" :src="userInfo.head_ico ? `${url_base_image}/${userInfo.head_ico}` : '/static/icon_user@2x.png'"></image>
			<view class="name">用户名：{{ userInfo.username | fill }}</view>
			<view class="mobile">姓名：{{ userInfo.name | fill }}</view>
			<view class="mobile">手机号：{{ userInfo.mobile | fill }}</view>
			<view class="mobile">身份证号：{{ userInfo.id_num | fill }}</view>
		</view>

		<view class="nav-list">
			<view hover-class="none" class="nav-li" @click="navTo(item.url)" :class="'bg-'+item.color" v-for="(item,index) in elements"
			 :key="index">
				<view class="nav-title">{{item.title}}</view>
				<view class="nav-name">{{item.name}}</view>
				<text :class="'cuIcon-' + item.cuIcon"></text>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters,
		mapMutations
	} from 'vuex'
	import {
		url_base_image
	} from '../../common/config/index.js'
	export default {
		data() {
			return {
				url_base_image,
				elements: [{
						color: 'green',
						title: '账号列表',
						name: 'Account list',
						url: '/pages/mine/list'
					},
					{
						color: 'red',
						title: '添加账号',
						name: 'Add Account',
						url: '/pages/mine/add'
					},
					{
						color: 'cyan',
						title: '退出登录',
						name: 'Sign Out',
						url: 'goOut'
					}
				]
			}
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		onLoad() {
			this.goLogin(() => {
				if (!this.userInfo.card_num) {
					uni.redirectTo({
						url: '/pages/mine/bind'
					})
				}
			})
		},

		methods: {
			...mapActions(['goLogin']),
			...mapMutations(['logout']),
			navTo(url) {
				if (url === 'goOut') {
					this.logout()
					this.goLogin()
					return
				}
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss">
	.top-part {
		background-image: linear-gradient(to bottom, #00b38b 50%, #ffffff);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 550rpx;

		.header {
			width: 120rpx;
			height: 120rpx;
			border: 4rpx solid rgba(255, 255, 255, 0.6);
			border-radius: 50%;
			margin-top: -100rpx;
		}

		.name {
			color: #FFFFFF;
			font-size: 36rpx;
			margin-top: 10px;
			margin-bottom: 8rpx;
		}

		.mobile {
			color: rgba(255, 255, 255, 0.8);
			font-size: 28rpx;
			margin-top: 5px;
		}
	}

	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 40upx 0px;
		justify-content: space-between;
		margin-top: -60rpx;
	}

	.bg-cyan {
		background-color: #1cbbb4;
		color: #ffffff;
	}

	.bg-green {
		background-color: #39b54a;
		color: #ffffff;
	}

	.bg-red {
		background-color: #e54d42;
		color: #ffffff;
	}

	.nav-li {
		text-align: center;
		padding: 30upx;
		border-radius: 12upx;
		width: 100%;
		margin: 0 2.5% 40upx;
		background-image: url(/static/icobg.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10upx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}

	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}

	.nav-title {
		font-size: 32upx;
		font-weight: 300;
	}

	.nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}

	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}

	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}

	.nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}

	.text-light {
		font-weight: 300;
	}
</style>
