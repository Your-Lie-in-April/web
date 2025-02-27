import { Layout, Search } from '@components/layout';
import { SearchProvider } from '@hooks/context/searchContext';
import styled from 'styled-components';
import StorageInfinite from '../../components/storagePage/StorageInfinite';
import GraphicIcons from '../../components/storagePage/icons/GraphicIcons';

const StoragePage = () => {
    return (
        <>
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
