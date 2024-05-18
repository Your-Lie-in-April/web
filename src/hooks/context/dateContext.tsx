import React, { createContext, useContext, useState } from 'react';
import { ProjectContext } from './projectContext';
import dayjs from 'dayjs';

interface DateContextValue {
    selectedDate: string | null;
    setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
}

export const DateContext = createContext<DateContextValue | undefined>(
    undefined
);

export const DateProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const today = dayjs(new Date()).format('YYYY-MM-DD');
    const { projectInfo } = useContext(ProjectContext);
    const startDateString = projectInfo?.startDate;
    const startDate = startDateString
        ? dayjs(startDateString).format('YYYY-MM-DD')
        : today;

    const [selectedDate, setSelectedDate] = useState<string | null>(
        projectInfo ? startDate : today
    );

    return (
        <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
            {children}
        </DateContext.Provider>
    );
};
