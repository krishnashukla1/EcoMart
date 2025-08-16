// FILE: src/axios.js (optional, but for interceptors)
import axios from 'axios'

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Handle unauthorized, e.g., logout
    }
    return Promise.reject(error)
  }
)

export default axios