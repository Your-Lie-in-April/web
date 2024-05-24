// dateContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useProjectContext } from './projectContext';

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
    const { projectData } = useProjectContext();
    const [selectedDate, setSelectedDate] = useState<string | null>(today);

    useEffect(() => {
        if (projectData) {
            const startDateString = projectData.startDate;
            const startDate = startDateString
                ? dayjs(startDateString).format('YYYY-MM-DD')
                : today;
            setSelectedDate(startDate);
        }
    }, [projectData, today]);

    return (
        <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
            {children}
        </DateContext.Provider>
    );
};
