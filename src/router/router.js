import Vue from 'vue'
import VueRouter from 'vue-router'

import Miste from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRating from '../pages/Shop/ShopRating/ShopRating.vue'

Vue.use(VueRouter)

export default new VueRouter({
	routes: [
		{
			path: '/msite',
			component: Miste,
			meta: {
				isShow: true
			}
		},
		{
			path: '/order',
			component: Order,
			meta: {
				isShow: true
			}
		},
		{
			path: '/profile',
			component: Profile,
			meta: {
				isShow: true
			}
		},
		{
			path: '/search',
			component: Search,
			meta: {
				isShow: true
			}
		},
		{
			path: '/login',
			component: Login
		},
    {
    	path: '/shop',
    	component: Shop,
      children: [
        {
        	path: '/shop/info',
        	component: ShopInfo
        },
        {
        	path: '/shop/goods',
        	component: ShopGoods
        },
        {
        	path: '/shop/rating',
        	component: ShopRating
        },
        {
        	path: '',
        	component: ShopGoods
        },
      ]
    },
		{
			path: '/',
			redirect: '/msite'
		},
	]
});
