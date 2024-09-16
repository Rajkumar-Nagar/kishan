"use client";

import React from 'react'

const NoHeader = () => {
    React.useEffect(() => {
        const footer = document.querySelector('footer');
        footer?.style.setProperty('display', 'none');
        return () => {
            footer?.style.removeProperty('display');
        };
    }, []);
    return null;
}

export default NoHeader