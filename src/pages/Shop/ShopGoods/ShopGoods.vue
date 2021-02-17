<template>
  <div class="goods">
    <div class="menu-wrapper" ref='menuMax'>
      <ul ref='menuMin'>
        <!-- current -->
        <li class="menu-item" :class="{current: index === currentInex}" style="pointer-events: auto;" v-for="(item, index) in goods" :key='index' @click="getMuenInden(index)">
          <span class="text bottom-border-1px">
            <img :src="item.icon" :class="item.icon ? 'icon':''">
           {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul ref='foodUl'>
        <li class="food-list-hook" style="pointer-events: auto;" v-for="(good, index) in goods" :key='index'>
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key='index'>
              <div class="icon" @click="toggleFood(food)"><img width="57" height="57" :src="food.icon"></div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra"><span class="count">月售{{food.sellCount}}份</span> <span>好评率{{food.rating}}%</span></div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <CartControl :food = 'food' />
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ShopCart />
    <Food :food='food' ref='Food'/>
  </div>
</template>

<script>
  import CartControl from '../../../components/CartControl/CartControl.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'
  import Food from '../../../components/Food/Food.vue'
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  export default {
    data (){
      return {
        scrollY: 0,
        tops: [],
        food: {},
      }
    },
    components: {
      ShopCart,
      CartControl,
      Food
    },
    computed: {
      ...mapState(['goods']),
      currentInex (){
        const {scrollY, tops} = this
        const index = tops.findIndex((top, index) => {
            return scrollY >= top && scrollY < tops[index+1]
        })
        // if(index > 3){
        //   this.menuScrol.scrollTo(0, -100, 300)
        // }
        this.menuScroll (index)
        return index
      }
    },
    mounted() {
      // 初始化
      this.$store.dispatch('getShopGoods', () => {
          this.$nextTick(() => {
            this._initScroll()
            this._initTops()
          })
      })
    },
    methods: {
      _initScroll (){
        this.foodsScroll = new BScroll('.foods-wrapper', {
           probeType: 2,
           click: true
         })
        this.menuScrol = new BScroll('.menu-wrapper', {
           click: true
         })
         // 监听卷曲
        this.foodsScroll.on('scroll', ({x,y}) => {
          this.scrollY = Math.abs(y)
            // console.log(x, y)
         })
         // 卷曲结束
         this.foodsScroll.on('scrollEnd', ({x,y}) => {
           this.scrollY = Math.abs(y)
             // console.log(x, y)
          })
      },
      _initTops (){
        // 初始化
        const tops = []
        let top = 0
        tops.push(top)
         // 获取所有li
         const lis = this.$refs.foodUl.getElementsByClassName('food-list-hook')
         // 获取每个li的高度添加到数组中
         Array.prototype.slice.call(lis).forEach(item => {
            top += item.clientHeight
            tops.push(top)
         })
         this.tops = tops
         console.log(tops)
      },
      getMuenInden (index){
        const scrolly = this.tops[index]
        this.scrollY = scrolly
        this.foodsScroll.scrollTo(0, -this.scrollY, 300)
        console.log(123)
      },
      // item卷曲
      menuScroll (index){
        this.$nextTick(() => {
           const max = this.$refs.menuMax.clientHeight
             const min = this.$refs.menuMin.clientHeight
             const list = this.$refs.menuMin.firstElementChild
             const length = this.$refs.menuMin.children.length-1
             if(max < min){
               const h = list.clientHeight
               if(index > 2){
                let srcollY = h * (index / 2)
                if(srcollY < min - max + h){
                  this.menuScrol.scrollTo(0, -srcollY, 300)
                }
               }
               if(index <= 2){
                  this.menuScrol.scrollTo(0, -0, 300)
               }
               console.log(index)
             }
        })
      },
      toggleFood (food){
         this.food = food
         this.$refs.Food.toggleShow()
      }
    },
    // 清空购物车
    beforeDestroy() {
      this.$store.dispatch('editFoodsClear')
    }
  }
</script>

<style lang="stylus" scoped>
 @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
