import axios from 'axios'

const Util = {
  apiPath: process.env.VUE_APP_API_URL
}

// Ajax 通用配置
Util.ajax = axios.create({
  baseURL: Util.apiPath
})

// 添加响应拦截器
Util.ajax.interceptors.response.use(res => {
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
Util.get = (
  vue,
  url,
  callback,
  {
    errorHandle = defaultConfig.errorHandle,
    param = defaultConfig.param,
    timeout = defaultConfig.timeout
  } = defaultConfig
) => {
  Util.ajax
    .get(url, {
      params: param,
      timeout: timeout
    })
    .then(res => callback(res))
    .catch(error => {
      if (errorHandle) errorHandle(error, vue)
    })
}

const set = new Set()

Util.post = (
  vue,
  url,
  data = {},
  callback,
  {
    errorHandle = defaultConfig.errorHandle,
    param = defaultConfig.param,
    timeout = defaultConfig.timeout
  } = defaultConfig
) => {
  let token = `${url}:${JSON.stringify(data)}`
  console.log(token)
  if (set.has(token)) return
  set.add(token)
  Util.ajax({
    method: 'post',
    url: url,
    data: data,
    params: param,
    timeout: timeout
  })
    .then(res => callback(res))
    .catch(error => {
      if (errorHandle) errorHandle(error, vue)
    })
    .finally(() => set.delete(token))
}

export default Util
