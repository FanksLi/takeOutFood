<template>
	<div class="loginContainer">
		<div class="loginInner">
			<div class="login_header">
				<h2 class="login_logo">硅谷外卖</h2>
				<div class="login_header_title">
					<a href="javascript:;" :class="cupMode ? 'on':''" @click='cupMode = true'>短信登录</a>
					<a href="javascript:;" :class="cupMode ? '':'on'" @click='cupMode = false'>密码登录</a> </div>
			</div>
			<div class="login_content">
				<form>
					<div :class="cupMode ? 'on':''">
						<section class="login_message"> <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
						<button class="get_verification" :class="{right_phone: isPhone}" style="outline: none; cursor: pointer;" :disabled='isPhone ? false:true'
						@click.prevent="getSendCode">{{codeTimes===0?'获取验证码':codeTimes+'s'}}</button>
						</section>
						<section class="login_verification"> <input type="tel" maxlength="8" placeholder="验证码" v-model="sendcode"> </section>
						<section class="login_hint"> 温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意 <a href="javascript:;">《用户服务协议》</a> </section>
					</div>
					<div :class="cupMode ? '':'on'">
						<section>
							<section class="login_message"> <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name"> </section>
							<section class="login_verification">
							<input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-if="!pwdShow">
							<input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>
								<div class="switch_button" @click="pwdShow = !pwdShow" :class="pwdShow ? 'off':'on'">
									<div class="switch_circle" :class="pwdShow ? '':'right'"></div>
									<span class="switch_text">{{pwdShow? '': 'abc'}}</span>
								</div>
							</section>
							<section class="login_message"> <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
							<img class="get_verification" src="http://localhost:4000/captcha" @click="getCaptcha" ref='captcha'>
							</section>
						</section>
					</div> <button class="login_submit" @click.prevent="login">登录</button>
				</form>
				<a href="javascript:;" class="about_us">关于我们</a>
			</div>
			<span href="javascript:" class="go_back" @click="$router.back()">
				<i class="iconfont icon-jiantou2"></i>
			</span>
		</div>
		<div  @click='colseTip' >
			<AlertTip :alertText='alertText' v-show='alertShow'/>
		</div>
	</div>
</template>
<script>
	import {mapState} from 'vuex'
	import {reqSendCode} from '../../api/index.js';
	import AlertTip from '../../components/AlertTip/AlertTip.vue'
	export default {
		data (){
			return {
				cupMode: false, //登录界面切换
				alertShow: false,//提示框切换
				pwdShow: true, //密码显示切换
				alertText:'', //提示框信息
				name: '', //用户名
				pwd: '', //密码
				captcha: '', //验证码
				sendcode: '', // 手机验证码
				phone: '', // 手机号
				codeTimes: 0 // 倒计时
			}
		},
		components: {
			AlertTip
		},
		computed: {
			...mapState(['userInfo', 'userCode']),
			isPhone (){
				console.log(/^1\d{10}/.test(this.phone))
				return /^1\d{10}/.test(this.phone)
			}
		},
		methods: {
			async getSendCode (){
				let times = 30
				let timeId = null
				if(this.codeTimes > 0){
					return
				}
        const result = await reqSendCode(this.phone)
        console.log(result)
				this.codeTimes = times
				timeId = setInterval(() => {
					this.codeTimes = times
						times = times -1
						console.log(times)
					if(times < 0){
						clearInterval(timeId)
						this.codeTimes = 0
            if(result.code === 1){
              this.alertShow = true
              this.alertText = result.msg
            }
					}
				},1000);


			},
			// 获取验证码
			getCaptcha (){
				this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+ Date.now()
			},
			// 弹窗信息
			getAlert (alerText){
				this.alertShow = true
				this.alertText = alerText
			},
			// 弹窗是否打开
			colseTip (){
				this.alertShow = false
				this.alertText = ''
			},
			// 登录验证
		 	async login (){
				if(this.cupMode){
          console.log(this.cupMode)
					// 电话不能为空
					if(this.phone === ''){
						this.getAlert('电话不能为空')
						return
					}
					// 验证码不能为空
					if(this.sendcode === ''){
						this.getAlert('验证码不能为空')
						return
					}
         await this.$store.dispatch('logUserPhone', {phone:this.phone,code:this.sendcode})
				}else{
          console.log(this.cupMode)
					// 用户名不能为空
					if(this.name === ''){
						this.getAlert('用户名不能为空')
						return
					}
					// 验证码不能为空
					if(this.code === ''){
						this.getAlert('验证码不能为空')
						return
					}
					// 密码不能为空
					if(this.pwd === ''){
						this.getAlert('密码不能为空')
						return
					}
          await this.$store.dispatch('logUserName',{name:this.name, pwd:this.pwd, captcha:this.captcha})
          }
          // 重新刷新验证码
          this.getCaptcha()
          return
			}
		},
		// 监视登录是否成功
		watch: {
			userCode: function(val){
				if(val.code === 1){
					this.alertShow = true
					this.alertText = val.msg
				}else if(val.code === 0 ){
					this.$router.push('/profile')
				}
			}
		}
	}
</script>
<style lang="stylus" scoped>
 @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999

</style>
