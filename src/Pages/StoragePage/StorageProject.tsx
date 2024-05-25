import styled from 'styled-components';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';
import DeleteProject from '../Modal/DeleteProject';
import { ProjectThumbnailResponse } from '#/Types/projecttype';

interface ProjectBoxProps {
    color?: string;
}

const ProjectBox = styled.div<ProjectBoxProps>`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 300px;
    height: 300px;

    border-radius: 16px;
    display: flex;
    color: #ffffff;

    background-color: ${(props) => (props.color ? `#${props.color}` : '#b79fff')};
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
    max-height: 43px;
    font-size: 16px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
`;

const MoreButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    z-index: 20;

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
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #7d7d7d;
    box-sizing: border-box;
    padding-top: 69px;
    border-radius: 16px;
    background: rgba(0, 0, 0, 0.3);
`;

const MoreItem = styled.button`
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    cursor: pointer;
    color: #7d7d7d;
    background-color: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    &: focus {
        border: none;
        outline: none;
    }
`;

const MoreText = styled.div`
    color: #f1f1f1;
    font-weight: 400;
    font-size: 12px;
    font-style: normal;
    line-height: normal;
    text-transform: uppercase;
`;

const StorageProject = ({ project }: { project: ProjectThumbnailResponse }) => {
    const [showMore, setShowMore] = useState<boolean>(false);
    const [isClick, setIsClick] = useState<boolean>(false);

    const toggleMoreBtn = () => {
        setShowMore(!showMore);
    };

    const onClickItem = () => {
        setIsClick(!isClick);
    };

    console.log('개별 프로젝트 : ', project);

    return (
        <>
            <ProjectBox style={{ backgroundColor: project.color }}>
                {showMore && (
                    <MoreBox>
                        <div
                            style={{
                                display: 'flex',
                                gap: '30px',
                                justifyContent: 'center',
                            }}
                        >
                            <MoreItem>
                                <AddCircleIcon sx={{ fontSize: 48, color: '#F1F1F1' }} />
                                <MoreText>자세히보기</MoreText>
                            </MoreItem>
                            <MoreItem onClick={onClickItem}>
                                <DeleteIcon sx={{ fontSize: 48, color: '#F1F1F1' }} />
                                <MoreText>삭제하기</MoreText>
                            </MoreItem>
                        </div>
                    </MoreBox>
                )}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                    }}
                >
                    <MoreDiv>
                        <MoreButton>
                            <StyledMoreBtn sx={{ fontSize: 32 }} onClick={toggleMoreBtn} />
                        </MoreButton>
                    </MoreDiv>
                    <TextBox>
                        <ProjectName>{project.title}</ProjectName>
                        <DetailText>{project.description}</DetailText>
                    </TextBox>
                </div>
            </ProjectBox>
            {isClick && <DeleteProject onClose={onClickItem} projectId={project.projectId} title={project.title} />}
        </>
    );
};

export default StorageProject;
