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

const MainPage: React.FC = () => {
    const { userData, setUserData } = useUserContext() as UserContextType;
    const query = useQuery();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const accessToken = query.get('access_token') || localStorage.getItem('access_token');
        const refreshToken = query.get('refresh_token') || localStorage.getItem('refresh_token');
        const memberId = query.get('member_id') || localStorage.getItem('member_id');

        if (accessToken && refreshToken && memberId) {
            validateAndFetchUserData(accessToken, refreshToken, memberId).finally(() => {
                setIsLoading(false);
            });
        } else {
            console.log('액세스 토큰, 리프레시 토큰 또는 회원 ID가 없습니다.');
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (userData) {
            console.log('유저데이터:', userData);
        }
    }, [userData]);

    const reissueToken = async (refreshToken: string): Promise<string | undefined> => {
        try {
            const response = await fetch(`${Http}/v1/auth/reissue`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${refreshToken}` },
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error(`토큰 재발급 실패: ${errorBody}`);
                throw new Error('토큰 재발급 실패');
            }

            const data = await response.json();
            localStorage.setItem('access_token', data.accessToken);
            localStorage.setItem('refresh_token', data.refreshToken);
            setIsLoggedIn(true);
            return data.accessToken;
        } catch (error) {
            console.error('토큰 재발급 실패:', error);
            setIsLoggedIn(false);
            alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
            navigate('/login');
        }
    };

    const validateAndFetchUserData = async (
        accessToken: string,
        refreshToken: string,
        memberId: string
    ): Promise<void> => {
        try {
            const response = await fetch(`${Http}/v1/members/${memberId}`, {
                method: 'GET',
                headers: {
                    Accept: '*/*',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 401 && refreshToken) {
                console.log('토큰이 만료되었습니다. 재발급을 시도합니다.');
                const newAccessToken = await reissueToken(refreshToken);
                if (newAccessToken) {
                    return validateAndFetchUserData(newAccessToken, refreshToken, memberId);
                }
            }

            const data = await response.json();
            setUserData(data?.data);
        } catch (error) {
            console.error('사용자 데이터 가져오기 실패:', error);
        }
    };

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
