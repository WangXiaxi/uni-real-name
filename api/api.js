import Request from '../utils/request.js'
import WxValidate from '../utils/validate.js'
import { getCaptcha } from '../utils/getCaptcha.js'

/**
 * @name    ApiModel封装
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2020-05-13 13:03:24
 * @version $Id$
 */

class ApiModel extends Request {
	// 登录接口
	login(params) {
		return this.post('/service/userToken', params)
	}
	// 绑定
	bindIDNum(params) {
		return this.post('/service/bindIDNum', params)
	}
	// 列表
	getBoundMembersList(params) {
		return this.get('/service/getBoundMembersList', params)
	}
	// 删除
	editBoundUser(params) {
		return this.post('/service/editBoundUser', params)
	}
	// 获取用户信息
	getMainUserInfo() {
		return this.get('/service/getMainUserInfo', {})
	}
	// 获取图形码
	getCaptcha() {
		return getCaptcha('getCaptcha')
	}
	// 获取验证码接口
	getCallCode(params) {
		return this.get('/service/getCallMobileCode', { ...params, noToken: true })
	}
	// 绑定
	bindCardInfo(params) {
		return this.post('/service/bindCardInfo', params)
	}
	/**
	 * 验证表单
	 */
	initValidate(rules, messages) {
		// 创建实例对象
		this.WxValidate = new WxValidate(rules, messages)
	}
}

const apiModel = new ApiModel()

export default apiModel
