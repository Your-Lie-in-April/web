import { Toast } from '@components/layout';
import usePostLinkMutation from '@hooks/apis/mutations/project/usePostLinkMutation';
import useScrollLock from '@hooks/useScrollLock';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppDispatch, useAppSelector } from '@redux/config/hook';
import { RootState } from '@redux/config/store';
import { setInvitationLink } from '@redux/slice/invite';
import ModalPortal from '@utils/modalPortal';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ConfirmCopyLink from './ConfirmCopyLink';

interface InvitationLinkModalProps {
    toggleBtn: () => void;
}

const InvitationLinkModal: React.FC<InvitationLinkModalProps> = ({ toggleBtn }) => {
    const dispatch = useAppDispatch();
    const [link, setLink] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
    const [isBtnClick, setIsBtnClick] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [showConfirmCopyLink, setShowConfirmCopyLink] = useState<boolean>(false);
    const [isModalCompleteHidden, setIsModalCompleteHidden] = useState<boolean>(false);
    const [isDropOpen, setIsDropOpen] = useState<boolean>(false);
    const expireTimeList = ['30분', '1시간', '6시간', '1일', '7일', '만료기간 없음'];
    const [expireTime, setExpireTime] = useState<string>(expireTimeList[expireTimeList.length - 1]);

    const projectData = useAppSelector((state: RootState) => state.project.projectData);

    const handleSetIsDropOpen = () => {
        setIsDropOpen(!isDropOpen);
    };

    const handleSetSelectTime = (time: string) => {
        setExpireTime(time);
        setIsDropOpen(false);
    };

    const baseUrl =
        process.env.NODE_ENV === 'development'
            ? `http://localhost:${window.location.port}`
            : 'https://timepiece.inuappcenter.kr';

    const { projectId } = useParams();
    const { mutate } = usePostLinkMutation(Number(projectId));
    const makeInvitation = () => {
        mutate(undefined, {
            onSuccess: (data) => {
                const newLink = `${baseUrl}/invitation/${data.link}`;
                setLink(newLink);
                dispatch(setInvitationLink(newLink));
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
        }, 1000);
    };

    // Clipboard API를 이용해 초대링크 복사
    const onClickCopyLink = async (url: string) => {
        if (url === '') {
            Toast('초대 링크를 생성해 주세요', 'warning');
            return;
        }
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
                                <RowWrapper>
                                    <ExpireTimeDiv>
                                        <CommonText>링크 유효기간</CommonText>
                                        <DropDownBox onClick={handleSetIsDropOpen}>
                                            <UlWrapper>
                                                <div style={{ width: '38px', height: '100%' }} />
                                                <UlStyled>
                                                    <LiSelectedStyled>
                                                        {expireTime}
                                                    </LiSelectedStyled>
                                                </UlStyled>
                                                {isDropOpen ? (
                                                    <ExpandLessIcon />
                                                ) : (
                                                    <ExpandMoreIcon />
                                                )}
                                            </UlWrapper>
                                            {isDropOpen && (
                                                <TimeSelectBox>
                                                    <UlStyled>
                                                        {expireTimeList.map((time) => (
                                                            <LiSelectedStyled
                                                                key={time}
                                                                onClick={() =>
                                                                    handleSetSelectTime(time)
                                                                }
                                                            >
                                                                {time}
                                                            </LiSelectedStyled>
                                                        ))}
                                                    </UlStyled>
                                                </TimeSelectBox>
                                            )}
                                        </DropDownBox>
                                    </ExpireTimeDiv>
                                    <ButtonsContainer>
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
                                </RowWrapper>
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

const RowWrapper = styled.div`
    width: 400px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ExpireTimeDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
`;

const DropDownBox = styled.div`
    width: 132px;
    height: 24px;
    border-radius: 20px;
    background-color: #d9d9d9;
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    flex-shrink: 0;
    box-sizing: border-box;
    position: relative;
    color: #000000;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
    padding-right: 6px;
`;

const UlWrapper = styled.div`
    width: 100%;
    max-width: 208px;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    cursor: pointer;
`;

const TimeSelectBox = styled.div`
    width: 132px;
    height: 120px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    border-radius: 10px;
    background: #f5f5f5;
    z-index: 3;
    overflow-y: auto;
    position: absolute;
    top: calc(100% + 4px);
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    text-align: center;

    ::-webkit-scrollbar {
        display: none;
    }

    li {
        display: flex;
        align-items: center;
        justify-content: center;
        list-style: none;
        width: 100%;
        height: 20px;
        text-align: center;
        color: #7d7d7d;
        font-size: 14px;
    }

    li:hover {
        background: #633ae2;
        color: #ffffff;
    }
`;

const UlStyled = styled.ul`
    width: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LiSelectedStyled = styled.li`
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const CommonText = styled.span`
    color: #7d7d7d;
    text-align: center;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;
