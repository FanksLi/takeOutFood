<template>
	<div class="star" :class="'star-'+size">
		<span class="star-item" v-for="(sc, index) in starNum" :key='index' :class="sc"></span>
	</div>
</template>

<script>
	const STAR_ON = 'on'
	const STAR_HALF = 'half'
	const STAR_OFF = 'off'
	export default {
		props: {
			mark: Number,
			size: Number
		},
		computed: {
			starNum (){
				const {mark} = this
				const arr = []
				const downMark = Math.floor(mark)
				for(let i =0; i < downMark; i++){
					arr.push(STAR_ON)
				}
				if(mark*10 - downMark*10 > 5){
					arr.push(STAR_HALF)
				}
				while(arr.length < 5){
					arr.push(STAR_OFF)
				}
				return arr
			}
		}
	}
</script>

<style lang="stylus" scoped>
 .star 
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right: 0
      &.on
       background-image url(images/stars/star48_on@2x.png)
      &.half
       background-image url(images/stars/star48_half@2x.png)
      &.off
       background-image url(images/stars/star48_off@2x.png)
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        background-image url('./images/stars/star36_on@2x.png')
      &.half
        background-image url('./images/stars/star36_half@2x.png')
      &.off
        background-image url('./images/stars/star36_off@2x.png')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
       background-image url(./images/stars/star24_on@2x.png)
      &.half
       background-image url(./images/stars/star24_half@2x.png)
      &.off
       background-image url(./images/stars/star24_off@2x.png)
</style>
