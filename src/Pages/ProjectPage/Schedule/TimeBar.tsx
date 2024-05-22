import React from 'react';

interface ProgressBarProps {
    hours: number[];
    currentHour: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ hours, currentHour }) => {
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
            {hours.map((hour, index) => (
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
                   
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
