import axios from 'axios'

export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/h8',
    timeout: 10000
  })

  // axios拦截器
  // 1、请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.error(err)
  })
  // 2、响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
      console.error(err)
  })

  return instance(config)
}