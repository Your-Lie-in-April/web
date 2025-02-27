import { BannerDown, BannerTop, Layout } from '@components/layout';
import { GraphicIcons } from '@components/loginPage';
import { Http } from '@constants/api';
import '@fontsource/roboto/900.css';
import githubLogo from '@pics/github-login.svg';
import googleLogo from '@pics/google-login.svg';
import kakaoLogo from '@pics/kakao-login.svg';
import { isMobileSetHeight } from '@utils/isMobileSetHeight';
import { FC } from 'react';
import styled from 'styled-components';

const LoginPage: FC = () => {
    isMobileSetHeight();

    const oAuth = (provider: string) => {
        let path = '';
        switch (provider) {
            case 'google':
                path = '/oauth2/authorization/google';
                break;
            case 'kakao':
                path = '/oauth2/authorization/kakao';
                break;
            case 'github':
                path = '/oauth2/authorization/github';
                break;
            default:
                console.error('Invalid OAuth provider');
                return;
        }
        window.location.href = Http + path;
    };

    return (
        <>
            <Layout>
                <Container>
                    <GraphicIcons />
                    <Content>
                        <BannerTop />
                        <Spacer height='104px' />
                        <LoginBanner>
                            <Title>Sign up</Title>
                            <BtnWrapper>
                                <BtnBox onClick={() => oAuth('google')}>
                                    <WrapperLogin style={{ gap: '46px' }}>
                                        <img src={googleLogo} alt='Google' />
                                        구글 로그인
                                    </WrapperLogin>
                                </BtnBox>
                                <BtnBox onClick={() => oAuth('kakao')}>
                                    <WrapperLogin>
                                        <img src={kakaoLogo} alt='Kako' />
                                        카카오 로그인
                                    </WrapperLogin>
                                </BtnBox>
                                <BtnBox onClick={() => oAuth('github')}>
                                    <WrapperLogin>
                                        <img src={githubLogo} alt='Github' />
                                        깃허브 로그인
                                    </WrapperLogin>
                                </BtnBox>
                            </BtnWrapper>
                        </LoginBanner>
                        <Spacer height='391px' />
                        <BannerDown />
                    </Content>
                </Container>
            </Layout>
        </>
    );
};

export default LoginPage;

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

const BtnWrapper = styled.div`
    display: flex;
    gap: 16px;
`;

const BtnBox = styled.button.attrs({
    type: 'button',
})`
    width: 320px;
    height: 64px;
    border-radius: 60px;
    background: #fff;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 900;
    color: #000000;
    line-height: normal;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    letter-spacing: -0.5px;
    text-shadow: -0.2px -0.2px 0 #000, 0.2px -0.2px 0 #000, -0.2px 0.2px 0 #000, 0.2px 0.2px 0 #000;

    &:focus {
        outline: none;
    }
`;

const WrapperLogin = styled.div`
    display: flex;
    align-items: center;
    gap: 36px;
    position: relative;
`;
