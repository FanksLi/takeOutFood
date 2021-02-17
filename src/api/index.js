import ajax from './ajax.js'

const url = "api/"

export const reqAddress = (geohash) => ajax(`${url}/position/${geohash}`) // 获取地址信息
export const reqCategory = () => ajax(url+'/index_category') // 获取分类
export const reqShopList = ({latitude, longitude}) => ajax(url+'/shops', {latitude, longitude}) // 获取分类
export const reqSearchList = ({geohash, keyword}) => ajax(url+'/search_shops', {geohash, keyword}) // 根据关键字和经纬度获取商铺

export const reqUserNmae = ({name, pwd, captcha}) => ajax(url+'/login_pwd', {name, pwd, captcha}, 'POST') // 用户名登录
export const reqSendCode = (phone) => ajax(url+'/sendcode?phone='+phone) // 发送短信
export const reqPhpneLogin = ({phone, code}) => ajax(url+'/login_sms', {phone, code}, 'POST') // 手机号验证码登录
export const reqUserInfo = () => ajax(url+'/userinfo') // 根据回话获取用户信息
export const reqUserLogout = () => ajax(url+'/logout') // 根据回话获取用户信息

/*
  获取shop信息
*/
export const reqShopInfo = () => ajax('/info') // 根据回话获取用户信息
export const reqShopGoods = () => ajax('/goods') // 根据回话获取用户信息
export const reqShopRating = () => ajax('/ratings') // 根据回话获取用户信息
