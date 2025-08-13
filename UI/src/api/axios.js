import axios from 'axios'
import { logout } from '../redux/user/userSlice'
import {store} from '../redux/store'


const instance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api`,
    timeout: 60000
})

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
     store.dispatch(logout());
     console.log("invalid login");
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default instance