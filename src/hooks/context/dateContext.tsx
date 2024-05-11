import React, { createContext, useContext, useState } from 'react';
import { ProjectContext } from './projectContext';
import dayjs from 'dayjs';

interface DateContextValue {
    selectedDate: Date | null;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

export const DateContext = createContext<DateContextValue | undefined>(
    undefined
);

export const DateProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { projectInfo } = useContext(ProjectContext);
    const startDateString = projectInfo?.startDate;
    const startDate = startDateString ? dayjs(startDateString).toDate() : null;

    const [selectedDate, setSelectedDate] = useState<Date | null>(
        projectInfo ? startDate : null
    );

    return (
        <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
            {children}
        </DateContext.Provider>
    );
};
