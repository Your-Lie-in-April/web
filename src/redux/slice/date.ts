import { getWeekDates } from '@components/projectPage/Schedules';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

interface DateState {
    selectedDate: string | null;
    weekDates: string[];
}

const today = dayjs().format('YYYY-MM-DD');

const initialState: DateState = {
    selectedDate: today,
    weekDates: getWeekDates(today),
};

export const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setSelectedDate: (state, action: PayloadAction<string | null>) => {
            state.selectedDate = action.payload;
            state.weekDates = action.payload ? getWeekDates(action.payload) : [];
        },
    },
});

export const { setSelectedDate } = dateSlice.actions;

export default dateSlice.reducer;
