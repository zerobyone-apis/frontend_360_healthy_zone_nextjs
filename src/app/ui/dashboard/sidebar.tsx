'use client'
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export function Sidebar({ list }: { list: ListItemInterface[] }) {

    return (
        <aside className='md:h-[100vh] max-h-full lg:w-full sm:w-[80%] md:w-[45%] relative  bg-jungle-green-500'>
            <div className="h-full w-full flex justify-center">
                <ul className=" pl-3 font-bold flex justify-center flex-col items-center gap-2 w-full text-center">
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
        <div className="w-full">
            <Link key={redirect} href={redirect}>
                <li className={clsx('w-full flex gap-2 p-2 content-start text-center hover:text-black active:text-jungle-green-500 hover:bg-white active:bg-white rounded-full transition-colors justify-center', pathname == redirect ? 'bg-white text-jungle-green-500' : "text-white")}> <i className={icon}></i> <p className="hidden lg:block truncate">{title}</p></li>
            </Link >
        </div>
    )
}