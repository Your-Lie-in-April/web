import ModalPortal from '#/utils/ModalPotal';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { FC, useState } from 'react';
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

const ProjectName = styled(CommonText)`
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
    const { invitationLink } = useInvitationContext();
    const [projectName, setProjectName] = useState<string>('');
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
                            <ProjectName>000000...</ProjectName> 프로젝트에
                            <br />
                            0000이 초대요청을 보냈습니다
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
