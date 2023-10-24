import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_BASE_URL = 'https://search-clinicaltrial-server.vercel.app/';

const axiosConfig: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  headers: {
    ContentType: 'application/json',
  },
};

export const instance: AxiosInstance = axios.create(axiosConfig);
