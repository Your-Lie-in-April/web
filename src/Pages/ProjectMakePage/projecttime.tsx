import React, { FC, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import styled from 'styled-components';
import { FaAngleDown } from 'react-icons/fa';
import { ko } from 'date-fns/locale/ko';

const ProjectTimeContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 50px;
    width: 548px;
    height: 401px;
    background: #fff;
`;

const DateContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SDatePicker = styled(ReactDatePicker)`
    margin-top: 12px;
    width: 208px;
    align-items: center;
    gap: 12px;
    padding: 8px;
    font-size: 28px;
    font-weight: 400;
    border-radius: 20px;
    background: #f5f5f5;
    text-align: center;

    &:hover {
        cursor: pointer;
    }
`;

const Text = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 12x; /* Adjusted margin */
    margin-left: 8px; /* Adjusted margin */
`;

const Example: FC = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <ProjectTimeContainer>
            <div style={{ display: 'flex', marginTop: '42px' }}>
                <DateContainer>
                    <Text>프로젝트 시작일</Text>
                    <SDatePicker
                        locale={ko}
                        dateFormat={'YYYY-MM-dd'}
                        selected={startDate}
                        onChange={(date: Date) => setStartDate(date)}
                        startDate={startDate}
                        onFocus={(e) => e.target.blur()}
                    />
                </DateContainer>

                <span
                    style={{
                        fontSize: '32px',
                        marginTop: '35px',
                        fontWeight: '600',
                        verticalAlign: 'middle',
                        textAlign: 'center',
                    }}
                >
                    ~
                </span>

                <DateContainer>
                    <Text>프로젝트 종료일</Text>
                    <SDatePicker
                        locale={ko}
                        dateFormat={'YYYY-MM-dd'}
                        selected={endDate}
                        onChange={(date: Date) => setEndDate(date)}
                        selectsEnd
                        endDate={endDate}
                        minDate={startDate}
                        onFocus={(e) => e.target.blur()}
                    />
                </DateContainer>
            </div>
        </ProjectTimeContainer>
    );
};

export default Example;
