import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #cae9ff;
  position: relative;
`;

export const Title = styled.h1`
  margin: 30px 0px;
  font-size: 25px;
  text-align: center;
  font-weight: bold;
`;

export const SearchWrapper = styled.div`
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 2px;
  border-radius: 50px;
`;

export const Input = styled.input`
  width: auto;
  margin: 0px 20px;
  border: none;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 4px solid transparent;
  &::placeholder {
    vertical-align: middle;
    font-weight: 600;
    color: #b5bcc2;
  }
  &:focus {
    caret-color: rgb(25, 118, 210);
    outline: none;
    &::placeholder {
      color: transparent;
    }
  }
`;
export const SearchButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ClearButton = styled.button`
  width: 30px;
  height: 30px;
  font-size: 15px;
  color: white;
  background-color: #80808087;
  border: none;
  border-radius: 50px;
  cursor: pointer;
`;
export const SearchingButton = styled(BiSearch)`
  width: 40px;
  height: 40px;
  padding: 10px;
  margin: 10px;
  background-color: rgb(52, 121, 225);
  color: white;
  border: none;
  margin-right: 10px;
  border-radius: 50px;
  cursor: pointer;
`;

export const RecommendWrapper = styled.div`
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 8px;
`;

export const RecommendList = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 20px;
  background-color: white;
  border-radius: 10px;
`;

export const RecommendListIcon = styled(BiSearch)`
  width: 15px;
  height: 15px;
  border: none;
  cursor: pointer;
  color: gray;
  flex-shrink: 0;
`;

export const RecommendedListText = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
export const RecommendedData = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 20px;
  padding: 10px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:last-of-type {
    margin-bottom: 10px;
  }
  &:first-of-type {
    margin-top: 10px;
  }

  &:focus {
    outline: none;
    background-color: rgb(52, 121, 225);
    color: white;
    svg {
      fill: white;
    }
  }
`;
export const SubTitle = styled.p`
  margin: 20px 0 0 20px;
  font-size: 13px;
  color: gray;
`;
