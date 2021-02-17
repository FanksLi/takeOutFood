<template>
	<div>
		<router-view></router-view>
		<FooterGuide v-if='$route.meta.isShow' />
	</div>
</template>

<script>
	import FooterGuide from './components/FooterGuide/FooterGuide.vue'
	export default {
		components: {
			FooterGuide
		},
    mounted() {
      this.$store.dispatch('get_user_info')
    }
	}
</script>

<style>
</style>
