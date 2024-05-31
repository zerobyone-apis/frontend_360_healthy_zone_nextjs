"use client"
import useOnClickOutside from '@/hooks/useOnClickOutside';
import clsx from 'clsx'
import Link from 'next/link';
import React, { useRef, useState } from 'react'

type Item =
    {
        href: string;
        title: string;
    }

type Props = {
    items: Item[];
}

export default function MenuDropdown({ items }: Props) {

    const [show, setShow] = useState(false);

    const dropdownRef = useRef(null);
    const handleClickOutsideFn = () => setShow(false);
    useOnClickOutside(dropdownRef, handleClickOutsideFn);

    return (
        <>
            <button data-dropdown-toggle="dropdownDotsHorizontal"
                onClick={() => setShow(!show)}
                className="inline-flex items-center w-6 h-6 p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none  focus:ring-gray-50" type="button">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
            </button>

            <div ref={dropdownRef} className={clsx(!show && "hidden", " right-[3.5rem] top--6 absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44")}>
                <ul className="py-2 text-sm text-gray-700">
                    {items.map((item: any) => {
                        return (
                            <li>
                                <Link href={item.href} className="block px-4 py-2 hover:bg-gray-100">{item.title}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}