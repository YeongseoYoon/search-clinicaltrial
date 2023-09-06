import isCachedDataExpired from './isCachedDataExpired';
import { CACHE_NAME } from '../constants';

const getCachedData = async (url: string) => {
  const cacheStorage = await caches.open(CACHE_NAME);
  const cachedResponse = await cacheStorage.match(url);

  if (cachedResponse) {
    if (!isCachedDataExpired(cachedResponse)) {
      return cachedResponse;
    }
    await cacheStorage.delete(url);
    return;
  }
  return;
};
export default getCachedData;
