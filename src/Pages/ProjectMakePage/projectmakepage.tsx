import { FC } from 'react';
import styled from 'styled-components';
import Info from './Info';
import AfterLogin from '../Layouts/AfterLogin';
import SelectTime from './selecttime';
const ProjectMakePageContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
    max-width: 1920px;
    max-height: 1080px;
    background-color: #212121;
    overflow: auto;

    body {
        -ms-overflow-style: none;
    }

    ::-webkit-scrollbar {
        display: none;
    }
`;

const ProjectMakePage: FC = () => {
    return (
        <ProjectMakePageContainer>
            {/* <AfterLogin /> */}
            <SelectTime />
        </ProjectMakePageContainer>
    );
};

export default ProjectMakePage;
