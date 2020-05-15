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

export const url_base = url_config
export const url_key = 'd9777f3ee4f9c8cba60a4536258fec14'
export const url_image = 'https://www.ehanone.com'
export const url_base_image = url_base_img
export const wxAppid = 'wx811be2658ad06045' // 微信appid
