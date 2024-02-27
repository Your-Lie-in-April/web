import { FC } from 'react';
import styled from 'styled-components';
import Info from './Info';
import SelectTime from './projectcalendar';
import ProjectTime from './projecttime';
import AfterLogin from '../Layouts/AfterLogin';
const ProjectMakePageContainer = styled.div`
    margin-left: auto;
    margin-right: auto;

    background-color: #212121;
    overflow: auto;

    body {
        -ms-overflow-style: none;
    }

    ::-webkit-scrollbar {
        display: none;
    }
`;
const TimeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 109px 389px;
    align-items: flex-start;
`;

const ProjectMakePage: FC = () => {
    return (
        <ProjectMakePageContainer>
            <AfterLogin />
            <Info />
            <TimeContainer>
                <div>
                    <SelectTime />
                    <ProjectTime />
                </div>
                <button>안녕</button>
            </TimeContainer>
        </ProjectMakePageContainer>
    );
};

export default ProjectMakePage;
