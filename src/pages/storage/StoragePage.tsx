import { useStoredInfiniteQuery } from '@hooks/apis/queries/project/useStoredInfiniteQuery';
import Layout from '@pages/layouts/Layout';
import Search from '@pages/layouts/Search';
import { useCallback, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styled, { createGlobalStyle } from 'styled-components';
import StorageProjectList from './StorageProjectList';
import GraphicIcons from './icons/GraphicIcons';

const StoragePage = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const { data, fetchNextPage, hasNextPage } = useStoredInfiniteQuery();

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
    }, []);

    const filteredProjects = useMemo(() => {
        return (
            data?.pages.flatMap((page) =>
                page.data.filter((project) =>
                    project.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
            ) || []
        );
    }, [data, searchQuery]);

    return (
        <>
            <GlobalStyle />
            <Layout>
                <GraphicIcons />
                <Container>
                    <Content>
                        <InnerContent>
                            <Title>프로젝트 보관함</Title>
                            <Search onSearch={handleSearch} />
                        </InnerContent>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={() => fetchNextPage()}
                            hasMore={!!hasNextPage}
                            loader={<div key={0}>Loading...</div>}
                        >
                            <StorageProjectList projects={filteredProjects} />
                        </InfiniteScroll>
                    </Content>
                </Container>
                <Spacer />
            </Layout>
        </>
    );
};
export default StoragePage;

const GlobalStyle = createGlobalStyle`
body {
  width : 100%;
  min-width : 1366px;
  min-height : 1573px;
  margin: 0 auto;
  background-color: #212121;
  -ms-overflow-style: none;
}

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.div`
    color: #ffffff;
    text-align: center;
    font-size: 42px;
    font-weight: 700;
    line-height: normal;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 130px;
    margin-top: 130px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 49px;
    align-items: center;
    z-index: 1;
`;

const InnerContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
`;

const Spacer = styled.div`
    width: 100vw;
    height: 172px;
`;
