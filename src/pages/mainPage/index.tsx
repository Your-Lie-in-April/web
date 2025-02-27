import { BannerDown, BannerTop, Layout, Search } from '@components/layout';
import { Alarm, NewProject, Profile } from '@components/mainPage';
import { Pagination } from '@components/mainPage/pagination';
import Pinned from '@components/mainPage/pinned/Pinned';
import { SearchProvider } from '@hooks/context/searchContext';
import styled from 'styled-components';

const MainPage = () => {
    return (
        <>
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
                            <Pagination />
                        </Rights>
                    </MainContainer>
                    <Spacer />
                </SearchProvider>
            </Layout>
        </>
    );
};

export default MainPage;

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
