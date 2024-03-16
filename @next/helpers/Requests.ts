import axios from 'axios';
import { environment } from '@config';
import { getLocalStorage } from '@utils';
// export const BASE_URL: string = environment?.apiKey;

// Get request Function
export const apiGetRequest = (endpoint: string, token = null, props = {}) =>
  ApiRequest('GET', endpoint, token, props);

// Post request Function
export const apiPostRequest = (
  endpoint: string,
  payload: any,
  token = null,
  contentType?: string,
) => ApiRequest('POST', endpoint, token, { data: payload }, contentType);

// Patch request Function
export const apiPatchRequest = (
  endpoint: string,
  payload: any,
  token = null,
  contentType?: string,
) => ApiRequest('PATCH', endpoint, token, { data: payload }, contentType);

// Put Request Function
export const apiPutRequest = (
  endpoint: string,
  payload: any,
  token = null,
  contentType?: string,
) => ApiRequest('PUT', endpoint, token, { data: payload }, contentType);

// Delete Request Function
export const apiDeleteRequest = (endpoint: string, token = null, props = {}) =>
  ApiRequest('DELETE', endpoint, token, props);

// Api Request for all the api methods
export const ApiRequest = (
  method: string,
  endpoint: string,
  token: any = null,
  props: any = {},
  contentType: string = 'application/json',
) => {
  if (!token) {
    token = getLocalStorage('accessToken');
  }
  const params: any = {
    method,
    baseURL: "https://identity-gram-sales-site-fe.vercel.app/",
    url: endpoint,
    params:
      method.toLowerCase() === 'get' || method.toLowerCase() === 'delete'
        ? props
        : undefined,
    headers: {
      Accept: ['application/json', 'multipart/form-data'],
      'Content-Type': contentType,
    },
  };
  Object.assign(params, props);
  if (token) {
    params.headers.Authorization = `Bearer ${token}`;
  }
  return axios(params);
};
