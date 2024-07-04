import React from 'react'

interface DropdownProps {
    Setquantity: (value: string) => void;
    quntity: string;
    fields: string[];
    nameDrop: string;
}

function Dropdown({ Setquantity, quntity, fields, nameDrop }: DropdownProps) {
    return (
        <select
            id="product"
            className="block appearance-none w-full h-11 focus:border-blue-300 focus:border-2 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            value={quntity}
            onChange={(e) => Setquantity(e.target.value)}
        >
            <option value="" disabled>
                Select a {`${nameDrop}`}
            </option>
            {
                fields.map((item, index) => (
                    <option key={index} value={`${item}`}>{item}</option>
                ))
            }
        </select>
    )
}

export default Dropdown