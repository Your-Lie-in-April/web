import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Login from './Login';
import Alarm from './Alarm';
import NewProject from './NewProject';
import Search from './Search';
import BeforeLogin from '../Layouts/BeforeLogin';
import Banner from './Banner';
import ProjectList from './ProjectList';
import Pinned from './Pinned';
import { createGlobalStyle } from 'styled-components';
import Profile from './Profile';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #212121;
    -ms-overflow-style: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const MainContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 1284px;
    box-sizing: border-box;
`;

function useQuery() {
    const location = useLocation();
    return new URLSearchParams(location.search);
}

const MainPage: FC = () => {
    const query = useQuery();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = query.get('access_token');
        const refreshToken = query.get('refresh_token');

        if (accessToken && refreshToken) {
            console.log('Access Token:', accessToken);
            console.log('Refresh Token:', refreshToken);
        } else {
            console.log('인증정보없음');
            navigate('/login');
        }
    }, [query, navigate]);
    return (
        <>
            <GlobalStyle />
            <BeforeLogin />
            <div
                style={{
                    width: '100vw',
                    margin: '0 auto',
                }}
            >
                <Banner />
                <div
                    style={{
                        height: '126px',
                    }}
                />
                <MainContainer>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '20px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: '14px',
                            }}
                        >
                            <Profile />
                            <Alarm />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: '24px',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    gap: '21px',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'flex-start',
                                        gap: '8px',
                                    }}
                                >
                                    <Search />
                                    <NewProject />
                                </div>
                                <Pinned />
                            </div>
                            <ProjectList />
                        </div>
                    </div>
                </MainContainer>
            </div>
            <div
                style={{
                    height: '300px',
                }}
            />
        </>
    );
    return (
        <>
            <GlobalStyle />
            <BeforeLogin />
            <Banner />
            <div
                style={{
                    height: '126px',
                }}
            />
            <MainContainer>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '20px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '14px',
                        }}
                    >
                        <Profile />
                        <Alarm />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '24px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: '21px',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    gap: '8px',
                                }}
                            >
                                <Search />
                                <NewProject />
                            </div>
                            <Pinned />
                        </div>
                        <ProjectList />
                    </div>
                </div>
            </MainContainer>
            <div
                style={{
                    height: '300px',
                }}
            />
        </>
    );
};

export default MainPage;
