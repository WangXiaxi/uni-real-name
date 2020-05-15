<template>
	<view class="content">
		<empty v-if="loadingType === 'nomore' && list.length === 0" text="暂无相关记录"></empty>
		<view v-else>
			<view class="item red" v-for="(item, index) in list" :key="index">
				<image class="header" src="../../static/icon_user@2x.png"></image>
				<view class="info">
					<view class="name">{{ item.remain_balance | fill }}</view>
					<view class="phone">{{ item.remain_balance | fill }}</view>
				</view>
				<view class="type red">{{ item.remain_balance | fill }}</view>
				<image class="dele" src="../../static/dele.png" @click="dele(item.id)"></image>
			</view>
	
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import empty from '@/components/empty'
	import {
		mapActions,
	} from 'vuex'
	import apiModel from '../../api/api.js'
	export default {
		components: {
			uniLoadMore,
				empty
		},
		data() {
			return {
				list: [],
				page: 0,
				pages: 0, // 总页数
				loadingType: 'more' //加载更多状态
			}
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/mine/add');
			}
		},
		computed: {
		},
		onLoad() {
			this.goLogin()
			this.loadData()
		},
		//下拉刷新
		onPullDownRefresh() {
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom() {
			this.loadData();
		},
		methods: {
			...mapActions(['goLogin']),
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			dele(id) {
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				apiModel.editBoundUser({
					boundID: id
				}).then(res => {
					uni.hideLoading()
					this.$api.msg('删除成功！')
					this.loadData('refresh')
				})
			},
			loadData(type = 'add', loading) {
				if (this.loadingType === 'loading' && type !== 'refresh') return // 有数据在加载时 不进行请求
				//没有更多直接返回
				if (type === 'add') {
					if (this.loadingType === 'nomore') {
						return;
					}
					this.page = this.page + 1;
					this.loadingType = 'loading';
				} else {
					this.loadingType = 'loading';
				}

				if (type === 'refresh') {
					this.page = 1;
					this.list = [];
				}
				apiModel.getBoundMembersList({
					page: this.page,
					limit: 10
				}).then(res => {
					if (!res.data.data) {
						res.data.data = []
						res.data.totalPage = 0
					}
					this.list.push(...res.data.data)
					this.pages = res.data.totalPage
					uni.stopPullDownRefresh()
					this.loadingType = this.page >= this.pages ? 'nomore' : 'more'
				}).catch(() => {})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8F8;
	}
	.content {
		padding: 0 32rpx;
	}
	.item {
		border-radius: 10rpx;
		background: #ffffff;
		padding: 20rpx 32rpx;
		margin-top: 20rpx;
		position: relative;
		box-shadow: 0px 5px 16px 4px rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: center;
		align-items: center;
		.header {
			width: 80rpx;
			height: 80rpx;
			border-right: 50%;
			margin-right: 30rpx;
		}
		.dele {
			width: 32rpx;
			height: 32rpx;
			position: absolute;
			right: 32rpx;
			bottom: 34rpx;
		}
		.info {
			flex: 1;
		}
		.name {
			line-height: 60rpx;
			font-size: 40rpx;
			color: #606266;
			margin-bottom: 10rpx;
		}
		.phone {
			line-height: 60rpx;
			font-size: 30rpx;
			color: #aaaaaa;
		}
		.type {
			line-height: 60rpx;
			font-size: 30rpx;
			position: absolute;
			top: 20rpx;
			right: 32rpx;
			&.red {
				color: #F56C6C;
			}
			&.green {
				color: #67C23A;
			}
		}
	}
</style>
