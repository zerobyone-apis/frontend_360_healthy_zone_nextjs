'use client'
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export function NavbarMobile({ list }: { list: ListItemInterface[] }) {

    return (
        <nav className='max-h-[60px] w-[95%] rounded-full mb-2 p-2 relative bottom-0 bg-jungle-green-500 '>
            <div className="h-full w-full flex justify-center">
                <ul className=" pl-3 font-bold flex justify-center flex-row items-center gap-2 w-full text-center">
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
                <li className={clsx('w-full flex gap-2 p-2 align center content-start text-center hover:text-black active:text-jungle-green-500 hover:bg-white active:bg-white rounded-full transition-colors justify-center', pathname == redirect ? 'bg-white text-jungle-green-500' : "text-white")} aria-description={title}> <i className={icon}></i> </li>
            </Link >
        </div>
    )
}