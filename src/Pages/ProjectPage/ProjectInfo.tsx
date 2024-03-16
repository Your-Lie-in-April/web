import styled from 'styled-components';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 200px;
  background: #d9d9d9;
  box-sizing: border-box;
  padding-top: 28px;
`;

const ProjectInfoDiv = styled.div`
  width: 900px;
  height: 172px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 32px;
  margin: auto;
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

const SettingDiv = styled.div`
  position: absolute;
  bottom: 16px;
  right: 319.5px;
  width: 221px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  border-radius: 20px;
  background: #633ae2;
  box-sizing: border-box;
`;

const SettingBtn = styled.button`
  color: #ffffff;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  display: flex;
  gap: 4px;

  border-radius: 20px;
  padding: 0;
  margin: 0;
  background: transparent;
  box-sizing: border-box;
`;

const ProjectInfo = () => {
  return (
    <>
      <Container>
        <ProjectInfoDiv>
          <CommonText style={{ fontSize: '42px', fontWeight: '700' }}>
            프로젝트 제목
          </CommonText>
          <CommonText>프로젝트 내용</CommonText>
        </ProjectInfoDiv>
        <SettingDiv>
          <SettingBtn>
            <BorderColorOutlinedIcon style={{ fontSize: '18px' }} />
            커버 수정
          </SettingBtn>
          <SettingBtn>
            <InboxOutlinedIcon style={{ fontSize: '18px' }} />
            프로젝트 보관
          </SettingBtn>
        </SettingDiv>
      </Container>
    </>
  );
};

export default ProjectInfo;
