import React from 'react';

interface HomeTitleProps {
    Title: string;
}

function HomeTitle({ Title }: HomeTitleProps) {
    return (
        <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
            {Title}
        </h2>
    );
}

export default HomeTitle;
