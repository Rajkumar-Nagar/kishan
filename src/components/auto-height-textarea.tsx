import React, { useState, useRef, useEffect } from 'react';


const AutoHeightTextarea = ({ value, onChange, placeholder, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [height, setHeight] = useState('auto');

    useEffect(() => {
        const textarea = textareaRef.current!;
        textarea.style.height = 'auto';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 140)}px`;
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e);
    };

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            style={{ height, resize: 'none', ...props.style }}
            rows={1}
            {...props}
        />
    );
};

export default AutoHeightTextarea;
