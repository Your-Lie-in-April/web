import { FC } from "react";
import styled from "styled-components";

const BeforeLoginDiv = styled.div`
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

const LogIn = styled.button`
  box-sizing: border-box;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 800;
  font-size: 22px;
  position: absolute;
  right: 319.5px;
  bottom: 20px;
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  &: focus {
    border: none;
    outline: none;
  }
`;

const BeforeLogin: FC = () => {
  return (
    <BeforeLoginDiv>
      <Logo>TIME PIECE</Logo>

      <LogIn>Log in</LogIn>
    </BeforeLoginDiv>
  );
};
export default BeforeLogin;
