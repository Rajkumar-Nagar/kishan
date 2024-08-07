import { useWindowSize } from '@/hooks';
import React from 'react';

interface ResponsiveProps {
    children: React.ReactNode;
}

interface ShowProps extends ResponsiveProps {
    below?: number;
    above?: number;
}

const Responsive: React.FC<ResponsiveProps> & {
    Show: React.FC<ShowProps>;
    Hide: React.FC<ShowProps>;
} = ({ children }) => <>{children}</>;

const Show: React.FC<ShowProps> = ({ children, below, above }) => {
    const { width } = useWindowSize()
    const isBelow = below ? width < below : false;
    const isAbove = above ? width >= above : false;

    if ((below && isBelow) || (above && isAbove)) {
        return <>{children}</>;
    }

    return null;
};

const Hide: React.FC<ShowProps> = ({ children, below, above }) => {
    const { width } = useWindowSize()
    const isBelow = below ? width < below : false; false
    const isAbove = above ? width >= above : false; true

    if ((below && isBelow) || (above && isAbove)) {
        return null;
    }
    return <>{children}</>;
};

Responsive.Show = Show;
Responsive.Hide = Hide;

export default Responsive;
