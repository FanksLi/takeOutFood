import Mock from 'mockjs'
import data from './data.json'

// 商家信息
Mock.mock('/info', {code:0, data: data.info})
// 食物信息
Mock.mock('/goods', {code:0, data: data.goods})
// 用户评论信息
Mock.mock('/ratings', {code:0, data: data.ratings})
