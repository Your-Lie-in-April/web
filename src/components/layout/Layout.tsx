import getIsLogin from '@utils/getIsLogin';
import React from 'react';
import AfterLogin from './header/AfterLogin';
import BeforeLogin from './header/BeforeLogin';

const Layout = (props: { children: React.ReactNode }) => {
    return (
        <>
            <header> {getIsLogin() ? <AfterLogin /> : <BeforeLogin />}</header>
            <main>{props.children}</main>
        </>
    );
};
export default Layout;
