import { editSlice, modeSlice, projectSlice } from '@redux/slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        edit: editSlice,
        mode: modeSlice,
        project: projectSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
