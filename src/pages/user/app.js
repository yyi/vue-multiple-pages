import Vue from 'vue'
import ElementUI from 'element-ui'
import '../../assets/element-variables.scss'
import '../../assets/style.css'
import App from './app.vue'
import http from '../../plugin/http'

Vue.use(ElementUI)

Vue.use(http)

new Vue({
  el: '#app',
  render: h => h(App)
})
