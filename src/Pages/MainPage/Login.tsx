import { FC } from 'react';
import styled, { keyframes } from 'styled-components';
import Banner from './Banner';
import BeforeLogin from '../Layouts/BeforeLogin';
import { createGlobalStyle } from 'styled-components';
import { redirect } from 'react-router-dom';
import zIndex from '@mui/material/styles/zIndex';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #212121;
    -ms-overflow-style: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;
const summertime_sadness = (
    <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 65 65" fill="none">
        <path
            d="M65 16.25C65 7.27538 57.7246 -3.18017e-07 48.75 -7.1031e-07C39.7752 -1.10261e-06 32.5 7.27537 32.5 16.25C32.5 7.27537 25.2248 -1.73863e-06 16.25 -2.13093e-06C7.27523 -2.52323e-06 -3.18017e-07 7.27537 -7.1031e-07 16.25C-1.10261e-06 25.2248 7.27523 32.5 16.25 32.5C7.27523 32.5 -1.73863e-06 39.7752 -2.13093e-06 48.75C-2.52323e-06 57.7248 7.27523 65 16.25 65C25.2248 65 32.5 57.7248 32.5 48.75C32.5 57.7248 39.7752 65 48.75 65C57.7246 65 65 57.7248 65 48.75C65 39.7752 57.7246 32.5 48.75 32.5C57.7246 32.5 65 25.2248 65 16.25Z"
            fill="#FFCB3C"
        />
    </svg>
);
const stairs = (
    <svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" viewBox="0 0 66 66" fill="none">
        <path d="M16.8711 0.5H0.621094V65.5H65.6211V49.25H49.3711V33H33.1211V16.75H16.8711V0.5Z" fill="#EB5757" />
    </svg>
);

const lightning = (
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="98" viewBox="0 0 56 98" fill="none">
        <path
            d="M43.5057 0.5L0.621094 55.1154H20.403L12.7365 97.8077L55.6211 43.1923H35.8392L43.5057 0.5Z"
            fill="#633AE2"
        />
    </svg>
);

const arrow = (
    <svg xmlns="http://www.w3.org/2000/svg" width="473" height="348" viewBox="0 0 473 348" fill="none">
        <path
            d="M336.938 209.667H0V138.333H336.938L249.36 50.4411L299.621 0L473 174L299.621 348L249.36 297.559L336.938 209.667Z"
            fill="#C2D57A"
        />
    </svg>
);
const biglightning = (
    <svg xmlns="http://www.w3.org/2000/svg" width="253" height="382" viewBox="0 0 253 382" fill="none">
        <path d="M197.269 -66L0 185.447H90.9968L55.7308 382L253 130.553H162.003L197.269 -66Z" fill="#633AE2" />
    </svg>
);
const spring = (
    <svg xmlns="http://www.w3.org/2000/svg" width="253" height="382" viewBox="0 0 253 382" fill="none">
        <path d="M197.269 -66L0 185.447H90.9968L55.7308 382L253 130.553H162.003L197.269 -66Z" fill="#633AE2" />
    </svg>
);
const bigsummertime_sadness = (
    <svg xmlns="http://www.w3.org/2000/svg" width="319" height="412" viewBox="0 0 319 412" fill="none">
        <path
            d="M410 103C410 46.1147 364.109 -2.00595e-06 307.5 -4.48042e-06C250.89 -6.95492e-06 205 46.1147 205 103C205 46.1147 159.11 -1.09667e-05 102.5 -1.34413e-05C45.89 -1.59158e-05 2.85018e-05 46.1147 2.60153e-05 103C2.35287e-05 159.886 45.8899 206 102.5 206C45.8899 206 1.94973e-05 252.114 1.70108e-05 309C1.45242e-05 365.886 45.8899 412 102.5 412C159.11 412 205 365.886 205 309C205 365.886 250.89 412 307.5 412C364.109 412 410 365.886 410 309C410 252.114 364.109 206 307.5 206C364.109 206 410 159.886 410 103Z"
            fill="#FFCB3C"
        />
    </svg>
);

const slideAnimation = keyframes`
    0% {
        transform: translateX(0%);
    }
    100% {
        transform: translateX(-100%);
    }
`;

const Container = styled.div`
    width: 100%;
    overflow: hidden;
`;

const BannerWrapper = styled.div`
    display: flex;
    width: 300%;
`;

const BannerDiv = styled.div`
    flex: 1;
    white-space: nowrap;
    animation: ${slideAnimation} 30s linear infinite;
`;

const BannerText = styled.div`
    color: #fff;
    font-family: Pretendard;
    font-size: 98px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
    padding: 0 20px;
`;

const LoginBanner = styled.div`
    width: 456px;
    height: 244px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 102px;
    margin-top: 104px;
    margin-left: 732px;
`;
const Google = styled.button`
    width: 440px;
    height: 88px;
    border-radius: 60px;
    background: #fff;
    text-align: center;
    font-family: Roboto;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;
const GoogleLogin = styled.div`
    display: flex;
    align-items: center;
    gap: 86px;
    position: relative;
    top: -5px;
    left: -30px;
`;
const googleLogo = 'src/pics/google-logo-9808 1.png';
const Login: FC = () => {
    const URL = 'https://timepiece-server.inuappcenter.kr';
    const oAuth = async () => {
        try {
            const res = await fetch(URL + `/v1/oauth2/login-page/google`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            if (res.status === 200) {
                console.log('보냄');
            }
        } catch {}
    };
    return (
        <>
            <GlobalStyle />
            <div>
                <BeforeLogin />
                <Container>
                    <BannerWrapper>
                        <BannerDiv>
                            <BannerText style={{ marginLeft: '249px', zIndex: '2' }}>
                                make our{stairs} cORE time table Let's start{summertime_sadness} the project make our
                                cORE time table{lightning} Let's start the project
                            </BannerText>
                        </BannerDiv>
                    </BannerWrapper>
                </Container>
                <LoginBanner>
                    <div>
                        <text style={{ color: '#fff', textAlign: 'center', fontSize: '32px', fontWeight: '700' }}>
                            Sign up
                        </text>
                    </div>
                    <div>
                        <Google>
                            <GoogleLogin onClick={oAuth}>
                                <img src={googleLogo} />
                                구글로그인
                            </GoogleLogin>
                        </Google>
                    </div>
                </LoginBanner>
                <Container style={{ marginTop: '391px' }}>
                    <BannerWrapper>
                        <BannerDiv>
                            <BannerText style={{ marginLeft: '1307px', zIndex: '1' }}>
                                make our{stairs} cORE time table Let's start{summertime_sadness} the project make our
                                cORE time table{lightning} Let's start the project
                            </BannerText>
                        </BannerDiv>
                    </BannerWrapper>
                </Container>
            </div>
            {/* <div style={{ position: 'absolute', top: '467px', zIndex: '1' }}>{arrow}</div>
            <div style={{ position: 'absolute', top: '-66px', left: '524px' }}>{biglightning}</div> */}
        </>
    );
};

export default Login;
