import { Http } from '#/constants/backendURL';
import { MemberEntity } from '#/Types/membertype';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChangeNickName from '../../Modal/ChangeNickname';

const MyProfileBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
`;

const ImageDiv = styled.div`
    width: 68px;
    height: 68px;
    border-radius: 40px;
    background: #aeaeae;
    overflow: hidden;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const MyProfileNick = styled.div`
    display: flex;
    width: 168px;
    padding: 8px;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    box-sizing: border-box;
    border-radius: 10px;
    background: #633ae2;
    color: #ffffff;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const EditButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    &:focus {
        border: none;
        outline: none;
    }
`;

const EditIcon = styled(BorderColorOutlinedIcon)`
    width: 22px;
    height: 22px;
    color: #b79fff;
`;

const MyEmailText = styled.div`
    color: #fff;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const MyStatus = styled.div`
    width: 100%;
    height: 30px;
    padding: 7px 13px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background: #ffffff;
    box-sizing: border-box;

    color: #000000;
    text-align: center;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const CommonText = styled.div`
    color: #000000;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;
const defaultImg = 'src/pics/default.png';
const MyProfile = () => {
    const [isEditModal, setIsEditModal] = useState(false);
    const [me, setMe] = useState<MemberEntity>();
    const memberId = localStorage.getItem('member_id');
    const [nick, setNick] = useState(me?.nickname);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const fetchMe = async () => {
            const url = `${Http}/v1/members/${memberId}`;
            const headers = {
                Accept: '*/*',
                Authorization: `Bearer ${accessToken}`,
            };

            try {
                const response = await fetch(url, { headers });
                if (!response.ok) {
                    throw new Error('데이터 가져오기 실패');
                }
                const data = await response.json();
                setMe(data.data);
                console.log('본인 데이터:', data);
            } catch (error) {
                console.error('API 요청 중 에러 발생:', error);
            }
        };
        fetchMe();
    }, [memberId]);
    useEffect(() => {
        if (me) {
            setNick(me.nickname);
        }
    }, [me]);

    const handleNickChange = (newNick: string) => {
        setNick(newNick);
    };

    const onSetIsEditModal = () => {
        setIsEditModal((prev) => !prev);
    };

    return (
        <>
            <MyProfileBox>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        gap: '22px',
                    }}
                >
                    <ImageDiv>
                        <StyledImage src={me?.profileImageUrl || defaultImg} alt="Profile Image" />
                    </ImageDiv>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '10px',
                        }}
                    >
                        <MyProfileNick>
                            <div
                                style={{
                                    width: '144px',
                                    height: '22px',
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <CommonText
                                    style={{
                                        width: '106px',
                                        fontSize: '14px',
                                        color: '#ffffff',
                                    }}
                                >
                                    {nick}
                                </CommonText>
                                <EditButton onClick={onSetIsEditModal}>
                                    <EditIcon />
                                </EditButton>
                            </div>
                        </MyProfileNick>
                        <MyEmailText>{me?.email}</MyEmailText>
                    </div>
                </div>
                <MyStatus>{me?.state}</MyStatus>
            </MyProfileBox>
            <ChangeNickName
                onSetIsEditModal={onSetIsEditModal}
                onNickChange={handleNickChange}
                isEditModal={isEditModal}
            />
        </>
    );
};
export default MyProfile;
