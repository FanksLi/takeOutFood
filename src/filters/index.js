import Moment from 'moment'
import Vue from 'vue'

Vue.filter('getDate', (val) => {
  return Moment(val).format('YYYY-MM-DD HH:mm:ss')
})
