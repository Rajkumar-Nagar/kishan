"use client";

import React from 'react'

const NoHeader = () => {
    React.useEffect(() => {
        const header = document.querySelector('header');
        header?.style.setProperty('display', 'none');
        // document.documentElement.style.setProperty('--header-height', '0px');
        return () => {
            header?.style.removeProperty('display');
            // document.documentElement.style.setProperty('--header-height', '4rem');
        };
    }, []);
    return null;
}

export default NoHeader
