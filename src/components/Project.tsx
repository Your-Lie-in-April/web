import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import { useState } from "react";

const ProjectBox = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 300px;
  height: 300px;
  background-color: #b79fff;
  border-radius: 16px;
  display: flex;
  color: #ffffff;
`;

const TextBox = styled.div`
  flex: 1;
  margin-top: 204px;
  width: 300px;
  height: 96px;
  border-radius: 0px 0px 16px 16px;
  background-color: #ffffff;
`;

const DetailDiv = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 8px;
`;

const ProjectName = styled.text`
  flex: 1;
  color: #000000;
  font-family: "Pretendard";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
`;

const DetailText = styled.div`
  flex: 1;
  width: 272px;
  color: #000000;
  font-family: "Pretendard";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
`;

const StyledMoreBtn = styled(MoreVertIcon)`
  position: absolute;
  top: 168px;
  right: 4px;
  color: #000000;
  cursor: pointer;
`;

const MoreBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 84px;
  height: 36px;
  border-radius: 6px;
  background-color: #ffffff;
  color: #7d7d7d;
  position: absolute;
  top: 166px;
  right: 40px;
  align-items: center;
  justify-content: space-evenly;
`;

const MoreItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const MoreText = styled.div`
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 10px;
  font-style: normal;
  line-height: normal;
  text-transform: uppercase;
  margin-top: 0px;
`;

const Project = () => {
  const [showMore, setShowMore] = useState(false);
  const toggleMoreBtn = () => {
    setShowMore(!showMore);
  };

  return (
    <ProjectBox>
      <StyledMoreBtn sx={{ fontSize: 32 }} onClick={toggleMoreBtn} />
      {showMore && (
        <MoreBox>
          <MoreItem>
            <PushPinOutlinedIcon sx={{ fontSize: 18 }} />
            <MoreText>상단고정</MoreText>
          </MoreItem>
          <MoreItem>
            <InboxOutlinedIcon sx={{ fontSize: 18 }} />
            <MoreText>보관함</MoreText>
          </MoreItem>
        </MoreBox>
      )}
      <TextBox>
        <DetailDiv>
          <ProjectName>2023 여름방학 프로젝트</ProjectName>
        </DetailDiv>
        <DetailDiv>
          <DetailText>2023 앱센터 프로젝트 입니다.</DetailText>
        </DetailDiv>
      </TextBox>
    </ProjectBox>
  );
};

export default Project;
