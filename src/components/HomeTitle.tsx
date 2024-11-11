import { cn } from '@/lib/utils';
import React from 'react';

interface HomeTitleProps {
    Title: string;
    className?: string;
}

function HomeTitle({ Title, className }: HomeTitleProps) {
    return (
        <h2 className={cn(
            "max-w-7xl pl-4 mx-auto text-3xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans",
            className
        )}>
            {Title}
        </h2>
    );
}

export default HomeTitle;
