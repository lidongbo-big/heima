import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截
request.interceptors.request.use(function (config) {
  const user = JSON.parse(window.localStorage.getItem('user'))

  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // Do something before request is sent
  return config
},
function (error) {
  // Do something with request error
  return Promise.reject(error)
})
export default request
