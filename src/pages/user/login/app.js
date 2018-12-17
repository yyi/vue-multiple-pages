import Vue from 'vue'
import ElementUI from 'element-ui'
import '../../../assets/element-variables.scss'
import App from './app.vue'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
