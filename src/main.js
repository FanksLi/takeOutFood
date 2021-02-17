import Vue from 'vue'
import App from './app.vue'
import router from './router/router.js'
import store from './store/index.js'
import {Button} from 'mint-ui'
import './mock/index'
import Vuelazyload from 'vue-lazyload'
import loading from './common/images/loading.c1486d8.gif'
import './filters'

Vue.component(Button.name, Button)
Vue.use(Vuelazyload, {
  loading
})

new Vue({
	el: '#app',
	render: c => c(App),
	router,
	store
});
