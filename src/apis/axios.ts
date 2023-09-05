import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_BASE_URL = 'http://localhost:4000';

const axiosConfig: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  headers: {
    ContentType: 'application/json',
  },
};

export const instance: AxiosInstance = axios.create(axiosConfig);
