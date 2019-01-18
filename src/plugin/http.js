import axios from 'axios'

let http = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

http.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    if (error?.response?.status === 401) {
      window.location = process.env.VUE_APP_LOGIN_URL
    } else {
      return Promise.reject(error)
    }
  }
)

const defaultConfig = {
  errorHandle(error, vue) {
    console.log(error)
    console.log(vue)
    if (vue) {
      let msg = error?.response?.data?.code
        ? `错误码:[${error.response.data.code}],错误描述:[[${
            error.response.data.message
          }].`
        : `[${error.message}].`
      msg = msg || '系统开小差.'
      vue.$alert(`${msg}`, '错误', {
        type: 'error'
      })
    }
  },
  param: {},
  timeout: 30000
}
function isFunction(callback) {
  return typeof callback === 'function'
}
const set = new Set()

function callRemoteByAjax(
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
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
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
  return callRemoteByAjax.call(this, 'get', url, {}, ...args)
}

export function $post(url, data, ...args) {
  let token = `${url}:${JSON.stringify(data)}`
  if (set.has(token)) {
    this.$message({
      showClose: true,
      message: '正在等待服务端响应，请勿重复提交',
      type: 'warning'
    })
    return
  }
  set.add(token)
  return callRemoteByAjax
    .call(this, 'post', url, data, ...args)
    .finally(() => set.delete(token))
}

export default {
  install(Vue, options) {
    console.log('Installed!', options)

    // Fetch
    Vue.prototype.$fetch = $get
    Vue.prototype.$post = $post
  }
}
