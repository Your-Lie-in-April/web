import { FC } from 'react';
import styled from 'styled-components';

const AfterLoginDiv = styled.div`
  width: 100%;
  height: 100px;
  background-color: #f1f1f1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Logo = styled.div`
  color: #000000;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  margin-right: 467px;
`;

const LogIn = styled.button`
  box-sizing: border-box;
  font-style: normal;
  font-weight: 800;
  font-size: 22px;

  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  &: focus {
    border: none;
    outline: none;
  }
`;

const AfterLogin: FC = () => {
  return (
    <AfterLoginDiv>
      <div style={{ marginBottom: '14px' }} />
      <div style={{ width: '554px' }} />
      <div style={{ display: 'flex', marginBottom: '14px' }}>
        <Logo>TIME PIECE</Logo>
        <LogIn>My page</LogIn>
      </div>
    </AfterLoginDiv>
  );
};
export default AfterLogin;
