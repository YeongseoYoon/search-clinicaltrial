import { AxiosResponse } from 'axios';
import { CACHE_NAME } from '../constants';

const setCacheData = async (url: string, response: AxiosResponse) => {
  const cacheStorage = await caches.open(CACHE_NAME);
  const init: ResponseInit = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'content-length': '2',
    },
  };
  const clonedResponse = new Response(JSON.stringify(response), init);
  console.log('여기');
  await cacheStorage.put(url, clonedResponse);
};

export default setCacheData;
