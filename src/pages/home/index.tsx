import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';

import useDebounce from '../../hooks/useDebounce';
import { SickData } from '../../types';
import { instance } from '../../apis/axios';
import * as S from './Home.style';
import getCachedData from '../../utils/getCachedData';
import setCacheData from '../../utils/setCacheData';
import { ARROW_DOWN_CODE, ARROW_UP_CODE, TAB_CODE } from '../../constants';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [recommendList, setRecommendList] = useState<SickData[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const recommendedRef = useRef<(HTMLDivElement | null)[]>([]);
  const recommendedRefList = {
    current: recommendedRef.current?.filter(element => element !== null),
  };

  const debouncedKeyword = useDebounce(keyword, 250);

  const getRecommendList = useCallback(async () => {
    try {
      const cachedData = await getCachedData(`/sick?q=${debouncedKeyword.trim()}`);

      if (cachedData) {
        setRecommendList(cachedData);
        return;
      }

      const { data } = await instance.get(`/sick?q=${debouncedKeyword.trim()}`);

      console.info('calling api');
      await setCacheData(`/sick?q=${debouncedKeyword.trim()}`, data);
      setRecommendList(data);
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

  const handleRecommendedListKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.code === TAB_CODE || event.code === ARROW_DOWN_CODE) {
      event.preventDefault();
      recommendedRefList.current[index + 1]?.focus();
    }
    if (event.code === ARROW_UP_CODE) {
      if (index === 0) {
        inputRef.current?.focus();
      }
      recommendedRefList.current[index - 1]?.focus();
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent) => {
    if (
      (event.code === TAB_CODE && event.nativeEvent.isComposing === false) ||
      (event.code === ARROW_DOWN_CODE && event.nativeEvent.isComposing === false)
    ) {
      event.preventDefault();
      recommendedRefList.current[0]?.focus();
    }
  };

  const handleInputClear = () => {
    setKeyword('');
  };

  return (
    <S.Container>
      <S.Title>
        국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기
      </S.Title>
      <S.SearchWrapper>
        <S.Input
          type="text"
          value={keyword}
          ref={inputRef}
          onChange={e => setKeyword(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="질환명을 입력해 주세요."
        />
        <S.SearchButtonWrapper>
          {debouncedKeyword && recommendList && (
            <S.ClearButton onClick={handleInputClear}>X</S.ClearButton>
          )}
          <S.SearchingButton />
        </S.SearchButtonWrapper>
      </S.SearchWrapper>
      {debouncedKeyword && recommendList && (
        <S.RecommendList>
          <S.SubTitle>추천 검색어</S.SubTitle>
          {recommendList.length === 0 && <S.RecommendedData>검색어 없음</S.RecommendedData>}
          <S.RecommendWrapper>
            {recommendList.map((data, index) => (
              <S.RecommendedData
                key={data.sickCd}
                ref={element => {
                  recommendedRefList.current[index] = element;
                }}
                tabIndex={index}
                onKeyDown={event => handleRecommendedListKeyDown(event, index)}
              >
                <S.RecommendListIcon />
                <S.RecommendedListText>{data.sickNm}</S.RecommendedListText>
              </S.RecommendedData>
            ))}
          </S.RecommendWrapper>
        </S.RecommendList>
      )}
    </S.Container>
  );
};

export default Home;
