"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { ReactNode } from "react";

export function Sidebar() {

    const list = [{
        icon: <i className='bx bxs-dashboard text-2xl'></i>,
        title: "Dashboard",
        redirect: "/dashboard"
    },
    {
        icon: <i className='bx bxs-select-multiple text-xl'></i>,
        title: "My Tasks",
        redirect: "/dashboard/tasks"
    }, {
        icon: <i className='bx bxs-message-rounded-dots text-xl'></i>,
        title: "Chats",
        redirect: "/dashboard/chat"
    }, {
        icon: <i className='bx bxs-pear text-xl'></i>,
        title: "Diet",
        redirect: "/dashboard/diet"
    },
    {
        icon: <i className='bx bxs-flag-checkered text-xl'></i>,
        title: "Goals",
        redirect: "/dashboard/goals"
    },
    {
        icon: <i className='bx bxs-cog text-xl'></i>,
        title: "Settings",
        redirect: "/dashboard/settings"
    }]

    return (
        <aside className='md:h-[95vh]  shadow max-h-full w-[80%] m-2 relative border rounded-[40px]  bg-gradient-to-b from-jungle-green-400 to-jungle-green-600 '>
            <div className="h-full flex justify-center">
                <ul className=" p-4 font-bold flex justify-center flex-col items-center gap-3 w-full">
                    {list.map((li, index) => <ListItem {...li} key={index}></ListItem>)}
                </ul>
            </div>
        </aside>
    )
}

interface ListItemInterface {
    icon: ReactNode;
    title: string;
    redirect?: string;
}
function ListItem({ icon, title, redirect = "" }: ListItemInterface) {
    const pathname = usePathname();

    return (
        <Link href={redirect}>
            <li className={clsx("w-full flex gap-2 p-2 content-start text-center",
                "hover:text-black active:text-jungle-green-500 hover:bg-white active:bg-white rounded-full transition-colors justify-center",
                { 'bg-white text-jungle-green-500': pathname === redirect })}>{icon} <p className="hidden sm:block truncate">{title}</p></li>
        </Link>
    )
}