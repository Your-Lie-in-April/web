import { MemberEntity } from '@/types/memberType';
import useDeleteProjectMemberMutation from '@hooks/apis/mutations/project/useDeleteProjectMemberMutation';
import useScrollLock from '@hooks/useScrollLock';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ModalPortal from '@utils/modalPortal';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ModalBlackOut, ModalContainer } from '..';

interface DeleteMemberProps {
    deleteMemModal: boolean;
    onSetDeleteMemModal: () => void;
    member: MemberEntity;
}

const DeleteMember: React.FC<DeleteMemberProps> = ({
    deleteMemModal,
    onSetDeleteMemModal,
    member,
}) => {
    useScrollLock(deleteMemModal);
    const { projectId } = useParams<{ projectId: string }>();

    const { mutate } = useDeleteProjectMemberMutation(Number(projectId), Number(member?.memberId));

    const handleDeleteMember = () => {
        if (member.memberId) {
            mutate();
        }
        onSetDeleteMemModal();
    };

    return (
        <>
            {deleteMemModal && (
                <ModalPortal>
                    <ModalBlackOut onClick={onSetDeleteMemModal} />
                    <ModalContainer>
                        <Box>
                            <OuterColumn>
                                <InnerColumn>
                                    <InfoCircleIcon sx={{ fontSize: '32px' }} />
                                    <MemberNick>{member?.nickname}</MemberNick>
                                    <Title>프로젝트에서 내보내겠습니까?</Title>
                                </InnerColumn>
                                <ButtonsContainer style={{ alignSelf: 'flex-end' }}>
                                    <ConfirmBtn onClick={handleDeleteMember}>확인</ConfirmBtn>
                                    <CancelBtn onClick={onSetDeleteMemModal}>취소</CancelBtn>
                                </ButtonsContainer>
                            </OuterColumn>
                        </Box>
                    </ModalContainer>
                </ModalPortal>
            )}
        </>
    );
};
export default DeleteMember;

const Box = styled.div`
    min-width: 406px;
    height: 182px;
    border-radius: 20px;
    background: #f5f5f5;
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 16px 20px 8px 20px;
    box-sizing: border-box;
`;

const OuterColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: 100%;
`;

const InnerColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 100%;
`;

const InfoCircleIcon = styled(InfoOutlinedIcon)`
    width: 32px;
    height: 32px;
    color: #eb5757;
`;

const CommonText = styled.span`
    color: #000000;
    text-align: center;
    font-family: 'Pretendard';
    line-height: normal;
`;

const MemberNick = styled(CommonText)`
    font-size: 28px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 8ch;
`;

const Title = styled(CommonText)`
    font-size: 24px;
    font-weight: 400;
`;

const Button = styled.button`
    display: flex;
    width: 60px;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: '20px';
    font-family: 'Pretendard';
    font-size: 13px;
    font-weight: 500;
    line-height: normal;

    &:focus {
        border: none;
        outline: none;
    }
`;

const ConfirmBtn = styled(Button)`
    background: #633ae2;
    color: #ffffff;
`;

const CancelBtn = styled(Button)`
    background: #d9d9d9;
    color: #ffffff;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 4px;
`;
