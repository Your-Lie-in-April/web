import {
    dateSlice,
    editSlice,
    invitetSlice,
    modeSlice,
    projectSlice,
    searchSlice,
} from '@redux/slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        edit: editSlice,
        mode: modeSlice,
        project: projectSlice,
        invite: invitetSlice,
        search: searchSlice,
        date: dateSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
