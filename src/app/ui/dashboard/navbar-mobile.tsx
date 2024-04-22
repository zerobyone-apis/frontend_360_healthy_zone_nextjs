'use client'
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export function NavbarMobile() {
    const list = [{
        icon: 'bx bxs-dashboard text-2xl',
        title: "Dashboard",
        redirect: "/dashboard"
    },
    {
        icon: 'bx bx-run text-xl',
        title: "Trainings",
        redirect: "/dashboard/trainings"
    }, {
        icon: 'bx bxs-message-rounded-dots text-xl',
        title: "Chats",
        redirect: "/dashboard/chat"
    }, {
        icon: 'bx bxs-pear text-xl',
        title: "Diet",
        redirect: "/dashboard/diets"
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
        <nav className='max-h-[60px] w-[95%] rounded-full mb-2 p-2 relative bottom-0 bg-gradient-to-b from-jungle-green-400 to-jungle-green-600 '>
            <div className="h-full w-full flex justify-center">
                <ul className=" pl-3 font-bold flex justify-center flex-row items-center gap-3 w-full text-center">
                    {list.map((li, index) => <ListItem {...li} key={index}></ListItem>)}
                </ul>
            </div>
        </nav>
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
        <div className="w-full">
            <Link key={redirect} href={redirect}>
                <li className={clsx('w-full flex gap-2 p-2 content-start text-center hover:text-black active:text-jungle-green-500 hover:bg-white active:bg-white rounded-full transition-colors justify-center', pathname == redirect ? 'bg-white text-jungle-green-500' : "text-white")} aria-description={title}> <i className={icon}></i> </li>
            </Link >
        </div>
    )
}