import AfterLogin from "../Layouts/AfterLogin";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import ProjectInfo from "./ProjectInfo";
import ProfileList from "./ProfileList/ProfileList";
import MySchedule from "./Schedule/MySchedule";
import TeamSchedule from "./Schedule/TeamSchedule";
import Alarm from "./Alarm";

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
  width: 288px;
  height: 300px;
  background-color: #000000;
  border-radius: 20px;
`;

const ProjectPage = () => {
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
          <MainBox>
            <ProfileList />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <TeamSchedule />
              <MySchedule />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                justifyContent: "space-between", 
              }}
            >
              <Callendar />
              <Alarm />
            </div>
          </MainBox>
        </Box>
      </div>
      <div style={{ height: "400px" }}></div>
    </>
  );
};
export default ProjectPage;
