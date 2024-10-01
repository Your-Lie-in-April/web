import ProjectFormLayout from '@components/common/ProjectFormLayout';
import { resetEditState } from '@redux/reducers/edit';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const MakePage = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(resetEditState());
    }, [location, dispatch]);

    return <ProjectFormLayout />;
};

export default MakePage;
