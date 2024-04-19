import styled from 'styled-components';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';

const PinnedBox = styled.div`
    width: 950px;
    height: 400px;
    background-color: #633ae2;
    border-radius: 20px;
    color: #ffffff;
    padding: 16px;
    box-sizing: border-box;
`;

const ProjectBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 24px;
    align-self: flex-start;
    align-items: flex-start;
`;

//임시 스케줄 박스
const ScheduleBox = styled.div`
    width: 681px;
    height: 300px;
    border-radius: 20px;
    background: #fff;
`;

const StyledButton = styled.button`
    width: 36px;
    height: 36px;

    background: none;
    color: #ffffff;
    border: none;
    padding: 0;
    cursor: pointer;

    &: focus {
        border: none;
        outline: none;
    }
`;

const TextDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
    align-self: flex-end;
`;

const ProjectText = styled.text`
    color: #ffffff;
    font-family: 'Pretendard';
    font-size: 32px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
`;

const DetailText = styled.text`
    color: #ffffff;
    font-family: 'Pretendard';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Pinned = () => {
    return (
        <PinnedBox>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <StyledButton>
                    <PushPinOutlinedIcon sx={{ fontSize: 36 }} />
                </StyledButton>
                <ProjectBox>
                    <TextDiv>
                        <ProjectText>
                            프로젝트명
                            <br />
                            프로젝트명
                        </ProjectText>
                        <DetailText>멤버 00명</DetailText>
                        <DetailText>
                            프로젝트 기간
                            <span />
                            20XX.XX.XX ~20XX.XX.XX
                        </DetailText>
                    </TextDiv>
                    <ScheduleBox />
                </ProjectBox>
            </div>
        </PinnedBox>
    );
};

export default Pinned;
