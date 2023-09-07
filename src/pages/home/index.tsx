import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';

import { useDebounce } from '../../hooks';
import { SickData } from '../../types';
import { ARROW_DOWN_CODE, ARROW_UP_CODE, TAB_CODE } from '../../constants';
import { getDataList } from '../../apis';

import * as S from './Home.style';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [recommendList, setRecommendList] = useState<SickData[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const recommendedRef = useRef<HTMLDivElement[]>([]);

  const debouncedKeyword = useDebounce(keyword, 250);

  const isEmpty = recommendList.length === 0;
  const isVisible = debouncedKeyword && !isEmpty;

  const getRecommendList = useCallback(async () => {
    try {
      const data = await getDataList(debouncedKeyword);
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
      recommendedRef.current[index + 1]?.focus();
    }
    if (event.code === ARROW_UP_CODE) {
      if (index === 0) {
        inputRef.current?.focus();
      }
      recommendedRef.current[index - 1]?.focus();
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent) => {
    if (
      (event.code === TAB_CODE && event.nativeEvent.isComposing === false) ||
      (event.code === ARROW_DOWN_CODE && event.nativeEvent.isComposing === false)
    ) {
      event.preventDefault();
      recommendedRef.current[0]?.focus();
    }
  };

  const handleInputClear = () => {
    setKeyword('');
  };
  const setRecommendListRef = (element: HTMLDivElement | null, index: number) => {
    if (!element) {
      return;
    }
    recommendedRef.current[index] = element;
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
          {isVisible && <S.ClearButton onClick={handleInputClear}>X</S.ClearButton>}
          <S.SearchingButton />
        </S.SearchButtonWrapper>
      </S.SearchWrapper>
      {isVisible && (
        <S.RecommendList>
          <S.SubTitle>추천 검색어</S.SubTitle>
          {isEmpty && <S.RecommendedData>검색어 없음</S.RecommendedData>}
          <S.RecommendWrapper>
            {recommendList.map((data, index) => (
              <S.RecommendedData
                key={data.sickCd}
                ref={element => setRecommendListRef(element, index)}
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
