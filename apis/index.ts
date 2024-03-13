import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';

import { reAuthorize } from './member';

export const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1` || '';

export const instance = axios.create({
  // TODO BaseURL, Authorization 설정
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

const getToken = (url = '') => {
  if (url === '/members/reissue') {
    return `Bearer ${localStorage.getItem('refreshToken')}`;
  } else {
    return localStorage.getItem('accessToken');
  }
};

instance.interceptors.request.use(config => {
  const token = getToken(config.url);

  config.headers.Authorization = token || '';

  return config;
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const { config, response } = error;

    if (
      config.url === '/members/reissue' ||
      response?.status !== 401 ||
      config.sent
    ) {
      return Promise.reject(error);
    }

    const { accessToken, refreshToken } = await reAuthorize({
      refreshToken: localStorage.getItem('refreshToken') || '',
    });

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    config.headers.Authorization = accessToken;

    return axios(config);
  },
);

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
