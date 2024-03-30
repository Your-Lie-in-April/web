import styled from 'styled-components';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useState } from 'react';

const EditMemberBtn = styled.button`
  position: relative;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &: focus {
    outline: none;
  }
`;

const CommonText = styled.div`
  color: #7d7d7d;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
`;

const MoreDetailDiv = styled.div`
  width: 88px;
  height: 38px;

  position: absolute;
  top: 32px;
  right: -55px;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  box-sizing: border-box;

  border-radius: 6px;
  background: #ffffff;
  color: #7d7d7d;

  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
`;

const MoreBtn = () => {
  const [isMoreClick, setIsMoreClick] = useState<boolean>(false);
  const onIsMoreClick = () => {
    setIsMoreClick(!isMoreClick);
  };

  return (
    <>
      <EditMemberBtn>
        <MoreHorizIcon sx={{ fontSize: 32 }} onClick={onIsMoreClick} />
        {isMoreClick && (
          <MoreDetailDiv>
            <div>
              <PersonRemoveIcon sx={{ fontSize: 18 }} />
              <CommonText>멤버수정</CommonText>
            </div>
            <div>
              <SyncAltIcon sx={{ fontSize: 18 }} />
              <CommonText>권한양도</CommonText>
            </div>
          </MoreDetailDiv>
        )}
      </EditMemberBtn>
    </>
  );
};

export default MoreBtn;
