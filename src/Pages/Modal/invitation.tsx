import { FC } from 'react';
import styled from 'styled-components';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
const InviteDiv = styled.div`
    display: inline-flex;
    width: 406px;
    height: 182px;
    padding: 16px 20px 8px 20px;
    align-items: flex-start;
    gap: 8px;
    border-radius: 20px;
    background: #f5f5f5;
`;

const TextDiv = styled.div`
    display: flex;
    width: 366px;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;
const ButtonDiv = styled.div`
    display: flex;
    width: 366px;
    flex-direction: row;
    align-items: center;
    margin-top: 12px;
    gap: 4px;
    justify-content: flex-end;
`;

const TitleText = styled.text`
    color: var(--, #000);
    text-align: center;
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;
const AfirmText = styled.text`
    color: var(--, #000);
    text-align: center;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;
const AcceptButton = styled.button`
    width: 60px;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 20px;
    background: #633ae2;
    color: #ffffff;
`;
const DeceptButton = styled.button`
    width: 60px;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 20px;
    background: #d9d9d9;
    color: #ffffff;
`;
const Invitation: FC = () => {
    return (
        <InviteDiv>
            <TextDiv>
                <InfoOutlinedIcon style={{ color: '#eb5757', fontSize: '32' }} />
                <TitleText>000님이 초대를 요청했습니다</TitleText>
                <AfirmText>수락하시겠습니까?</AfirmText>
                <ButtonDiv>
                    <AcceptButton>수락</AcceptButton>
                    <DeceptButton>거절</DeceptButton>
                </ButtonDiv>
            </TextDiv>
        </InviteDiv>
    );
};

export default Invitation;
