import axios from 'axios'

let http = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

http.interceptors.response.use(res => {
  return res.data
})

const defaultConfig = {
  errorHandle(error, vue) {
    console.log(error)
    console.log(vue)
    if (vue)
      vue.$alert('系统开小差', '提示', {
        type: 'error'
      })
  },
  param: {},
  timeout: 30000
}
function isFunction(callback) {
  return typeof callback === 'function'
}
const set = new Set()

function callremote(
  method,
  url,
  data = {},
  callback,
  {
    errorHandle = defaultConfig.errorHandle,
    param = defaultConfig.param,
    timeout = defaultConfig.timeout
  } = defaultConfig
) {
  return http({
    method: method,
    data: data,
    url: url,
    params: param,
    timeout: timeout
  })
    .then(res => {
      if (isFunction(callback)) return callback(res)
      return res
    })
    .catch(error => {
      if (errorHandle) errorHandle(error, this)
    })
}

export function $get(url, ...args) {
  return callremote('get', url, {}, ...args)
}

export function $post(url, data, ...args) {
  let token = `${url}:${JSON.stringify(data)}`
  if (set.has(token)) return
  set.add(token)
  return callremote('post', url, data, ...args).finally(() => set.delete(token))
}

export default {
  install(Vue, options) {
    console.log('Installed!', options)

    // Fetch
    Vue.prototype.$fetch = $get
    Vue.prototype.$post = $post
  }
}
