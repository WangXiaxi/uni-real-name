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
	bindIDNum() {
		return this.get('/service/bindIDNum', {})
	}
	// 列表
	getBoundMembersList() {
		return this.get('/service/getBoundMembersList', {})
	}
	// 列表
	editBoundUser() {
		return this.get('/service/editBoundUser', {})
	}
	// 获取用户信息
	getMainUserInfo() {
		return this.get('/service/getMainUserInfo', {})
	}
	// 获取图形码
	getCaptcha() {
		return getCaptcha('getCaptcha')
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
