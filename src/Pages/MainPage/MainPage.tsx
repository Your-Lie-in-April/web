import { FC, useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Alarm from './components/Alarm';
import NewProject from './components/NewProject';
import Search from './components/Search';
import BeforeLogin from '../Layouts/BeforeLogin';
import Banner from './components/Banner';
import ProjectList from './components/ProjectList';
import Pinned from './components/Pinned';
import { createGlobalStyle } from 'styled-components';
import Profile from './components/Profile';
import AfterLogin from '../Layouts/AfterLogin';
import { Http } from '#/constants/backendURL';
import { MemberEntity } from '#/Types/membertype';

const GlobalStyle = createGlobalStyle`
  body {
    width : 100%;
    min-width : 1366px;
    margin: 0 auto;
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

type UserContextType = {
    userData: MemberEntity | null;
    setUserData: (userData: MemberEntity | null) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<MemberEntity | null>(null);

    return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === null) throw new Error('useUserContext must be used within a UserProvider');
    return context;
};

const MainPage: FC = () => {
    const { userData, setUserData } = useUserContext();
    const query = useQuery();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const accessToken = query.get('access_token') || '';
        const refreshToken = query.get('refresh_token') || '';
        const memberId = query.get('member_id') || '';
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        localStorage.setItem('member_id', memberId);
        console.log(accessToken);
        console.log(refreshToken);
        console.log(memberId);

        if (accessToken && refreshToken) {
            setIsLoggedIn(true);
            console.log('로그인되었음');
        } else {
            console.log('인증정보없음');
        }
    }, [query, navigate]);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const memberId = localStorage.getItem('member_id');
        console.log(accessToken);
        console.log(memberId);
        const fetchUser = async () => {
            try {
                const response = await fetch(Http + `/v1/members/${memberId}`, {
                    method: 'GET',
                    headers: {
                        Accept: '*/*',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const data = await response.json();
                console.log(data);
                setUserData(data?.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchUser();
    }, [userData?.nickname, userData?.state]);
    return (
        <>
            <GlobalStyle />

            {isLoggedIn ? <AfterLogin /> : <BeforeLogin />}
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
