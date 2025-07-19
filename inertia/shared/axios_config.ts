import axios from 'axios'
const token = localStorage.getItem('token')
// import { headers } from 'config'

const axiosInstance = axios.create({
  baseURL: '/', // Set the base URL for your API
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
})

// Add an interceptor to handle 403 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if ([401, 403].includes(error.response?.status)) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
