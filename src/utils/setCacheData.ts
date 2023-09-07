import { CACHE_NAME, CUSTOM_HEADER_FETCH_DATE } from '../constants';
import { SickData } from '../types';

const setCacheData = async (url: string, data: SickData[]) => {
  const cacheStorage = await caches.open(CACHE_NAME);
  const response = new Response(JSON.stringify(data));

  const clonedResponse = response.clone();
  const newBody = await clonedResponse.blob();
  const newHeaders = new Headers(clonedResponse.headers);

  newHeaders.append(CUSTOM_HEADER_FETCH_DATE, new Date().toISOString());

  const newResponse = new Response(newBody, {
    status: clonedResponse.status,
    statusText: clonedResponse.statusText,
    headers: newHeaders,
  });

  cacheStorage.put(url, newResponse);
};
export default setCacheData;
