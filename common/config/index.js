/**
 * @name 路径配置 h5本地有配代理，基础路径为空即可
 */
let url_config = ''
let url_base_img = ''

// #ifdef H5
let origin = window.location.origin
url_config = origin
url_base_img = origin
// #endif

// #ifdef MP-WEIXIN
url_config = 'https://hzyh.ehanone.com'
url_base_img = 'https://hzyh.ehanone.com'
// #endif

export const url_base = url_config
export const url_key = 'd9777f3ee4f9c8cba60a4536258fec14'
export const url_image = 'https://www.ehanone.com'
export const url_base_image = url_base_img
export const wxAppid = 'wx052134fca36c2f68' // 微信appid
