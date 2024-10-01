import { editReducer, modeSlice } from '@redux/reducers';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        edit: editReducer,
        mode: modeSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
