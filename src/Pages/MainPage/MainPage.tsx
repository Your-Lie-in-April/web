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
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #212121;
    -ms-overflow-style: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1284px;
  box-sizing: border-box;
`;

const MainPage: FC = () => {
  return (
    <>
      <GlobalStyle />
      <BeforeLogin />
      <Banner />
      <div
        style={{
          height: "126px",
        }}
      />
      <MainContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "14px",
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
        </div>
      </MainContainer>
      <div
        style={{
          height: "300px",
        }}
      />
    </>
  );
};

export default MainPage;
