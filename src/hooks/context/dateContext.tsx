import { getWeekDates } from '@pages/project/schedules/weekUtils';
import dayjs from 'dayjs';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type DateContextValue = {
    selectedDate: string | null;
    setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
    weekDates: string[];
};

export const DateContext = createContext<DateContextValue | undefined>(undefined);

export const DateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const today = dayjs(new Date()).format('YYYY-MM-DD');
    const [selectedDate, setSelectedDate] = useState<string | null>(today);
    const [weekDates, setWeekDates] = useState<string[]>([]);

    useEffect(() => {
        if (selectedDate) {
            const week = getWeekDates(selectedDate);
            setWeekDates(week);
        }
    }, [selectedDate]);

    return (
        <DateContext.Provider value={{ selectedDate, setSelectedDate, weekDates }}>
            {children}
        </DateContext.Provider>
    );
};

export const useDateContext = (): DateContextValue => {
    const context = useContext(DateContext);
    if (context === undefined) {
        throw new Error('useDateContext must be used within a DateProvider');
    }
    return context;
};
