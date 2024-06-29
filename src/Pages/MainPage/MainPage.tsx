import { Http } from '#/constants/backendURL';
import { MemberEntity } from '#/Types/membertype';
import { ProjectEntity } from '#/Types/projecttype';
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import AfterLogin from '../Layouts/AfterLogin';
import BeforeLogin from '../Layouts/BeforeLogin';
import Search from '../Layouts/Search';
import Alarm from './components/Alarm';
import Banner from './components/Banner';
import NewProject from './components/NewProject';
import Pagination from './components/pagination';
import Pinned from './components/Pinned';
import Profile from './components/Profile';
import ProjectList from './components/ProjectList';

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

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<MemberEntity | null>(null);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>
    );
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
    const [projects, setProjects] = useState<ProjectEntity[]>([]);
    const [searchResults, setSearchResults] = useState<ProjectEntity[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const accessToken = query.get('access_token') || localStorage.getItem('access_token');
        const refreshToken = query.get('refresh_token') || localStorage.getItem('refresh_token');
        const memberId = query.get('member_id') || localStorage.getItem('member_id');

        if (accessToken) localStorage.setItem('access_token', accessToken);
        if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
        if (memberId) localStorage.setItem('member_id', memberId);

        if (accessToken && refreshToken) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

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

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const memberId = localStorage.getItem('member_id');

        const fetchProjects = async (page: number) => {
            try {
                const response = await fetch(
                    `${Http}/v1/projects/members/${memberId}?page=${page}&size=6`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                const data = await response.json();
                console.log('Projects Data:', data);

                setTotalPages(data.data.totalPages);

                setProjects(data.data.data);
                setSearchResults(data.data.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        if (accessToken && memberId) {
            fetchProjects(currentPage);
        }
    }, [currentPage]);

    const handleSearch = (query: string) => {
        const searchProjects = projects.filter((project) =>
            project.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(searchProjects);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
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
                                <Search onSearch={handleSearch} />
                                <NewProject />
                            </div>
                            <Pinned />
                        </div>
                        <ProjectList projects={searchResults} />
                {isLoggedIn && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
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
