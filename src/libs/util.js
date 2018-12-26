import axios from 'axios'

const Util = {
  apiPath: 'http://localhost:3000'
}

// Ajax 通用配置
Util.ajax = axios.create({
  baseURL: Util.apiPath
})

// 添加响应拦截器
Util.ajax.interceptors.response.use(res => {
  return res.data
})
const defualtConfig = {
  errorHandle(error, vue) {
    console.log(error)
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
  { errorHandle, param, timeout } = defualtConfig
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

export default Util
