import styled from 'styled-components';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useState } from 'react';
import ChangeStatus from './ChangeStatus';
import { useNavigate } from 'react-router-dom';

const Box = styled.div`
    width: 300px;
    height: 244px;
    border-radius: 20px;
    background: #212121;
    position: absolute;
    top: 100%;
    left: -205px;

    display: inline-flex;
    padding: 12px 8px;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 22px;
    box-sizing: border-box;
    z-index: 2;

    margin-top: 1.5rem;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
`;

const StyleCloseIconBtn = styled(CancelOutlinedIcon)`
    position: absolute;
    top: 12px;
    right: 8px;
    color: #a4a4a4;
`;

const MyImg = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #aeaeae;
`;

const MyEmailText = styled.text`
    color: #ffffff;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const StatusBox = styled.div`
    width: 268px;
    height: 30px;
    border-radius: 20px;
    background: #ffffff;
    padding: 4px 12px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const StatusText = styled.text`
    color: #000000;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    flex-grow: 1;

    overflow: hidden;
    text-overflow: ellipsis;
`;

const EditButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    flex-basis: 10%;

    &: focus {
        border: none;
        outline: none;
    }
`;

const EditIcon = styled(BorderColorOutlinedIcon)`
    width: 22px;
    height: 22px;
    color: #7d7d7d;
`;

const StorageBtn = styled.button`
    display: flex;
    width: 120px;
    height: 30px;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background: #633ae2;

    color: #ffffff;
    text-align: center;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    &:focus {
        outline: none;
    }
`;

interface MyPageModalProps {
    onSetIsMyPageModal: () => void;
}

const MyPageModal: React.FC<MyPageModalProps> = ({ onSetIsMyPageModal }) => {
    const [editStatusModal, setEditStatusModal] = useState(false);

    const onSetEditStatusModal = () => {
        setEditStatusModal((prev) => !prev);
    };

    const navigate = useNavigate();
    const handlemyproject = () => {
        navigate('/myproject');
    };
    return (
        <>
            <Box>
                <CloseButton onClick={onSetIsMyPageModal}>
                    <StyleCloseIconBtn sx={{ fontSize: '24px' }} />
                </CloseButton>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <MyImg />
                    <MyEmailText>----------@gmail.com</MyEmailText>
                </div>
                <StatusBox>
                    <div style={{ justifyContent: 'flex-start', flexBasis: '10%' }} />
                    <StatusText>현재 상태메시지</StatusText>
                    <EditButton onClick={onSetEditStatusModal}>
                        <EditIcon />
                    </EditButton>
                </StatusBox>
                <StorageBtn onClick={handlemyproject}>프로젝트 보관함</StorageBtn>
            </Box>
            {editStatusModal && <ChangeStatus onSetEditStatusModal={onSetEditStatusModal} />}
        </>
    );
};
export default MyPageModal;
