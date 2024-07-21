import getIsLogin from '@utils/getIsLogin';
import React from 'react';
import AfterLogin from './AfterLogin';
import BeforeLogin from './BeforeLogin';

const Layout = (props: { children: React.ReactNode }) => {
    return (
        <>
            <header> {getIsLogin() ? <AfterLogin /> : <BeforeLogin />}</header>
            <main>{props.children}</main>
        </>
    );
};
export default Layout;
