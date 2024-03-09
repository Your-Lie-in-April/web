import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import { useState } from "react";

interface MoreTextProps extends React.HTMLAttributes<HTMLDivElement> {
  isMove?: boolean;
}

const ProjectBox = styled.div`
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
  font-family: "Pretendard";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
`;

const DetailText = styled.div`
  color: #000000;
  font-family: "Pretendard";
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
  display: flex;
  flex-direction: row;
  width: px;
  height: 36px;
  border-radius: 6px;
  background-color: #ffffff;
  color: #7d7d7d;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-sizing: border-box;
  padding: 4px 8px;
`;

const MoreItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: #7d7d7d;
  border: none;
  padding: 0;
  cursor: pointer;
  &: focus {
    border: none;
    outline: none;
  }
`;

const MoreText = styled.div<MoreTextProps>`
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 10px;
  font-style: normal;
  line-height: normal;
  text-transform: uppercase;
  letter-spacing: ${({ isMove }) => (isMove ? "-1.2px" : "normal")};
`;

const Project = () => {
  const [showMore, setShowMore] = useState(false);
  const toggleMoreBtn = () => {
    setShowMore(!showMore);
  };

  return (
    <ProjectBox>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <MoreDiv>
          {showMore && (
            <MoreBox>
              <MoreItem>
                <PushPinOutlinedIcon sx={{ fontSize: 18 }} />
                <MoreText>상단고정</MoreText>
              </MoreItem>

              <MoreItem>
                <InboxOutlinedIcon sx={{ fontSize: 18 }} />
                <MoreText isMove>보관함이동</MoreText>
              </MoreItem>
            </MoreBox>
          )}
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

export default Project;
