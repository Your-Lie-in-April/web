import { FC } from "react";
import styled from "styled-components";
import Login from "./Login";
import Alarm from "./Alarm";
import NewProject from "./NewProject";
import Search from "./Search";
import BeforeLogin from "../Layouts/BeforeLogin";
import Banner from "./Banner";
import ProjectList from "./ProjectList";
import Pinned from "./Pinned";

const MainPageContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1920px;
  max-height: 1080px;
  background-color: #212121;
  overflow: auto;

  body {
    -ms-overflow-style: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 126px;
  justify-content: center;
`;

const MainPage: FC = () => {
  return (
    <MainPageContainer>
      <BeforeLogin />
      <Banner />
      <Main>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "14px",
            marginRight: 20,
          }}
        >
          <Login />
          <Alarm />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "21px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: "8px",
              }}
            >
              <Search />
              <NewProject />
            </div>
            <Pinned />
          </div>
          <ProjectList />
        </div>
      </Main>
      <div style={{ height: "300px" }} />
    </MainPageContainer>
  );
};

export default MainPage;
