import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const instance = axios.create({
  baseURL: 'http://dev.holenet.net:5000',
})

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('credentials')
    if (token) config.headers.Authorization = token
    return config
  },
  (error) => Promise.reject(error)
)

export default instance
