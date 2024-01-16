'use client'
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export function Sidebar() {

    const list = [{
        icon: 'bx bxs-dashboard text-2xl',
        title: "Dashboard",
        redirect: "/dashboard"
    },
    {
        icon: 'bx bxs-select-multiple text-xl',
        title: "My Tasks",
        redirect: "/dashboard/tasks"
    }, {
        icon: 'bx bxs-message-rounded-dots text-xl',
        title: "Chats",
        redirect: "/dashboard/chat"
    }, {
        icon: 'bx bxs-pear text-xl',
        title: "Diet",
        redirect: "/dashboard/diet"
    },
    {
        icon: 'bx bxs-flag-checkered text-xl',
        title: "Goals",
        redirect: "/dashboard/goals"
    },
    {
        icon: 'bx bxs-cog text-xl',
        title: "Settings",
        redirect: "/dashboard/settings"
    }]

    return (
        <aside className='md:h-[95vh]  shadow max-h-full w-[80%] m-2 relative border rounded-[40px]  bg-gradient-to-b from-jungle-green-400 to-jungle-green-600 '>
            <div className="h-full flex justify-center">
                <ul className=" p-4 font-bold flex justify-center flex-col items-center gap-3 w-full text-center">
                    {list.map((li, index) => <ListItem {...li} key={index}></ListItem>)}
                </ul>
            </div>
        </aside>
    )
}

interface ListItemInterface {
    icon: any;
    title: string;
    redirect: string;
}
function ListItem({ icon, title, redirect = "" }: ListItemInterface): any {
    const pathname = usePathname();

    return (
        <div>
            <Link key={redirect} href={redirect}>
                <li className={clsx('w-full flex gap-2 p-2 content-start text-center hover:text-black active:text-jungle-green-500 hover:bg-white active:bg-white rounded-full transition-colors justify-center', { 'bg-white text-jungle-green-500': pathname === redirect })}> <i className={icon}></i> <p className="hidden sm:block truncate">{title}</p></li>
            </Link >
        </div>
    )
}