import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import useDebounce from '../../hooks/useDebounce';
import { SearchedSickResponse } from '../../types';
import { instance } from '../../apis/axios';
import * as S from './Home.style';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [recommendList, setRecommendList] = useState<SearchedSickResponse[]>([]);

  const debouncedKeyword = useDebounce(keyword, 250);

  const getRecommendList = useCallback(async () => {
    try {
      console.log('start');
      const response = await instance.get(`/sick?q=${debouncedKeyword}`);
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
      console.log(recommendList);
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

      <S.SuggestionList>
        <S.SubTitle>추천 검색어</S.SubTitle>
      </S.SuggestionList>
    </S.Container>
  );
};

export default Home;
