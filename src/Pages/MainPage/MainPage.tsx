import { FC } from 'react';
import styled from 'styled-components';
import Login from './Login';
import Alarm from './Alarm';
import NewProject from './NewProject';
import Search from './Search';
import BeforeLogin from '../Layouts/BeforeLogin';
const MainPageContainer = styled.div`
    position: relative;
    margin-left: auto;
    margin-right: auto;
    max-width: 1920px; /* 원하는 최대 너비 설정 */
    background-color: #212121;
`;

const MainPage: FC = () => {
    return (
        <MainPageContainer>
            <BeforeLogin />
            <div style={{ backgroundColor: '#212121' }}>
                <div style={{ marginLeft: '320px', marginTop: '370px' }}>
                    <Login />
                    <div style={{ marginTop: '14px' }}>
                        <Alarm />
                    </div>
                </div>
                <Search />
                <NewProject />
            </div>
        </MainPageContainer>
    );
};
export default MainPage;
