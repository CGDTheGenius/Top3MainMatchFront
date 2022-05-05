import axios from 'axios'

axios.defaults.withCredentials = true

const instance = axios.create({
  baseURL: 'http://dev.holenet.net:5000',
  withCredentials: true,
})

export default instance
