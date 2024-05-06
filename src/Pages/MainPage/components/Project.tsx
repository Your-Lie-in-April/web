import styled from 'styled-components';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react';
import LeaveProject from '../../Modal/LeaveProject';
import { Http } from '#/constants/backendURL';
import { ProjectEntity } from '../../../Types/projecttype';

interface MoreTextProps extends React.HTMLAttributes<HTMLDivElement> {
    isMove?: boolean;
}

const ProjectBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 300px;
    height: 300px;
    background-color: #b79fff;
    border-radius: 16px;
    display: flex;
    color: #ffffff;
    position: relative;
`;

const TextBox = styled.div`
    width: 300px;
    height: 96px;
    border-radius: 0px 0px 16px 16px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    box-sizing: border-box;
    align-items: flex-start;
    gap: 8px;

    color: #000000;
    font-family: 'Pretendard';
    font-style: normal;
    line-height: normal;
    text-transform: uppercase;
`;

const ProjectName = styled.div`
    width: 100%;
    font-size: 24px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const DetailText = styled.div`
    font-size: 16px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
`;

const StyledButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    &: focus {
        border: none;
        outline: none;
    }
`;

const StyledMoreBtn = styled(MoreVertIcon)`
    color: #000000;
    width: 18px;
    height: 18px;
`;

const MoreDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
`;

const MoreBox = styled.div`
    display: flex;
    flex-direction: row;
    height: 36px;
    border-radius: 6px;
    background-color: #ffffff;
    color: #7d7d7d;
    align-items: center;
    justify-content: center;
    gap: 6px;
    box-sizing: border-box;
    padding: 4px 8px;
`;

const MoreItem = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    color: #7d7d7d;
    border: none;
    padding: 0;
    cursor: pointer;
    &: focus {
        border: none;
        outline: none;
    }
`;

const MoreText = styled.div<MoreTextProps>`
    font-family: 'Pretendard';
    font-weight: 400;
    font-size: 10px;
    font-style: normal;
    line-height: normal;
    text-transform: uppercase;
    letter-spacing: ${({ isMove }) => (isMove ? '-1.2px' : 'normal')};
`;

const CancelBtn = styled(CancelIcon)`
    position: absolute;
    top: 8px;
    right: 8px;
    color: #ffffff;
    width: 36px;
    height: 36px;
`;

interface ProjectProps {
    project: ProjectEntity;
}

const Project: React.FC<ProjectProps> = ({ project }) => {
    const [showMore, setShowMore] = useState<boolean>(false);
    const [isCancleBtn, setIsCancelBtn] = useState<boolean>(false);
    const [isPinned, setIsPinned] = useState<boolean>(false);
    const accessToken = localStorage.getItem('access_token');

    const toggleMoreBtn = () => {
        setShowMore(!showMore);
    };

    const onClickCancelBtn = () => {
        setIsCancelBtn(!isCancleBtn);
    };

    const handlePin = async () => {
        try {
            const response = await fetch(`${Http}/v1/members/pin/${project.projectId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                    credentials: 'include',
                },
                body: JSON.stringify({ projectId: project.projectId }),
            });
            if (!response.ok) throw new Error('뭔가 이상');
            setIsPinned(true);
            const result = await response.json();
            console.log('상단 고정 결과:', result);
        } catch (error) {
            console.error('업데이트 실패:', error);
        }
    };

    return (
        <ProjectBox>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <MoreDiv>
                    {showMore && (
                        <>
                            <StyledButton onClick={onClickCancelBtn}>
                                <CancelBtn sx={{ fontSize: 36 }} />
                            </StyledButton>
                            <MoreBox>
                                <MoreItem onClick={handlePin}>
                                    <PushPinOutlinedIcon sx={{ fontSize: 18 }} />
                                    <MoreText>상단고정</MoreText>
                                </MoreItem>
                                <MoreItem>
                                    <InboxOutlinedIcon sx={{ fontSize: 18 }} />
                                    <MoreText isMove>보관함이동</MoreText>
                                </MoreItem>
                            </MoreBox>
                        </>
                    )}
                    <StyledButton onClick={toggleMoreBtn}>
                        <StyledMoreBtn sx={{ fontSize: 32 }} />
                    </StyledButton>
                </MoreDiv>
                <TextBox>
                    <ProjectName>{project.title}</ProjectName>
                    <DetailText>{project.description}</DetailText>
                </TextBox>
            </div>
            {isCancleBtn && <LeaveProject onClose={onClickCancelBtn} />}
        </ProjectBox>
    );
};

export default Project;
