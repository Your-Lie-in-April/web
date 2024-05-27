import React, { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalPortalProps {
    children: ReactNode;
}

const ModalPortal: React.FC<ModalPortalProps> = ({ children }) => {
    const el = document.getElementById('modal');

    if (!el) {
        return null;
    }

    return ReactDOM.createPortal(children, el);
};

export default ModalPortal;
