import React, { useState, useEffect } from 'react';
import HeaderDesktop from '../Header/HeaderDestop.js';
import HeaderMobile from '../Header/HeaderMobile.js';

const Header = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // Run the function on initial load
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {isMobile ? <HeaderMobile /> : <HeaderDesktop />}
        </>
    );
};

export default Header;
