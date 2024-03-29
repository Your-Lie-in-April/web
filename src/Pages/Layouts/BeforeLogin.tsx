import { FC } from 'react';
import styled from 'styled-components';

const BeforeLoginDiv = styled.div`
  width: 100vw;
  height: 100px;
  background-color: #f1f1f1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  z-index: 1;

  color: #000000;
  font-style: normal;
`;

const Logo = styled.div`
  position: relative;
  bottom: 14px;
  justify-content: center;
  align-item: center;

  white-space: nowrap;

  font-weight: 700;
  font-size: 32px;
`;

const LogIn = styled.button`
  position: relative;
  bottom: 21px;
  justify-content: flex-end;
  flex-basis: 30%;
  white-space: nowrap;
  font-size: 22px;
  font-weight: 500;
  box-sizing: border-box;

  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const BeforeLogin: FC = () => {
  return (
    <BeforeLoginDiv>
      <div style={{ justifyContent: 'flex-start', flexBasis: '30%' }} />
      <Logo>TIME PIECE</Logo>
      <LogIn>Log in</LogIn>
    </BeforeLoginDiv>
  );
};
export default BeforeLogin;
