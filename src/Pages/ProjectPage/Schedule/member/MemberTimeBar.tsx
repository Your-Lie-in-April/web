import React from 'react';
import { ScheduleItem } from '#/Types/scheduletype';

interface MemberTimeBarProps {
    hours: number[];
    schedule: ScheduleItem[];
}

const MemberTimeBar: React.FC<MemberTimeBarProps> = ({ hours, schedule }) => {
    const totalWidth = hours.length * 37.282;

    return (
        <div
            style={{
                width: `${totalWidth}px`,
                height: '27.962px',
                backgroundColor: 'transparent',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
            }}
        >
            {hours.map((hour) => (
                <div
                    key={hour}
                    style={{
                        width: '37.282px',
                        height: '100%',
                        backgroundColor: '#D9D9D9',
                        position: 'relative',
                        borderRadius: '20px',
                        overflow: 'hidden',
                    }}
                >
                    {schedule
                        .filter((item) => {
                            const itemStartHour = new Date(
                                item.startTime
                            ).getHours();
                            const itemEndHour = new Date(
                                item.endTime
                            ).getHours();
                            return itemStartHour <= hour && itemEndHour >= hour;
                        })
                        .map((item, index) => {
                            const itemStartHour = new Date(
                                item.startTime
                            ).getHours();
                            const itemEndHour = new Date(
                                item.endTime
                            ).getHours();
                            const startMinute =
                                itemStartHour === hour
                                    ? new Date(item.startTime).getMinutes()
                                    : 0;
                            const endMinute =
                                itemEndHour === hour
                                    ? new Date(item.endTime).getMinutes()
                                    : 59;
                            const startPosition = (startMinute / 60) * 40;
                            const endPosition = (endMinute / 60) * 40;
                            return (
                                <div
                                    key={index}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: `${startPosition}px`,
                                        width: `${
                                            endPosition - startPosition
                                        }px`,
                                        height: '100%',
                                        backgroundColor: '#633AE2',
                                    }}
                                />
                            );
                        })}
                </div>
            ))}
        </div>
    );
};

export default MemberTimeBar;
