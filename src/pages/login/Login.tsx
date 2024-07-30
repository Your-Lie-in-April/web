import { Http } from '@constants/api';
import BeforeLogin from '@pages/layouts/header/BeforeLogin';
import { BannerDown, BannerTop } from '@pages/main/components/Banner';
import googleLogo from '@pics/google-login.svg';
import { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import GraphicIcons from './icons/GraphicIcons';

const GlobalStyle = createGlobalStyle`
  body {
    width : 100%;
    min-width : 1366px;
    min-height: 1366px;
    margin: 0 auto;
    background-color: #212121;
    -ms-overflow-style: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }
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

const Google = styled.button`
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

const Login: FC = () => {
    const oAuth = () => {
        window.location.href = Http + '/oauth2/authorization/google';
    };

    return (
        <>
            <GlobalStyle />
            <div
                style={{
                    position: 'relative',
                    overflowX: 'clip',
                    backgroundColor: '#212121',
                    minHeight: '100vh',
                }}
            >
                <GraphicIcons />
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <BeforeLogin />
                    <BannerTop />
                    <div style={{ height: '104px', width: '100%' }} />
                    <LoginBanner>
                        <span
                            style={{
                                color: '#fff',
                                textAlign: 'center',
                                fontSize: '32px',
                                fontWeight: '700',
                            }}
                        >
                            Sign up
                        </span>
                        <Google onClick={oAuth}>
                            <GoogleLogin>
                                <img src={googleLogo} alt='Google Logo' />
                                구글로그인
                            </GoogleLogin>
                        </Google>
                    </LoginBanner>
                    <div style={{ height: '391px', width: '100%' }} />
                    <BannerDown />
                </div>
            </div>
        </>
    );
};

export default Login;
