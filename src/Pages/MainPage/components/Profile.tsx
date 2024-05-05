import { Http } from '#/constants/backendURL';
import { access } from 'fs';
import { MemberEntity } from '../../../Types/member';
import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const defaultImg = 'src/pics/default.png';
const LoginDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 218px;
    border-radius: 10px;
    background-color: #ffffff;
`;

const ImageDiv = styled.div`
    width: 112px;
    height: 112px;
    margin-top: 16px;
    border-radius: 200px;
    overflow: hidden;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Text = styled.div`
    font-family: 'pretendard';
    font-weight: 500;
    font-size: 14px;
    color: black;
    margin-top: 12px;
`;

const Profile: FC = () => {
    const [userData, setUserData] = useState<MemberEntity>();
    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const memberId = localStorage.getItem('member_id');
        console.log(accessToken);
        console.log(memberId);
        const fetchUser = async () => {
            try {
                const response = await fetch(Http + `/v1/members/${memberId}`, {
                    method: 'GET',
                    headers: {
                        Accept: '*/*',
                        Authorization: `Bearer ${accessToken}'`,
                    },
                });
                const data = await response.json();
                console.log(data);
                setUserData(data?.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchUser();
    }, []);

    return (
        <LoginDiv>
            <ImageDiv>
                <StyledImage src={userData?.profileImageUrl || defaultImg} alt="Profile Image" />
            </ImageDiv>
            <Text>{userData?.email}</Text>
            <Text>{userData ? userData.state : '로그인 되어 있지 않음'}</Text>
        </LoginDiv>
    );
};

export default Profile;
