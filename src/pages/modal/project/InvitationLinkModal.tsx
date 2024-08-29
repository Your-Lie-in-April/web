import usePostLinkMutation from '@hooks/apis/mutations/project/usePostLinkMutation';
import { useInvitationContext } from '@hooks/context/invitationContext';
import { useProjectContext } from '@hooks/context/projectContext';
import { Toast } from '@pages/layouts/Toast';
import ModalPortal from '@utils/ModalPotal';
import useScrollLock from '@utils/useScrollLock';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ConfirmCopyLink from './ConfirmCopyLink';

interface InvitationLinkModalProps {
    toggleBtn: () => void;
}

const InvitationLinkModal: React.FC<InvitationLinkModalProps> = ({ toggleBtn }) => {
    const { invitationLink, setInvitationLink } = useInvitationContext();
    const [link, setLink] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
    const [isBtnClick, setIsBtnClick] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [showConfirmCopyLink, setShowConfirmCopyLink] = useState<boolean>(false);
    const [isModalCompleteHidden, setIsModalCompleteHidden] = useState<boolean>(false);

    const { projectData } = useProjectContext();

    const baseUrl =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:5173'
            : 'https://timepiece.inuappcenter.kr';

    const { projectId } = useParams();
    const { mutate } = usePostLinkMutation(Number(projectId));
    const makeInvitation = () => {
        mutate(undefined, {
            onSuccess: (data) => {
                const newLink = `${baseUrl}/invitation/${data.link}`;
                setLink(newLink);
                setInvitationLink(newLink);
            },
        });
    };

    // 링크 생성 로직
    const generateLink = () => {
        setIsBtnClick(false);
        makeInvitation();
    };

    // 복사 버튼 클릭시 모달 닫기
    const closeModal = () => {
        setIsVisible(false);
        setTimeout(() => {
            setIsModalCompleteHidden(true);
            setShowConfirmCopyLink(true);
            setIsModalOpen(false);
            setTimeout(() => {
                console.log('invitationLink in closeModal:', invitationLink);
            }, 100);
        }, 1000);
    };

    // Clipboard API를 이용해 초대링크 복사
    const onClickCopyLink = async (url: string) => {
        try {
            await navigator.clipboard.writeText(url);
            setIsBtnClick(true);
            closeModal();
        } catch (e) {
            Toast('초대코드 복사에 실패했습니다😭', 'error');
        }
    };

    useScrollLock(isModalOpen);

    return (
        <>
            {!isModalCompleteHidden && (
                <ModalPortal>
                    <ModalBlackOut $isVisible={isVisible} onClick={toggleBtn} />
                    <ModalContainer $isVisible={isVisible}>
                        <Box>
                            <ColumnWrapper>
                                <ColumnWrapper>
                                    <Title>{projectData?.title}</Title>
                                    <InviteField value={link} readOnly />
                                </ColumnWrapper>
                                <ButtonsContainer style={{ alignSelf: 'flex-end' }}>
                                    <CommonButton $primary={!isBtnClick} onClick={generateLink}>
                                        링크생성
                                    </CommonButton>
                                    <CommonButton
                                        $primary={isBtnClick}
                                        onClick={() => onClickCopyLink(link)}
                                    >
                                        링크복사
                                    </CommonButton>
                                </ButtonsContainer>
                            </ColumnWrapper>
                        </Box>
                    </ModalContainer>
                </ModalPortal>
            )}
            {showConfirmCopyLink && <ConfirmCopyLink />}
        </>
    );
};

export default InvitationLinkModal;

interface CommonButtonProps {
    $primary?: boolean;
    onClick?: () => void;
}

const ModalBlackOut = styled.div<{ $isVisible: boolean }>`
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, ${({ $isVisible }) => ($isVisible ? '0.5' : '0')});
    z-index: 100;
    transition: background 1s ease;
`;

const ModalContainer = styled.div<{ $isVisible: boolean }>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
    transition: opacity 1s ease;
    z-index: 999;
`;

const Box = styled.div`
    width: 504px;
    height: 167px;
    border-radius: 20px;
    background: #f5f5f5;
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 16px 20px 20px 20px;
    box-sizing: border-box;
`;

const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    width: 100%;
    height: 100%;
`;

const Title = styled.div`
    width: 100%;
    color: #000000;
    font-family: 'Pretendard';
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
`;

const InviteField = styled.input`
    width: 400px;
    height: 32px;
    border-radius: 20px;
    background: #ffffff;
    color: #7d7d7d;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding: 9px 16px;
    box-sizing: border-box;
    text-align: center;
    padding: 9px;
    justify-content: center;
    align-items: center;
    border: none;
`;

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 4px;
`;

const CommonButton = styled.button.attrs({ type: 'button' })<CommonButtonProps>`
    display: flex;
    width: 72px;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 20px;
    font-family: 'Pretendard';
    font-size: 13px;
    font-weight: 500;
    line-height: normal;
    color: #ffffff;
    background-color: ${(props) => (props.$primary ? '#633AE2' : '#d9d9d9')};

    &:focus {
        border: none;
        outline: none;
    }
`;
