import '@styles/toast.css';
import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastType = 'error' | 'warning' | 'success';

const defaultOptions: ToastOptions = {
    position: 'top-left',
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    className: 'custom-toast',
};

export const Toast = (message: string, type: ToastType) => {
    const options = {
        ...defaultOptions,
        className: `custom-toast custom-toast-${type}`,
    };

    toast[type](message, options);
};
