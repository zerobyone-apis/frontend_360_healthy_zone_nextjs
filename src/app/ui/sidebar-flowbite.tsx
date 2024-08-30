"use client"
import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx';
import Logo from "@/app/ui/svgs/logo-360-healthy-zone.svg";
import { NotificationBell } from './notification-bell';
import Link from 'next/link';
import { signout } from '@/actions/dashboard/signout';
import useOnClickOutside from '@/hooks/useOnClickOutside';

type Props = {
    list: any[];
}

export default function Sidebar({ list }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [showProfileDrop, setShowProfileDrop] = useState<boolean>(false);
    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <a href="#" className="flex ms-2 md:me-24">
                                <Logo width={"100%"} height={"20px"} />
                                <span className="sr-only self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">360 healthy zone</span>
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3 gap-5">
                                <NotificationBell />

                                <div
                                    className="rounded-full hover:cursor-pointer"
                                    onClick={() => setShowProfileDrop(!showProfileDrop)}
                                >
                                    <img
                                        alt="imagen"
                                        className="w-10 h-10 rounded-full ring-3 border-2 border-jungle-green-500 p-1"
                                        src={"/profile.png"}
                                    />
                                    <ProfileDropdown show={showProfileDrop} />
                                </div>
                                {/* <div>
                                    <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar" className={clsx("fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700", !isOpen && "-translate-x-full")} aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {
                            list.map((item, index) =>
                                <li key={index}>
                                    <Link href={item.redirect} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-jungle-green-100 dark:hover:bg-gray-700 group">
                                        <i className={clsx("flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white", item.icon)}></i>
                                        <span className="flex-1 ms-3 whitespace-nowrap">{item.title}</span>
                                        {item.badge && <span className={clsx("inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300", item.badgeClass)}>{item.badge}</span>}
                                    </Link>
                                </li>
                            )
                        }
                        <li>
                            <button onClick={(() => signout())}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full text-start">
                                <i className={clsx("flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white", "bx bx-log-out")}></i>
                                <span className="flex-1 ms-3 whitespace-nowrap">Signout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

function ProfileDropdown({ show = false }) {
    const dropdownRef = useRef(null);
    const [isvisible, setIsVisible] = useState(show);
    const handleClickOutsideFn = () => setIsVisible(false);

    useEffect(() => {
        setIsVisible(show);
    }, [show]);
    useOnClickOutside(dropdownRef, handleClickOutsideFn);

    if (!isvisible) return null;
    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div
                className="absolute right-0 top-[-40px] z-10 mt-[1px] w-56 origin-top-right rounded-md bg-white shadow-lg ring-2 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
            >
                <div className="py-1" role="none">
                    <button
                        className="text-gray-700 text-start block px-4 py-2 text-sm hover:bg-gray-100 w-full"
                        role="menuitem"
                        id="menu-item-0"
                    >
                        Edit Profile
                    </button>
                    <Link
                        href="/"
                        className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                        role="menuitem"
                        id="menu-item-1"
                    >
                        Edit Custom Form
                    </Link>
                    <Link
                        href="/"
                        className="text-gray-700 block px-4 py-2 text-sm hover:bg-jungle-green-200"
                        role="menuitem"
                        id="menu-item-2"
                    >
                        Subscription
                    </Link>
                    <button
                        className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        role="menuitem"
                        id="menu-item-3"
                        onClick={() => signout()}
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </div>
    );
}
