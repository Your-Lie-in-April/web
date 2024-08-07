import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    width : 100vw;
    height: 100vh;
    margin: 0 auto;
    background-color: #ffffff;
    -ms-overflow-style: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    text-align: center;
    width: 500px;
    margin: 0 auto;
    top: 160px;
`;

export const SvgIcon = styled.svg`
    width: 160px;
    height: 160px;
    fill: none;
`;

export const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const ErrorTitle = styled.h1`
    color: #633ae2;
    font-weight: bold;
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-top: 30px;
`;

export const MainButton = styled.button`
    background-color: #ffffff;
    width: 135px;
    height: 45px;
    border-radius: 6px;
    color: #633ae2;
    border: 1px solid #633ae2;
    padding: 10px;
    padding-left: 20px;
    box-sizing: border-box;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

export const BackButton = styled.button`
    background-color: #633ae2;
    width: 140px;
    height: 45px;
    border-radius: 6px;
    color: #ffffff;
    padding: 10px;
    padding-left: 20px;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    text-align: center;
`;
