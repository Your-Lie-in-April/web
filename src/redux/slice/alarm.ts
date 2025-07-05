import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlarmState {
    projectLastAlarmId: Record<number, number>;
}

const initialState: AlarmState = {
    projectLastAlarmId: {},
};

export const alarmSlice = createSlice({
    name: 'alarm',
    initialState,
    reducers: {
        // 특정 프로젝트의 마지막 알림 ID 저장
        setProjectLastAlarmId: (
            state,
            action: PayloadAction<{ projectId: number; alarmId: number }>
        ) => {
            const { projectId, alarmId } = action.payload;
            state.projectLastAlarmId[projectId] = alarmId;
        },

        // 특정 프로젝트의 마지막 알림 ID 삭제 (프로젝트 페이지 나갈 때)
        removeProjectLastAlarmId: (state, action: PayloadAction<{ projectId: number }>) => {
            const { projectId } = action.payload;
            delete state.projectLastAlarmId[projectId];
        },

        // 모든 프로젝트의 마지막 알림 ID 초기화 (로그아웃 시)
        clearAllProjectLastAlarmId: (state) => {
            state.projectLastAlarmId = {};
        },
    },
});

export const { setProjectLastAlarmId, removeProjectLastAlarmId, clearAllProjectLastAlarmId } =
    alarmSlice.actions;

export default alarmSlice.reducer;
