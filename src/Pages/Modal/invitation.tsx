import { Http } from '#/constants/backendURL';
import { ProjectInviteMetaInfo } from '#/Types/projecttype';
import ModalPortal from '#/utils/ModalPotal';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useInvitationContext } from '../ProjectPage/invitationContext';
import { ModalBackBlur, ModalContainer } from './ModalCommon';

const InviteDiv = styled.div`
    min-width: 504px;
    min-height: 158px;
    border-radius: 20px;
    background: #f5f5f5;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 16px 20px 8px 20px;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: 100%;
`;

const TextDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 100%;
`;

const CommonText = styled.text`
    color: #000000;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const OverflowText = styled(CommonText)`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const ButtonDiv = styled.div`
    display: flex;
    gap: 4px;
    justify-content: flex-end;
    align-self: flex-end;
`;

const Button = styled.button`
    display: flex;
    width: 60px;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 20px;
    font-family: Pretendard;
    font-size: 13px;
    font-weight: 500;
    line-height: normal;
`;

const ConfirmBtn = styled(Button)`
    background: #633ae2;
    color: #ffffff;
`;

const DeceptBtn = styled(Button)`
    background: #d9d9d9;
    color: #ffffff;
`;

const Invitation: FC = () => {
    const [inviteInfo, setInviteInfo] = useState<ProjectInviteMetaInfo>();
    const { invitationLink } = useInvitationContext();
    console.log(invitationLink);
    const acceptInvite = async (invitationLink: string) => {
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await fetch(invitationLink, {
                method: 'POST',
                headers: {
                    accept: '*/*',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('초대 수락에 실패했습니다.');
            }
        } catch (error) {
            console.error('초대 수락 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        const getMetaInviteInfo = async () => {
            const accessToken = localStorage.getItem('access_token');
            const url = `${Http}/v1/projects/invitations?url=${invitationLink}`;
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
                setInviteInfo(data.data);
            } catch (error) {
                console.error('API 요청 중 에러 발생:', error);
            }
        };
        getMetaInviteInfo();
    }, []);

    return (
        <ModalPortal>
            <ModalBackBlur />
            <ModalContainer>
                <InviteDiv>
                    <TextDiv>
                        <InfoOutlinedIcon
                            style={{ color: '#eb5757', fontSize: '32' }}
                        />
                        <CommonText>
                            <OverflowText>
                                {inviteInfo?.title &&
                                inviteInfo.title.length > 8
                                    ? `${inviteInfo.title.slice(0, 8)}...`
                                    : inviteInfo?.title}
                            </OverflowText>
                            프로젝트에
                            <br />
                            <OverflowText>
                                {inviteInfo?.invitator &&
                                inviteInfo.invitator.length > 4
                                    ? `${inviteInfo.invitator.slice(0, 4)}...`
                                    : inviteInfo?.invitator}
                            </OverflowText>
                            이 초대요청을 보냈습니다
                        </CommonText>
                    </TextDiv>
                    <ButtonDiv>
                        <ConfirmBtn
                            onClick={() => acceptInvite(invitationLink)}
                        >
                            수락
                        </ConfirmBtn>
                        <DeceptBtn>거절</DeceptBtn>
                    </ButtonDiv>
                </InviteDiv>
            </ModalContainer>
        </ModalPortal>
    );
};

export default Invitation;
