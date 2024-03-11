import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';

export const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1` || '';

export const instance = axios.create({
  // TODO BaseURL, Authorization 설정
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers['Authorization'] = `${accessToken}`;
  }

  return config;
});

const HTTP_METHODS = {
  GET: 'get',
  POST: 'post',
  PATCH: 'patch',
  PUT: 'put',
  DELETE: 'delete',
} as const;

const createApiMethod =
  (_axiosInstance: AxiosInstance, methodType: Method) =>
  <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return _axiosInstance({
      ...config,
      method: methodType,
    });
  };

const api = {
  get: createApiMethod(instance, HTTP_METHODS.GET),
  post: createApiMethod(instance, HTTP_METHODS.POST),
  patch: createApiMethod(instance, HTTP_METHODS.PATCH),
  put: createApiMethod(instance, HTTP_METHODS.PUT),
  delete: createApiMethod(instance, HTTP_METHODS.DELETE),
};

export default api;
