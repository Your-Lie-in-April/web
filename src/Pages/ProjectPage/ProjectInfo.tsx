import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  padding: 16px 320px;
  background: #d9d9d9;
  box-sizing: border-box;
`;

const CommonText = styled.div`
  color: #000000;
  text-align: center;
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1284px;
  box-sizing: border-box;
`;

const ProjectInfo = () => {
  return (
    <Container>
      <CommonText style={{ fontSize: "42px", fontWeight: "700" }}>
        프로젝트 제목
      </CommonText>
      <CommonText>프로젝트 내용</CommonText>
    </Container>
  );
};

export default ProjectInfo;
