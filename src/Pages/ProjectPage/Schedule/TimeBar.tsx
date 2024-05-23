import React from 'react';
import { ScheduleItem } from '#/Types/scheduletype';
import { dateToPercent } from './dateToPercent';

interface ProgressBarProps {
    hours: number[];
    schedule: ScheduleItem[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ hours, schedule }) => {
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
                        borderColor: '#7D7D7D',
                    }}
                >
                    {schedule.map((item, index) => {
                        const startPercent = dateToPercent(new Date(item.startTime));
                        const endPercent = dateToPercent(new Date(item.endTime));

                        return (
                            <div
                                key={index}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: `${startPercent}%`,
                                    width: `${endPercent - startPercent}%`,
                                    height: '100%',
                                    backgroundColor: '#FF0000',
                                    borderRadius: '20px',
                                }}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;