"use client"
import clsx from 'clsx'
import React, { useState } from 'react'

interface option {
    icon?: string;
    title: string;
    subtitle?: string;
    value: string;
}

type Props = {
    onChange: (value: string) => void;
    options: option[],
    id: string
}

export default function RadioCard({ options, id, onChange }: Props) {
    const [opt, setOpt] = useState(options[0].value);

    function handleClick(val: string) {
        setOpt(val);
        onChange(val);
    }

    return (
        <ul className="grid w-full gap-6 md:grid-cols-2">
            {options.map((option: option) =>
                <li key={option.value} onClick={() => handleClick(option.value)}>
                    <input type="radio" name={id} value={option.value} className="hidden peer" required />
                    <label className={clsx("inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 hover:text-gray-600 hover:border-jungle-green-300 hover:bg-jungle-green-100  rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600",
                        opt === option.value && "text-gray-600 border-jungle-green-300 bg-jungle-green-100")}>
                        <div className="block">
                            <div className="w-full text-lg font-semibold">{option.title}</div>
                            {option.subtitle && <div className="w-full">{option.subtitle}</div>}
                        </div>
                        {option && <i className={clsx('text-xl', option.icon)}></i>}
                    </label>
                </li>)}
        </ul>
    )
}