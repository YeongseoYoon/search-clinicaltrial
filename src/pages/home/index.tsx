import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import useDebounce from '../../hooks/useDebounce';
import { SickData } from '../../types';
import { instance } from '../../apis/axios';
import * as S from './Home.style';
import getCachedData from '../../utils/getCachedData';
import setCacheData from '../../utils/setCacheData';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [recommendList, setRecommendList] = useState<SickData[]>([]);

  const debouncedKeyword = useDebounce(keyword, 250);

  const getRecommendList = useCallback(async () => {
    try {
      const cachedData = await getCachedData(`/sick?q=${debouncedKeyword.trim()}`);
      if (cachedData) {
        return cachedData;
      }
      const response = await instance.get(`/sick?q=${debouncedKeyword.trim()}`);
      console.info('calling api');
      await setCacheData(`/sick?q=${debouncedKeyword.trim()}`, response);
      setRecommendList(response?.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  }, [debouncedKeyword]);

  useEffect(() => {
    if (debouncedKeyword.length > 0) {
      getRecommendList();
    }
  }, [debouncedKeyword]);

  return (
    <S.Container>
      <S.Title>
        국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기
      </S.Title>
      <S.SearchWrapper>
        <S.Input
          type="text"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="질환명을 입력해 주세요."
        />
        <S.ClearButton>X</S.ClearButton>
        <S.SearchingButton />
      </S.SearchWrapper>

      <S.RecommendList>
        <S.SubTitle>추천 검색어</S.SubTitle>
      </S.RecommendList>
    </S.Container>
  );
};

export default Home;
