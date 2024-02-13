import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';

const api = axios.create({
  // TODO BaseURL, Authorization 설정
  headers: { 'Content-Type': 'application/json' },
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
  <T>(config: AxiosRequestConfig): Promise<T> => {
    return _axiosInstance({
      ...config,
      method: methodType,
    });
  };

export default {
  get: createApiMethod(api, HTTP_METHODS.GET),
  post: createApiMethod(api, HTTP_METHODS.POST),
  patch: createApiMethod(api, HTTP_METHODS.PATCH),
  put: createApiMethod(api, HTTP_METHODS.PUT),
  delete: createApiMethod(api, HTTP_METHODS.DELETE),
};
