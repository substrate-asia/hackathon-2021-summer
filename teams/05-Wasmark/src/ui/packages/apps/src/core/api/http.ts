import type { Observable } from 'rxjs';
import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { from } from 'rxjs';

export interface Res<T> {
  code?: number;
  message: string;
  data: T;
}

const service = axios.create({
  timeout: 15000,
  withCredentials: false,
})

service.interceptors.response.use(
  (response: AxiosResponse<Res<any>>) => {
    return Promise.resolve(response.data.data);
  },
  err => {
    console.log('响应错误拦截：', err);

    return Promise.reject(err);
  },
)

export function httpGet<T>(
  url: string,
  config?: AxiosRequestConfig,
): Observable<T> {
  return from(service.get(
    url,
    config,
  )) as unknown as Observable<T>;
}

export function httpPost<T>(
  url: string,
  data: any = {},
  config?: AxiosRequestConfig,
): Observable<T> {
  return from(service.post(
    url,
    data,
    config,
  )) as unknown as Observable<T>;
}

export function httpPut<T>(
  url: string,
  data: any = {},
  config?: AxiosRequestConfig,
): Observable<T> {
  return from(service.put(
    url,
    data,
    config,
  )) as unknown as Observable<T>;
}

export function httpDel<T>(
  url: string,
  config?: AxiosRequestConfig,
): Observable<T> {
  return from(service.delete(
    url,
    config,
  )) as unknown as Observable<T>;
}
