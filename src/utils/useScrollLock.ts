import { useEffect } from 'react';

const useScrollLock = (isLocked: boolean): void => {
    useEffect(() => {
        if (isLocked) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isLocked]);
};

export default useScrollLock;