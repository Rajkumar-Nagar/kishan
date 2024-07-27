"use client"
import React, { useState } from 'react'

interface DropdownProps {
    Setquantity: (value: string) => void;
    quntity: string;
    fields: string[];
    nameDrop: string;
}

function Dropdown({ Setquantity, quntity, fields, nameDrop }: DropdownProps) {
    const [other, setOther] = useState("");
    const [showInput, setShowInput] = useState(false);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === "other") {
            setShowInput(true);
        } else {
            setShowInput(false);
            Setquantity(value);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setOther(value);
        Setquantity(value);
    };

    return (
        <div>
            <select
                id="product"
                className="block appearance-none w-full h-11 focus:border-blue-300 border-2  bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                value={showInput ? "other" : quntity}
                onChange={handleSelectChange}
            >
                <option value="" disabled>
                    Select a {nameDrop}
                </option>
                {fields?.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
                <option value="other">Other</option>
            </select>

            {showInput && (
                <input
                    type="text"
                    className="mt-2 w-full h-11 bg-white border border-gray-400 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter other value"
                    value={other}
                    onChange={handleInputChange}
                />
            )}
        </div>
    );
}

export default Dropdown;
