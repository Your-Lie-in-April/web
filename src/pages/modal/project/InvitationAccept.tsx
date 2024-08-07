import usePostInvitationMutation from '@hooks/apis/mutations/project/usePostInvitationMutation copy';
import useInviteInfoQuery from '@hooks/apis/queries/project/useInviteInfoQuery';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ProjectInviteMetaInfo } from '@/types/projectType';
import ModalPortal from '@utils/ModalPotal';
import useScrollLock from '@utils/useScrollLock';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ModalBackBlur, ModalContainer } from '../ModalCommon';

const InvitationAccept = () => {
    const [isClick, setIsClick] = useState<boolean>(false);
    const [inviteInfo, setInviteInfo] = useState<ProjectInviteMetaInfo>();
    const { url } = useParams<{ url: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        setIsClick(true);
        return () => setIsClick(false);
    }, []);

    const handleCloseModal = () => {
        setIsClick(false);
        navigate('/', { replace: true });
    };

    const { data: inviteMetaInfo } = useInviteInfoQuery(url || '');
    useEffect(() => {
        if (inviteMetaInfo) {
            setInviteInfo(inviteMetaInfo);
        }
    }, [inviteMetaInfo]);

    const { mutate: acceptInvite } = usePostInvitationMutation(url || '');
    const handleAccept = () => {
        acceptInvite();
        handleCloseModal();
    };

    useScrollLock(isClick);

    return (
        <ModalPortal>
            <ModalBackBlur onClick={handleCloseModal} />
            <ModalContainer>
                <InviteDiv>
                    <TextDiv>
                        <InfoOutlinedIcon style={{ color: '#eb5757', fontSize: '32' }} />
                        <CommonText>
                            <OverflowText>
                                {inviteInfo?.title && inviteInfo.title.length > 8
                                    ? `${inviteInfo.title.slice(0, 8)}...`
                                    : inviteInfo?.title}
                            </OverflowText>
                            &nbsp;프로젝트에
                            <br />
                            <OverflowText>
                                {inviteInfo?.invitator && inviteInfo.invitator.length > 4
                                    ? `${inviteInfo.invitator.slice(0, 4)}...`
                                    : inviteInfo?.invitator}
                            </OverflowText>
                            &nbsp;님이 초대요청을 보냈습니다
                        </CommonText>
                    </TextDiv>
                    <ButtonDiv>
                        <ConfirmBtn onClick={handleAccept}>수락</ConfirmBtn>
                        <DeceptBtn onClick={handleCloseModal}>거절</DeceptBtn>
                    </ButtonDiv>
                </InviteDiv>
            </ModalContainer>
        </ModalPortal>
    );
};

export default InvitationAccept;

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

const CommonText = styled.span`
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
