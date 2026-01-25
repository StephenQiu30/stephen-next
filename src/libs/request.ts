import axios from "axios";

/**
 * 创建 Axios 示例
 */
const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

/**
 * 创建请求拦截器
 */
request.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("stephen-next-token");
    if (token) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    // 请求执行前执行
    return config;
  },
  function (error) {
    // 处理请求错误
    return Promise.reject(error);
  },
);

/**
 * 创建响应拦截器
 */
request.interceptors.response.use(
  // 2xx 响应触发
  function (response) {
    // 处理响应数据
    const { data } = response;
    return data;
  },
  // 非 2xx 响应触发
  function (error) {
    // 处理响应错误
    return Promise.reject(error);
  },
);

export default request;
