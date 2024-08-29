import { SearchProvider } from '@hooks/context/searchContext';
import Layout from '@pages/layouts/Layout';
import Search from '@pages/layouts/Search';
import { isMobileSetHeight } from '@utils/isMobileSetHeight';
import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { BannerDown, BannerTop } from '../layouts/Banner';
import Alarm from './components/alarm/Alarm';
import Pinned from './components/pinned/Pinned';
import Profile from './components/profile/Profile';
import MainPagination from './components/projects/MainPagination';
import NewProject from './components/projects/NewProject';

function useQuery() {
    const location = useLocation();
    return new URLSearchParams(location.search);
}

const MainPage: FC = () => {
    const query = useQuery();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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

    isMobileSetHeight();

    return (
        <>
            <GlobalStyle />
            <Layout>
                <BannerTop />
                <BannerDown />
                <SearchProvider>
                    <MainContainer>
                        <Lefts>
                            <Profile />
                            <Alarm />
                        </Lefts>
                        <Rights>
                            <RightMid>
                                <RightTop>
                                    <Search />
                                    <NewProject />
                                </RightTop>
                                <Pinned />
                            </RightMid>
                            <MainPagination />
                        </Rights>
                    </MainContainer>
                    <Spacer />
                </SearchProvider>
            </Layout>
        </>
    );
};

export default MainPage;

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
    gap: 20px;
    margin: 0 auto;
    max-width: 1284px;
    box-sizing: border-box;
    margin-top: 126px;
`;

const RightTop = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 8px;
`;

const RightMid = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 21px;
`;

const Rights = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
`;

const Lefts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
`;

const Spacer = styled.div`
    height: 300px;
`;
