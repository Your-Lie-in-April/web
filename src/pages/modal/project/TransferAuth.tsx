import { MemberEntity } from '@/types/memberType';
import usePatchPojectPrevilegeMutation from '@hooks/apis/mutations/project/usePatchPojectPrevilegeMutation';
import useAllMemberInfoQuery from '@hooks/apis/queries/member/useAllMemberInfoQuery';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ModalPortal from '@utils/ModalPotal';
import useScrollLock from '@utils/useScrollLock';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ModalBlackOut, ModalContainer } from '../ModalCommon';

interface TransferAuthModalProps {
    isAuthClick: boolean;
    onIsAuthClick: () => void;
}
const TransferAuthModal: React.FC<TransferAuthModalProps> = ({ isAuthClick, onIsAuthClick }) => {
    const { projectId } = useParams<{ projectId: string }>();
    const [selectMem, setSelectMem] = useState<string>();
    const [selectId, setSelectId] = useState<number>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { data: members } = useAllMemberInfoQuery(Number(projectId));
    const nonPrivilegedMembers = members?.filter((member) => !member.isPrivileged);
    useEffect(() => {
        if (members) {
            if (nonPrivilegedMembers && nonPrivilegedMembers.length > 0) {
                if (nonPrivilegedMembers[0].nickname) {
                    setSelectMem(nonPrivilegedMembers[0].nickname);
                }
                setSelectId(nonPrivilegedMembers[0].memberId);
            }
        }
    }, [members]);

    const handleSetSelectMem = (mem: MemberEntity) => {
        if (mem.nickname !== undefined && mem.memberId !== undefined) {
            setSelectMem(mem.nickname);
            setSelectId(mem.memberId);
            setIsOpen(false);
        }
    };

    const handleClose = () => {
        onIsAuthClick();
        setIsOpen(false);
    };

    const handleSetIsOpen = () => {
        setIsOpen(!isOpen);
    };

    const { mutate } = usePatchPojectPrevilegeMutation(Number(projectId));
    const handleConfirm = async () => {
        if (selectId) {
            mutate(selectId);
            handleClose();
        }
    };

    useScrollLock(isAuthClick);

    return (
        <>
            {isAuthClick && (
                <ModalPortal>
                    <ModalBlackOut onClick={handleClose} />
                    <ModalContainer>
                        <Box>
                            <OuterColumn>
                                <InnerColumn>
                                    <InfoCircleIcon sx={{ fontSize: '32px' }} />
                                    <MemPickDiv onClick={handleSetIsOpen}>
                                        <UlWrapper>
                                            <UlStyled onClick={handleSetIsOpen}>
                                                <li style={{width : '100%'}}>{selectMem}</li>
                                            </UlStyled>
                                            {isOpen ? (
                                                <StyledExpandLessIcon />
                                            ) : (
                                                <StyledExpandMoreIcon />
                                            )}
                                        </UlWrapper>
                                        {isOpen && nonPrivilegedMembers && (
                                            <MemDropdown>
                                                {nonPrivilegedMembers.map((mem) => (
                                                    <li
                                                        key={mem.memberId}
                                                        onClick={() => handleSetSelectMem(mem)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        {mem.nickname}
                                                    </li>
                                                ))}
                                            </MemDropdown>
                                        )}
                                    </MemPickDiv>
                                    <CommonText>
                                        <MemberNick>{selectMem}</MemberNick> &nbsp;에게 권한을
                                        양도하겠습니까?
                                    </CommonText>
                                </InnerColumn>
                                <ButtonsContainer>
                                    <ConfirmBtn onClick={handleConfirm}>확인</ConfirmBtn>
                                    <CancelBtn onClick={handleClose}>취소</CancelBtn>
                                </ButtonsContainer>
                            </OuterColumn>
                        </Box>
                    </ModalContainer>
                </ModalPortal>
            )}
        </>
    );
};
export default TransferAuthModal;

const Box = styled.div`
    width: 406px;
    min-height: 181px;
    border-radius: 20px;
    background: #f5f5f5;
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0px 8px 0px;
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

const UlWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
`;

const UlStyled = styled.ul`
    max-width: 160px;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const StyledExpandLessIcon = styled(ExpandLessIcon)`
    font-size: 12px;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 10px;
`;

const StyledExpandMoreIcon = styled(ExpandMoreIcon)`
    font-size: 12px;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 10px;
`;

const MemPickDiv = styled.div`
    width: 208px;
    height: 32px;
    padding: 4px;
    display: flex;
    gap: 12px;
    box-sizing: border-box;
    color: #000000;
    font-size: 20px;
    text-align: center;
    position: relative;
`;

const MemDropdown = styled.div`
    width: 208px;
    max-height: 124px;
    border-radius: 5px;
    background: #f5f5f5;
    z-index: 3;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    position: absolute;
    top: 40px;
    right: 0;
    box-sizing: border-box;

    ::-webkit-scrollbar {
        display: none;
    }

    li {
        display: flex;
        align-items: center;
        justify-content: center;
        list-style: none;
        width: 100%;
        height: 30px;
        text-align: center;
        color: #7d7d7d;
        font-size: 24px;
    }

    li:hover {
        background: #633ae2;
        color: #ffffff;
    }
`;

const CommonText = styled.text`
    color: #000000;
    text-align: center;
    font-family: 'Pretendard';
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    align-items: center;
`;

const MemberNick = styled(CommonText)`
    font-size: 20px;
`;

const Button = styled.button.attrs({ type: 'button' })`
    display: flex;
    width: 60px;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 20px;
    font-family: 'Pretendard';
    font-size: 13px;
    font-weight: 500;
    line-height: normal;
    border: none;
    &:focus {
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
    align-self: flex-end;
    padding: 0 20px 0 20px;
`;
