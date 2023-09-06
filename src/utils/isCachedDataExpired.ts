import { CUSTOM_HEADER_FETCH_DATE, CACHED_DATA_EXPIRE_TIME } from '../constants';

const isCachedDataExpired = async (cacheResponse: Response) => {
  const cachedDate = cacheResponse.headers.get(CUSTOM_HEADER_FETCH_DATE);

  if (!cachedDate) return;

  const fetchDate = new Date(cachedDate).getTime();
  const today = new Date().getTime();

  return today - fetchDate > CACHED_DATA_EXPIRE_TIME;
};

export default isCachedDataExpired;
