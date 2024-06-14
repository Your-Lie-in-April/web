import React from 'react';
import { ScheduleItem } from '#/Types/scheduletype';

interface MyTimeBarProps {
    hours: number[];
    schedule: ScheduleItem[];
}

const MyTimeBar: React.FC<MyTimeBarProps> = ({ hours, schedule }) => {
    const totalWidth = hours.length * 40;

    return (
        <div
            style={{
                width: `${totalWidth}px`,
                height: '29.804px',
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
                        width: '40px',
                        height: '100%',
                        backgroundColor: '#D9D9D9',
                        position: 'relative',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: '1px solid #7D7D7D',
                        boxSizing: 'border-box',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            width: '0.5px',
                            height: '100%',
                            borderLeft: '1px dashed #a4a4a4',
                            transform: 'translateX(-50%)',
                        }}
                    />
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
                            const startPosition = Math.round(
                                (startMinute / 60) * 40
                            );
                            const endPosition = Math.round(
                                (endMinute / 60) * 40
                            );
                            return (
                                <>
                                    <div
                                        key={index}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: `${startPosition}px`,
                                            width: `${Math.max(
                                                0,
                                                endPosition - startPosition
                                            )}px`,
                                            height: '100%',
                                            backgroundColor: '#633AE2',
                                            boxSizing: 'border-box',
                                        }}
                                    />
                                    {endPosition - startPosition > 0 && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: '50%',
                                                width: '0.5px',
                                                height: '100%',
                                                borderLeft:
                                                    '1px dashed #ffffff',
                                                transform: 'translateX(-50%)',
                                            }}
                                        />
                                    )}
                                </>
                            );
                        })}
                </div>
            ))}
        </div>
    );
};

export default MyTimeBar;
