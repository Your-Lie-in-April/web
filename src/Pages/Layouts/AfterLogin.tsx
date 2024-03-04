import { FC } from "react";
import styled from "styled-components";

const AfterLoginDiv = styled.div`
  width: 100%;
  height: 100px;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  position: relative;
`;
const Logo = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  margin: auto;
  margin-bottom: 14px;
`;
const LogIn = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 800;
  font-size: 22px;
  position: absolute;
  right: 319.5px;
  bottom: 20px;
`;

const AfterLogin: FC = () => {
  return (
    <AfterLoginDiv>
      <Logo>TIME PIECE</Logo>
      <LogIn>My page</LogIn>
    </AfterLoginDiv>
  );
};
export default AfterLogin;
