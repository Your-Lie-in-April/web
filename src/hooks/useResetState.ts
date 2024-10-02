import { useAppDispatch } from '@redux/config/hook';
import { resetEditState } from '@redux/slice/edit';
import { setIsEdit } from '@redux/slice/mode';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useResetState = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const resetState = () => {
            dispatch(setIsEdit(false));
            dispatch(resetEditState());
        };

        resetState();
    }, [location.pathname, dispatch]);
};
