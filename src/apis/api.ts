import axios from 'axios';
import { instance } from '../apis';
import { getCachedData, setCacheData } from '../utils';

export const getDataList = async (debouncedKeyword: string) => {
  try {
    const trimmedKeyword = debouncedKeyword.trim();
    const cachedData = await getCachedData(`/sick?q=${trimmedKeyword}`);

    if (cachedData) {
      return cachedData;
    }

    const { data } = await instance.get(`/sick?q=${trimmedKeyword}`);

    console.info('calling api');
    await setCacheData(`/sick?q=${trimmedKeyword}`, data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data.message);
    }
  }
};
