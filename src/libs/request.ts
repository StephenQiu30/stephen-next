import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

/**
 * 创建 Axios 实例
 */
const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

/**
 * 创建请求拦截器
 */
instance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("stephen-next-token")
        : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
instance.interceptors.response.use(
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

/**
 * 封装request函数，添加泛型支持
 * 支持两种调用方式：
 * 1. request<T>(url, config)
 * 2. request<T>(config)
 */
const request = async <T = never>(
  urlOrConfig: string | AxiosRequestConfig,
  config?: AxiosRequestConfig,
): Promise<T> => {
  if (typeof urlOrConfig === "string") {
    // request(url, config) 形式
    return (await instance({ ...config, url: urlOrConfig })) as Promise<T>;
  } else {
    // request(config) 形式
    return (await instance(urlOrConfig)) as Promise<T>;
  }
};

export default request;
