import styled from 'styled-components';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';

interface MoreTextProps extends React.HTMLAttributes<HTMLDivElement> {
  isMove?: boolean;
}

const ProjectBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 300px;
  height: 300px;
  background-color: #b79fff;
  border-radius: 16px;
  display: flex;
  color: #ffffff;
`;

const TextBox = styled.div`
  width: 300px;
  height: 96px;
  border-radius: 0px 0px 16px 16px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  box-sizing: border-box;
  align-items: flex-start;
  gap: 8px;
`;

const ProjectName = styled.text`
  color: #000000;
  font-family: 'Pretendard';
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
`;

const DetailText = styled.div`
  color: #000000;
  font-family: 'Pretendard';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 20;

  &: focus {
    border: none;
    outline: none;
  }
`;

const StyledMoreBtn = styled(MoreVertIcon)`
  color: #000000;
  width: 18px;
  height: 18px;
`;

const MoreDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;

const MoreBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #7d7d7d;
  box-sizing: border-box;
  padding: 69px 84px 164px 84px;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

const MoreItem = styled.button`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  cursor: pointer;
  color: #7d7d7d;
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  &: focus {
    border: none;
    outline: none;
  }
`;

const MoreText = styled.div<MoreTextProps>`
  color: #f1f1f1;
  font-weight: 400;
  font-size: 12px;
  font-style: normal;
  line-height: normal;
  text-transform: uppercase;
  letter-spacing: ${({ isMove }) => (isMove ? '-1.2px' : 'normal')};
`;

const StorageProject = () => {
  const [showMore, setShowMore] = useState(false);
  const toggleMoreBtn = () => {
    setShowMore(!showMore);
  };

  return (
    <ProjectBox>
      {showMore && (
        <MoreBox>
          <div style={{ display: 'flex', gap: '30px', width: '130px' }}>
            <MoreItem>
              <AddCircleIcon sx={{ fontSize: 48, color: '#F1F1F1' }} />
              <MoreText>자세히보기</MoreText>
            </MoreItem>
            <MoreItem>
              <DeleteIcon sx={{ fontSize: 48, color: '#F1F1F1' }} />
              <MoreText isMove>삭제하기</MoreText>
            </MoreItem>
          </div>
        </MoreBox>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <MoreDiv>
          <MoreButton>
            <StyledMoreBtn sx={{ fontSize: 32 }} onClick={toggleMoreBtn} />
          </MoreButton>
        </MoreDiv>
        <TextBox>
          <ProjectName>2023 여름방학 프로젝트</ProjectName>
          <DetailText>
            2023 앱센터 프로젝트 입니다.
            <br />
            2023 앱센터 프로젝트 입니다.
          </DetailText>
        </TextBox>
      </div>
    </ProjectBox>
  );
};

export default StorageProject;
