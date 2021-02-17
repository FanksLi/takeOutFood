/**
 * 計算屬性
 * */
export default {
    totalMount (state){
        return state.carts.reduce( (total, food) => total + food.mount, 0)
    },
    totalPrice (state){
        return state.carts.reduce( (total, food) => total + food.price * food.mount, 0)
    },
    positiveSize (state){
      return state.rating.reduce((total, item) => total + (item.rateType === 0 ? 1:0), 0)
    }
}
