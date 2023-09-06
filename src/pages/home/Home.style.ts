import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #cae9ff;
`;

export const Title = styled.h1`
  margin-top: 30px;
  font-size: 30px;
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
  padding: 10px 0;
  margin: 10px 30px;
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

export const ClearButton = styled.button`
  width: 60px;
  height: 45px;
  color: gray;
  border: none;
  border-radius: 50px;
  cursor: pointer;
`;
export const SearchingButton = styled(BiSearch)`
  width: 60px;
  height: 60px;
  padding: 10px;
  margin: 10px;
  background-color: rgb(52, 121, 225);
  color: white;
  border: none;
  margin-right: 10px;
  border-radius: 50px;
  cursor: pointer;
  svg {
    fill: white;
  }
`;

export const RecommendList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 20px;
  background-color: rgb(208, 232, 253);
  border-radius: 10px;
  gap: 10px;
`;
export const RecommendedData = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 20px;
  padding: 10px;
  border-radius: 30px;
  &:last-of-type {
    margin-bottom: 20px;
  }
  &:first-of-type {
    margin-top: 20px;
  }
  font-weight: 500;

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
