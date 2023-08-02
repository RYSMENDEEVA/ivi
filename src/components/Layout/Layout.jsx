import React from 'react';
import Header from "./Header/Header";
import {Outlet} from "react-router-dom"
import Footer from "./footer/Footer";

const Layout = () => {
    return (
        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
};

export default Layout;