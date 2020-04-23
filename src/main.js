import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

/**
 * 事件总线，方便用于子孙组件访问祖父组件
 * 祖父组件中：this.$bus.$on('event',()=>{})
 * 子孙组件中：this.$bus.$emit('event')
 */
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
