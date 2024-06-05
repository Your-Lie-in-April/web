import { ProjectEntity } from '#/Types/projecttype';
import { Http } from '#/constants/backendURL';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import InfoEdit from './infoedit';

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 200px;
    background: ${(props) => props.color || '#d9d9d9'};
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

    &:focus {
        outline: none;
    }
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

    &:focus {
        outline: none;
    }
`;
interface ProjectInfoDetailProps {
    onClick: () => void;
    projectData: ProjectEntity | null;
}
export const ProjectInfoDetail: React.FC<ProjectInfoDetailProps> = ({ onClick, projectData }) => {
    const { projectId } = useParams<{ projectId: string }>();
    const [isStored, setIsStored] = useState<boolean>(false);
    const handleStore = async () => {
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await fetch(`${Http}/v1/members/storage/${projectId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                    credentials: 'include',
                },
                body: JSON.stringify({ projectId: projectId }),
            });
            if (!response.ok) throw new Error('뭔가 이상');
            setIsStored(true);
            window.alert('보관하였습니다.');
            const result = await response.json();
            console.log('보관함 결과:', result);
            window.location.reload();
        } catch (error) {
            console.error('업데이트 실패:', error);
        }
    };
    return (
        <Container color={projectData?.color}>
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
                            <SettingBtn onClick={handleStore}>
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
        <>
            {editCover ? (
                <InfoEdit projectData={projectData} setEditCover={setEditCover} />
            ) : (
                <ProjectInfoDetail onClick={() => setEditCover(true)} projectData={projectData} />
            )}
        </>
    );
};

export default ProjectInfo;
