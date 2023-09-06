import { CACHE_NAME } from '../constants';

const getCachedData = async (url: string) => {
  try {
    const cacheStorage = await caches.open(CACHE_NAME);
    const cachedResponse = await cacheStorage.match(url);

    if (!cachedResponse || !cachedResponse.ok) {
      return false;
    }

    return await cachedResponse.json();
  } catch (error) {
    console.error('Error while getting data from cache:', error);
    return false;
  }
};

export default getCachedData;
