import AfterLogin from "../Layouts/AfterLogin";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import ProjectInfo from "./ProjectInfo";
import ProfileList from "./ProfileList/ProfileList";
import MySchedule from "./Schedule/MySchedule";
import TeamSchedule from "./Schedule/TeamSchedule";
import Alarm from "./Alarm";
import MemberSchedule from "./Schedule/MemberSchedule";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import MemberScheduleGrid from "./Schedule/MemberScheduleGrid";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #FFFFFF;
    -ms-overflow-style: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 20px;
  background-color: #000000;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  box-sizing: border-box;
`;

const MainBox = styled.div`
  display: flex;
  gap: 22px;
`;

// 임시 캘린더
const Callendar = styled.div`
  width: 291px;
  height: 294px;
  background-color: #000000;
  border-radius: 20px;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
`;

const MemTimeBtn = styled.button`
  width: 176px;
  height: 40px;
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: center;
  gap: 2px;

  border-radius: 30px;
  background: #212121;
  color: #ffffff;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  .icon {
    width: 22px;
    height: 22px;
  }
`;

const ProjectPage = () => {
  const [seeMemTime, setSeeMemTime] = useState(true);

  const toggleMemTime = () => {
    setSeeMemTime(!seeMemTime);
  };

  return (
    <>
      <GlobalStyle />
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <div>
          <AfterLogin />
          <Divider />
          <ProjectInfo />
        </div>
        <Box>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              alignItems: "center",
            }}
          >
            <MainBox>
              <ProfileList />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <TeamSchedule />
                <MySchedule />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <Callendar />
                <Alarm />
              </div>
            </MainBox>
            <MemTimeBtn onClick={toggleMemTime}>
              {seeMemTime ? "멤버 시간표 닫기" : "멤버 시간표 열기"}
              {seeMemTime ? (
                <ArrowDropUpIcon className="icon" />
              ) : (
                <ArrowDropDownIcon className="icon" />
              )}
            </MemTimeBtn>
            {seeMemTime && <MemberScheduleGrid />}
          </div>
        </Box>
      </div>
      <div style={{ height: "400px" }}></div>
    </>
  );
};
export default ProjectPage;
