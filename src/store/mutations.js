/**
 * 管理state函数方法
 * */
 import Vue from 'vue'
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
	 // 获取地址信息
	 [GETADDRESS] (state, data){
		 state.Address = data
	 },
	 // 获取商品分类信息
	 [GETCATEGORY] (state, data){
	 	state.Category = data
	 },
	 // 获取商品列表信息
	 [GETSHOPLIST] (state, data){
	 	state.ShopList = data
	 },
	 // 验证登录
	 [LOGUSERNAME] (state, res){
	 	state.userInfo = res.data
    state.userCode = res || {}
    console.log(res, 'username')
	 },
   // 手机验证验证登录
   [LOGUSERPONE] (state, res){
   	state.userInfo = res.data
     state.userCode = res || {}
     console.log(res, 'userphong')
   },
   // 获取用户信息
   [GET_USER_INFO] (state, info){
   	state.userInfo = info || {}
     state.userCode = info || {}
   },
   // 登出
   [LOGOUT] (state){
   	state.userInfo = {}
    state.userCode = {}
   },
   // 获取食品信息
   [GET_SHOP_GOODS] (state, goods){
     state.goods = goods || []
   },
   // 获取商家信息
   [GET_SHOP_INFO] (state, info){
     state.info = info || {}
   },
   // 获取评论信息
   [GET_SHOP_RATING] (state, rating){
     state.rating = rating || []
   },
   // 購物車添加
   [EDIT_FOODS_ADD] (state, food){
     if(!food.mount){
        // food.mount = 1
         Vue.set(food, 'mount', 1)
        state.carts.push(food)
     }else{
       food.mount ++
     }
   },
   // 購物車減少
   [EDIT_FOODS_RED] (state, food){
     if(food.mount){
        food.mount--
     }
     if(food.mount === 0){
        state.carts.splice(state.carts.indexOf(food), 1)
     }
   },
   // 清空購物車
   [EDIT_FOODS_CLEAR] (state){
        state.carts.forEach(item => {
          item.mount = 0
        })
        state.carts = []
   },
   // 获取搜索列表信息
   [GETSEARCHLIST] (state, data){
     state.searchList = data
   }
 }
