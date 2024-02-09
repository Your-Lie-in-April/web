import styled, { keyframes } from 'styled-components';
import { FC } from 'react';

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
    width: 300%; /* BannerDiv가 3개이므로 너비는 3배로 설정 */
`;

const BannerDiv = styled.div`
    flex: 1;
    white-space: nowrap;
    animation: ${slideAnimation} 30s linear infinite; /* 애니메이션 적용 (30초 동안 왼쪽에서 오른쪽으로 이동, 무한 반복) */
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
                        make our cORE time table Let's start the project make our cORE time table Let's start the
                        project
                    </BannerText>
                    <BannerText style={{ marginLeft: '1307px' }}>
                        make our cORE time table Let's start the project make our cORE time table Let's start the
                        project
                    </BannerText>
                </BannerDiv>
                <BannerDiv>
                    <BannerText style={{ marginLeft: '249px' }}>
                        make our cORE time table Let's start the project make our cORE time table Let's start the
                        project
                    </BannerText>
                    <BannerText style={{ marginLeft: '1307px' }}>
                        make our cORE time table Let's start the project make our cORE time table Let's start the
                        project
                    </BannerText>
                </BannerDiv>
            </BannerWrapper>
        </Container>
    );
};

export default Banner;
