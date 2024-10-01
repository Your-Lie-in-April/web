import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModeState {
    isCoverClick: boolean;
    isEdit: boolean;
}

const initialState: ModeState = {
    isCoverClick: false,
    isEdit: false,
};

export const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        setCoverClick: (state, action: PayloadAction<boolean>) => {
            state.isCoverClick = action.payload;
        },
        setIsEdit: (state, action: PayloadAction<boolean>) => {
            state.isEdit = action.payload;
        },
    },
});

export const { setCoverClick, setIsEdit } = modeSlice.actions;

export default modeSlice.reducer;
