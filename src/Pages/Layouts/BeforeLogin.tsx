import { FC } from 'react';
import styled from 'styled-components';

const BeforeLoginDiv = styled.div`
  width: 100vw;
  height: 100px;
  background-color: #f1f1f1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Logo = styled.div`
  width: 173px;
  color: #000000;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  margin-right: 467px;
`;

const LogIn = styled.button`
  width: 87px;
  box-sizing: border-box;
  font-style: normal;
  font-weight: 500;
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

const BeforeLogin: FC = () => {
  return (
    <>
      <BeforeLoginDiv>
        <div style={{ marginBottom: '14px' }} />
        <div
          style={{
            display: 'flex',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginBottom: '14px',
            alignContent: 'center',
          }}
        >
          <div style={{ width: '554px' }} />
          <Logo>TIME PIECE</Logo>
          <LogIn>Log in</LogIn>
        </div>
      </BeforeLoginDiv>
    </>
  );
};
export default BeforeLogin;
