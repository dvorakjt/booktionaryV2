import React from 'react';

//Components
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

function NoMatch() {
    return (
        <>
            <Header />
            <Breadcrumb />
            <h1>PAGE NOT FOUND</h1>
            <Footer />
        </>
    )
}

export default NoMatch;