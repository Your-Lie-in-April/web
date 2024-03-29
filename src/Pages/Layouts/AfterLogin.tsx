import { FC, useState } from 'react';
import styled from 'styled-components';
import MyPageModal from '../Modal/MyPageModal';

const AfterLoginDiv = styled.div`
  width: 100%;
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

const MyPageDiv = styled.div`
  position: relative;
  bottom: 20px;
  justify-content: flex-end;
  flex-basis: 20%;
  white-space: nowrap;
`;

const MyPageBtn = styled.button`
  white-space: nowrap;
  box-sizing: border-box;

  box-sizing: border-box;
  font-weight: 500;
  font-size: 22px;

  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

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
        <div style={{ justifyContent: 'flex-start', flexBasis: '20%' }} />
        <Logo>TIME PIECE</Logo>
        <MyPageDiv>
          <MyPageBtn onClick={onSetIsMyPageModal}>My page</MyPageBtn>
          {isMyPageModal && (
            <MyPageModal onSetIsMyPageModal={onSetIsMyPageModal} />
          )}
        </MyPageDiv>
      </AfterLoginDiv>
    </>
  );
};
export default AfterLogin;
