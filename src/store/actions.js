/**
 * 调用mutations函数
 * */
 import {
   reqAddress,
   reqCategory,
   reqShopList,
   reqUserNmae,
   reqUserInfo,
   reqPhpneLogin,
   reqUserLogout,
   reqShopGoods,
   reqShopInfo,
   reqShopRating,
   reqSearchList
   } from '../api/index.js';
 import {
   GETADDRESS,
   GETCATEGORY,
   GETSHOPLIST,
   LOGUSERNAME,
   GET_USER_INFO,
   LOGUSERPONE,
   LOGOUT,
   GET_SHOP_GOODS,
   GET_SHOP_INFO,
   GET_SHOP_RATING,
   EDIT_FOODS_ADD,
   EDIT_FOODS_RED,
   EDIT_FOODS_CLEAR,
   GETSEARCHLIST
   } from './mutationTypes.js'

 export default {
	 // 异步获取地址信息
	async getAddress ({commit, state}){
		const geohash = state.latitude + ',' + state.longitude
		await reqAddress(geohash).then((res) => {
			 commit(GETADDRESS, res.data)
		})
	},
	// 异步获取商品分类
	async getCategory ({commit}){
		await reqCategory().then(res => {
			const catagorys = res.data
			commit(GETCATEGORY, catagorys)
		})
	},
	// 发送异步ajax请求
	async getShopList({commit,state}) {
		const latitude = state.latitude
		const longitude = state.longitude
	  const result = await reqShopList({latitude, longitude});
	  if (result.code === 0) {
	    const shoplist = result.data
	    commit(GETSHOPLIST, shoplist)
	  }
	},
	// 异步验证登录信息
	async logUserName({commit}, user) {
		const res = await reqUserNmae(user)
      console.log(res, 234)
			 commit(LOGUSERNAME, res)
	},
  // 异步验证手机登录信息
  async logUserPhone({commit}, data) {
  	await reqPhpneLogin(data).then((res) => {
      commit(LOGUSERPONE, res)
  	})
  },
  // 异步获取用户信息
  async get_user_info ({commit}){
  	await reqUserInfo().then(res => {
      const data = res.data
  		commit(GET_USER_INFO, data)
  	})
  },
  // 登出
  async logOut ({commit}){
  	await reqUserLogout().then(res => {
      if(res.code === 0){
        commit(LOGOUT)
      }
  	})
  },
  // 获取食品信息
  async getShopGoods ({commit}, callbalck){
  	const res = await reqShopGoods()
      if(res.code === 0){
        commit(GET_SHOP_GOODS, res.data)
      }
      callbalck && callbalck()
  },
  // 获取用户信息
  async getShopInfo ({commit}, callbalck){
  	const res = await reqShopInfo()
      if(res.code === 0){
        commit(GET_SHOP_INFO, res.data)
      }
      callbalck && callbalck()
  },
  // 获取评论信息
  async getShopRating ({commit}, callbalck){
  	await reqShopRating().then(res => {
      if(res.code === 0){
        commit(GET_SHOP_RATING, res.data)
      }
  	})
    callbalck && callbalck()
  },
  // 購物車
  editFoodsCount ({commit, state}, data){
    if(data.isAdd){
      commit(EDIT_FOODS_ADD, data.food)
    }else{
      commit(EDIT_FOODS_RED, data.food)
    }
  },
  // 清空購物車
  editFoodsClear ({commit}){
      commit(EDIT_FOODS_CLEAR)
  },
  // 获取搜素列表信息
  async getSearchList ({commit, state}, keyword){
    const geohash = state.latitude + ',' + state.longitude
  	const res = await reqSearchList({geohash, keyword})
    console.log(res)
      if(res.code === 0){
        commit(GETSEARCHLIST, res.data)
      }
  },
 }
