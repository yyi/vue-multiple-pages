import Vue from 'vue'
import ElementUI from 'element-ui'
import '../../../assets/element-variables.scss'
import App from './app.vue'

Vue.use(ElementUI)

let vm1 = new Vue({
  el: '#app',
  render: h => h(App)
})
setTimeout(() => {
  let vm2 = new Vue(App).$mount('#app2').login()
  console.log(vm1 !== vm2)
}, 5000)
