import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditState {
    title: string;
    content: string;
    startDate: string | null;
    endDate: string | null;
    startTime: string;
    endTime: string;
    dayOfWeek: string[];
    color: string;
    coverImageId: string;
    img: string;
}

const initialState: EditState = {
    title: '',
    content: '',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    startTime: 'AM 09:00',
    endTime: 'AM 09:30',
    dayOfWeek: [],
    color: '#ffffff',
    coverImageId: '',
    img: '',
};

export const editSlice = createSlice({
    name: 'edit',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setContent: (state, action: PayloadAction<string>) => {
            state.content = action.payload;
        },
        setStartDate: (state, action: PayloadAction<string | null>) => {
            state.startDate = action.payload;
        },
        setEndDate: (state, action: PayloadAction<string | null>) => {
            state.endDate = action.payload;
        },
        setStartTime: (state, action: PayloadAction<string>) => {
            state.startTime = action.payload;
        },
        setEndTime: (state, action: PayloadAction<string>) => {
            state.endTime = action.payload;
        },
        setDayOfWeek: (state, action: PayloadAction<string[]>) => {
            state.dayOfWeek = action.payload;
        },
        setColor: (state, action: PayloadAction<string>) => {
            state.color = action.payload;
        },
        setCoverImageId: (state, action: PayloadAction<string>) => {
            state.coverImageId = action.payload;
        },
        setImg: (state, action: PayloadAction<string>) => {
            state.img = action.payload;
        },
        resetEditState: (state) => {
            return initialState;
        },
    },
});

export const {
    setTitle,
    setContent,
    setStartDate,
    setEndDate,
    setStartTime,
    setEndTime,
    setDayOfWeek,
    setColor,
    setCoverImageId,
    setImg,
    resetEditState,
} = editSlice.actions;

export default editSlice.reducer;
