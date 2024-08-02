"use client"
import React, { useEffect, useState } from 'react'

const useScrollWindow = (scrollAmount: number = 15) => {
    const [isScrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > scrollAmount);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollAmount]);

    return isScrolled;
}

export default useScrollWindow
