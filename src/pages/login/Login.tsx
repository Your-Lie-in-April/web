import { Http } from '@constants/api';
import { BannerDown, BannerTop } from '@pages/layouts/Banner';
import Layout from '@pages/layouts/Layout';
import googleLogo from '@pics/google-login.svg';
import { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import GraphicIcons from './icons/GraphicIcons';

const Login: FC = () => {
    const oAuth = () => {
        window.location.href = Http + '/oauth2/authorization/google';
    };

    return (
        <>
            <GlobalStyle />
            <Layout>
                <Container>
                    <GraphicIcons />
                    <Content>
                        <BannerTop />
                        <Spacer height='104px' />
                        <LoginBanner>
                            <Title>Sign up</Title>
                            <Google onClick={oAuth}>
                                <GoogleLogin>
                                    <img src={googleLogo} alt='Google Logo' />
                                    구글로그인
                                </GoogleLogin>
                            </Google>
                        </LoginBanner>
                        <Spacer height='391px' />
                        <BannerDown />
                    </Content>
                </Container>
            </Layout>
        </>
    );
};

export default Login;

const GlobalStyle = createGlobalStyle`
  body {
    width: 100%;
    min-width: 1366px;
    min-height: 1366px;
    margin: 0 auto;
    background-color: #212121;
    -ms-overflow-style: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
    position: relative;
    overflow-x: clip;
    background-color: #212121;
    min-height: 100vh;
`;

const Content = styled.div`
    position: relative;
    z-index: 2;
`;

const Spacer = styled.div<{ height: string }>`
    height: ${({ height }) => height};
    width: 100%;
`;

const LoginBanner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 102px;
    margin: auto;
`;

const Title = styled.span`
    color: #fff;
    text-align: center;
    font-size: 32px;
    font-weight: 700;
`;

const Google = styled.button.attrs({
    type: 'button',
})`
    width: 440px;
    height: 88px;
    border-radius: 60px;
    background: #fff;
    text-align: center;
    font-family: Roboto, sans-serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    color: #000000;
    line-height: normal;

    &:focus {
        outline: none;
    }
`;

const GoogleLogin = styled.div`
    display: flex;
    align-items: center;
    gap: 86px;
    position: relative;
`;
