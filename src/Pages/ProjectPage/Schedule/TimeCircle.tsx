import styled, { css } from 'styled-components';
import { ScheduleItem } from '#/Types/scheduletype';

interface TimeProps {
    style?: React.CSSProperties;
    scheduleItems: ScheduleItem[];
    hour: number;
    isScheduled: boolean;
}

const TimeBox = styled.div<TimeProps>`
    width: 40px;
    height: 30px;
    border-radius: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
`;

const TimeLeft = styled.div<TimeProps>`
    flex: 1;
    box-sizing: border-box;
    left: 0;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    ${({ isScheduled }) =>
        isScheduled
            ? css`
                  border-left: 0.5px solid #000000;
                  background-color: #633ae2;
              `
            : css`
                  border-left: 0.5px solid #7d7d7d;
                  background-color: #d9d9d9;
              `}
`;

const TimeRight = styled.div<TimeProps>`
    flex: 1;
    box-sizing: border-box;
    right: 0;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    ${({ isScheduled }) =>
        isScheduled
            ? css`
                  border-right: 0.5px solid #000000;
                  background-color: #633ae2;
              `
            : css`
                  border-right: 0.5px solid #7d7d7d;
                  background-color: #d9d9d9;
              `}
`;

const VerticalLine = styled.div<TimeProps>`
    height: 100%;
    background-color: #d9d9d9;
    ${({ isScheduled }) =>
        isScheduled
            ? css`
                  border-left: 0.5px dashed #ffffff;
              `
            : css`
                  border-left: 0.5px dashed #a4a4a4;
              `};
`;

const TimeCircle: React.FC<TimeProps> = ({ style, scheduleItems, hour }) => {
    const isScheduled =
        scheduleItems &&
        scheduleItems.some((item) => {
            const startHour = new Date(item.startTime).getHours();
            const endHour = new Date(item.endTime).getHours();
            return startHour <= hour && endHour > hour;
        });

    return (
        <TimeBox
            style={style}
            scheduleItems={scheduleItems}
            hour={hour}
            isScheduled={isScheduled}
        >
            <TimeLeft
                scheduleItems={scheduleItems}
                hour={hour}
                isScheduled={isScheduled}
            />
            <VerticalLine
                scheduleItems={scheduleItems}
                hour={hour}
                isScheduled={isScheduled}
            />
            <TimeRight
                scheduleItems={scheduleItems}
                hour={hour}
                isScheduled={isScheduled}
            />
        </TimeBox>
    );
};

export default TimeCircle;
