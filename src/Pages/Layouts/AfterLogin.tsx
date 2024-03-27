import { FC, useState } from 'react';
import styled from 'styled-components';
import MyPageModal from '../ProjectPage/Modal/MyPageModal';

const AfterLoginDiv = styled.div`
    width: 1920px;
    height: 100px;
    background-color: #f1f1f1;
    display: flex;
    align-items: center;
`;

const Logo = styled.div`
  width: 173px;
  height: 38px;
  color: #000000;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 14px;
`;

const LogIn = styled.button`
  position: absolute;
  right: 319.5px;
  width: 87px;
  height: 26px;
  box-sizing: border-box;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;

  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  margin: auto;
  margin-bottom: 20px;

  &:focus {
    border: none;
    outline: none;
  }
`;

const AfterLogin: FC = () => {
  const [isMyPageModal, setIsMyPageModal] = useState(false);
  const onSetIsMyPageModal = () => {
    setIsMyPageModal((prev) => !prev);
  };
  return (
    <>
      <AfterLoginDiv>
        <Logo>TIME PIECE</Logo>
        <LogIn onClick={onSetIsMyPageModal}>My page</LogIn>
        {isMyPageModal && (
          <MyPageModal onSetIsMyPageModal={onSetIsMyPageModal} />
        )}
      </AfterLoginDiv>
    </>
  );
};
export default AfterLogin;
