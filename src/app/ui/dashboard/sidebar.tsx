'use client'
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export function Sidebar({ list }: { list: ListItemInterface[] }) {
    return (
        <aside className="md:h-screen w-64 bg-jungle-green-500 text-white fixed">
            <div className="h-full flex flex-col pt-8">
                <ul className="px-4 flex flex-col gap-2 font-medium">
                    {list.map((li, index) => (
                        <ListItem {...li} key={index} />
                    ))}
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
        <Link href={redirect} className={clsx('flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white hover:text-jungle-green-500 transition-colors', pathname === redirect ? 'bg-white text-jungle-green-500' : '')}>
            <i className={clsx(icon, 'text-xl')}></i>
            <span className="truncate">{title}</span>
        </Link>
    )
}
