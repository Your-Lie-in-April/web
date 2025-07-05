import ProjectFormLayout from '@components/common/ProjectFormLayout';
import { useAppDispatch } from '@redux/config/hook';
import { resetEditState } from '@redux/slice/edit';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const MakePage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(resetEditState());
    }, [dispatch]);

    return <ProjectFormLayout />;
};

export default MakePage;
