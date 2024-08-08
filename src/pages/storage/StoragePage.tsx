import { SearchProvider } from '@hooks/context/searchContext';
import Layout from '@pages/layouts/Layout';
import Search from '@pages/layouts/Search';
import styled, { createGlobalStyle } from 'styled-components';
import GraphicIcons from './components/icons/GraphicIcons';
import StorageInfinite from './components/project/StorageInfinite';

const StoragePage = () => {
    return (
        <>
            <GlobalStyle />
            <Layout>
                <GraphicIcons />
                <SearchProvider>
                    <Container>
                        <Content>
                            <InnerContent>
                                <Title>프로젝트 보관함</Title>
                                <Search />
                            </InnerContent>
                            <StorageInfinite />
                        </Content>
                    </Container>
                </SearchProvider>
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
