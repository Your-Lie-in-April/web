import { FC, useState, useRef, useEffect } from 'react';
import ReactDatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import styled from 'styled-components';
import SelectTime from './projectcalendar';
import './projecttime.css';
import { FaAngleDown } from 'react-icons/fa';
import { ko } from 'date-fns/locale/ko';

const ProjectTimeContainer = styled.div`
    width: 548px;
    height: 401px;
    background: #fff;
`;

const SDatePicker = styled(ReactDatePicker)`
    margin-top: 12px;
    width: 200px;
    align-items: center;
    gap: 12px;
    padding: 8px 20px;
    font-size: 28px;
    font-weight: 400;
    border-radius: 20px;
    background: #f5f5f5;
    text-align: center;
    &: hover {
        cursor: pointer;
    }
`;
const Example: FC = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    return (
        <ProjectTimeContainer>
            {' '}
            <div style={{ marginLeft: '30px', display: 'flex', flexDirection: 'row' }}>
                <SDatePicker
                    locale={ko}
                    dateFormat={'YYYY-MM-dd'}
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                />
                <div style={{ color: 'white' }}>~</div>
                <SDatePicker
                    locale={ko}
                    dateFormat={'YYYY-MM-dd'}
                    selected={endDate}
                    onChange={(date: Date) => setEndDate(date)}
                    selectsEnd
                    endDate={endDate}
                    minDate={startDate}
                />
            </div>
        </ProjectTimeContainer>
    );
};
export default Example;
