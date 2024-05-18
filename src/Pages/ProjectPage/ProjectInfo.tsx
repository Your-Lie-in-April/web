import styled from 'styled-components';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import Info from '../ProjectMakePage/Info';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectEntity } from '#/Types/projecttype';
import { Http } from '#/constants/backendURL';

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 200px;
    background: #d9d9d9;
    box-sizing: border-box;
    padding-top: 28px;
`;

const ProjectInfoDiv = styled.div`
    min-width: 900px;
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

const SettingDiv = styled.div`
    position: absolute;
    bottom: 16px;

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
interface ProjectInfoDetailProps {
    onClick: () => void;
    projectData: ProjectEntity | null;
}
export const ProjectInfoDetail: React.FC<ProjectInfoDetailProps> = ({ onClick, projectData }) => {
    return (
        <Container>
            <ProjectInfoDiv>
                <CommonText style={{ fontSize: '42px', fontWeight: '700' }}>{projectData?.title}</CommonText>
                <CommonText>{projectData?.description}</CommonText>
                <div style={{ width: '100%', display: 'flex' }}>
                    <div
                        style={{
                            justifyContent: 'flex-start',
                            flex: '0 0 75%',
                        }}
                    />
                    <div
                        style={{
                            justifyContent: 'center',
                            flex: '0 0 25%',
                        }}
                    >
                        <SettingDiv>
                            <SettingBtn onClick={onClick}>
                                <BorderColorOutlinedIcon style={{ fontSize: '18px' }} />
                                커버 수정
                            </SettingBtn>
                            <SettingBtn>
                                <InboxOutlinedIcon style={{ fontSize: '18px' }} />
                                프로젝트 보관
                            </SettingBtn>
                        </SettingDiv>
                    </div>
                </div>
            </ProjectInfoDiv>
        </Container>
    );
};
interface ProjectDetailProps {
    projectData: ProjectEntity | null;
}
const ProjectInfo: React.FC<ProjectDetailProps> = ({ projectData }) => {
    const [editCover, setEditCover] = useState(false);

    return (
        <>{editCover ? <Info /> : <ProjectInfoDetail onClick={() => setEditCover(true)} projectData={projectData} />}</>
    );
};

export default ProjectInfo;
