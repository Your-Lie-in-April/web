import styled, { keyframes } from 'styled-components';
import { FC } from 'react';

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

const slideAnimation = keyframes`
    0% {
        transform: translateX(0%);
    }
    100% {
        transform: translateX(-100%);
    }
`;

const Container = styled.div`
    width: 100vw;
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
const Banner: FC = () => {
    return (
        <Container>
            <BannerWrapper>
                <BannerDiv>
                    <BannerText style={{ marginLeft: '249px' }}>
                        make our{stairs} cORE time table Let's start{summertime_sadness} the project make our cORE time
                        table{lightning} Let's start the project
                    </BannerText>
                    <BannerText style={{ marginLeft: '1307px' }}>
                        make our{stairs} cORE time table Let's start{summertime_sadness} the project make our cORE time
                        table{lightning} Let's start the project
                    </BannerText>
                </BannerDiv>
                <BannerDiv>
                    <BannerText style={{ marginLeft: '249px' }}>
                        make our{stairs} cORE time table Let's start{summertime_sadness} the project make our cORE time
                        table{lightning} Let's start the project
                    </BannerText>
                    <BannerText style={{ marginLeft: '1307px' }}>
                        make our{stairs} cORE time table Let's start{summertime_sadness} the project make our cORE time
                        table{lightning} Let's start the project
                    </BannerText>
                </BannerDiv>
            </BannerWrapper>
        </Container>
    );
};

export default Banner;
