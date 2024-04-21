"use client"
import { signout } from "@/actions/dashboard/signout";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function Navbar() {
    const [showProfileDrop, setShowProfileDrop] = useState(false);
    return (
        <nav className="w-full h-[70px] p-3  justify-between content-center flex">
            <form >
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-200  " placeholder="Search chats, diets, ingredients, etc..." required />
                </div>
            </form>
            <div className="border-2 p-1 border-jungle-green-400 rounded-full w-[10px] h-[10px]" onClick={() => setShowProfileDrop(!showProfileDrop)}>
                <img alt="imagen" className="w-10 h-10 rounded-full" src={"/profile.png"} />
                <ProfileDropdown show={showProfileDrop} />
            </div>
        </nav >
    )
}

function ProfileDropdown({ show = false }) {
    const dropdownRef = useRef(null);
    const [isvisible, setIsVisible] = useState(show);
    const handleClickOutsideFn = () => setIsVisible(false);

    useEffect(() => {
        setIsVisible(show);
    }, [show])
    useOnClickOutside(dropdownRef, handleClickOutsideFn);

    if (!isvisible) return null
    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div className="absolute right-0 z-10 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
                <div className="py-1" role="none">
                    <button className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-0">Account settings</button>
                    <Link href="/chat" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-1">Support</Link>
                    <Link href="/license" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-2">License</Link>
                    <button className="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" id="menu-item-3" onClick={() => signout()}>Sign out</button>
                </div>
            </div>
        </div>
    )
}
