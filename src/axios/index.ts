import axios from 'axios';

const service = axios.create({
  // timeout: 10000, // 请求超时时间
  baseURL: import.meta.env.VITE_APP_BASE_API // 请求URL
});

// request拦截器
service.interceptors.request.use(
  // 请求配置
  request => {
    // 添加请求头
    request.headers['Authorization'] = 'Bearer ' + useStorage.get('token');
    request.headers['Content-Type'] = 'application/json; charset=UTF-8';
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

// response拦截器
service.interceptors.response.use(
  // 响应配置
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
