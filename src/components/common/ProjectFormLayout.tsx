import { InfoEdit } from '@/components/common/InfoEdit';
import { DatePicker, DateShow, DayPicker, TimePicker } from '@/components/common/Picker';
import { ProjectActionBtn } from '@components/common/Button';
import { Layout } from '@components/layout';
import { useProjectContext } from '@hooks/context/projectContext';
import useDispatchProjectData from '@hooks/useDispatchProject';
import 'react-toastify/dist/ReactToastify.css';
import styled, { createGlobalStyle } from 'styled-components';

const ProjectFormLayout = () => {
    const { projectData } = useProjectContext();
    useDispatchProjectData(projectData);

    return (
        <>
            <GlobalStyle />
            <Layout>
                <Divider height='28px' />
                <InfoEdit />
                <Divider height='24px' />
                <Container>
                    <PickerContainer>
                        <DatePicker />
                        <PickerBox>
                            <DateShow />
                            <DayPicker />
                            <TimePicker />
                        </PickerBox>
                    </PickerContainer>
                    <ProjectActionBtn />
                </Container>
                <Divider height='300px' />
            </Layout>
        </>
    );
};
export default ProjectFormLayout;

const GlobalStyle = createGlobalStyle`
  body {
    width : 100%;
    min-width : 1366px;
    max-height : 1920px;
    margin: 0 auto;
    background-color: #212121;
    -ms-overflow-style: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Divider = styled.div<{ height: string }>`
    height: ${(props) => props.height};
    width: 100%;
    background-color: #000000;
`;

const Container = styled.div`
    display: flex;
    width: 100%;
    background-color: white;
    flex-direction: column;
    align-items: center;
    gap: 78px;
    border: none;
    box-shadow: none;
    padding-top: 109px;
    padding-bottom: 109px;
    box-sizing: border-box;
`;

const PickerContainer = styled.div`
    display: flex;
    gap: 240px;
    width: 1122px;
`;

const PickerBox = styled.div`
    display: flex;
    flex-direction: column;
`;