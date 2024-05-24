import styled from 'styled-components';
import EditMyTime from './EditMyTime';
import React, { useContext, useState } from 'react';
import { DateContext } from '#/hooks/context/dateContext';
import { formatScheduleData } from '../formatScheduleData';

const ModalBlackOut = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    background: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
`;

const Box = styled.div`
    width: 876px;
    height: 389px;
    background-color: #ffffff;
    border-radius: 20px;
    border: 1px solid #000000;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    padding: 4px 1px 3px 1px;

    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 21px;
    align-items: center;
    justify-content: flex-end;
`;

const CommonText = styled.div`
    color: #000000;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const Title = styled(CommonText)`
    width: 240px;
    height: 32px;
    border-radius: 20px;
    padding: 4px 20px;
    justify-content: center;
    align-items: center;
    background-color: #633ae2;
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    box-sizing: border-box;
`;

const ConfirmBtn = styled.button`
    width: 297px;
    height: 64px;
    border-radius: 60px;
    background: #633ae2;
    box-sizing: border-box;
    color: #ffffff;
    text-align: center;
    font-family: Pretendard;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    display: flex;
    justify-content: center;
    align-items: center;

    &: focus {
        outline: none;
    }
`;

interface SelectedSlot {
    date: string;
    hour: number;
    minute: number;
}

interface EditMyScheduleProps {
    onSetIsEditModal: () => void;
}

const EditMySchedule: React.FC<EditMyScheduleProps> = ({
    onSetIsEditModal,
}) => {
    const { weekDates } = useContext(DateContext) || {};
    const [selection, setSelection] = useState<{ [key: number]: SelectedSlot }>(
        {}
    );
    const [firstClickSlotState, setFirstClickSlotState] = useState<boolean>(false);

    const handleConfirm = () => {
        const scheduleData = formatScheduleData(selection);
        console.log(scheduleData);
        // 서버로 scheduleData 전송하는 로직 추가
        onSetIsEditModal();
    };

    return (
        <>
            <ModalBlackOut />
            <ModalContainer>
                <Box>
                    <Title>나의 시간표</Title>
                    <EditMyTime
                        weekDates={weekDates || []}
                        selection={selection}
                        setSelection={setSelection}
                        
                    />
                </Box>
                <ConfirmBtn onClick={handleConfirm}>시간표 등록하기</ConfirmBtn>
            </ModalContainer>
        </>
    );
};

export default EditMySchedule;
