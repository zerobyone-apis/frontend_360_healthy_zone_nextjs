'use client'
import { Navbar } from "../ui/dashboard/navbar";
import { Sidebar } from "../ui/dashboard/sidebar";
import { NavbarMobile } from "../ui/dashboard/navbar-mobile";

export default function Layout({ children }: { children: React.ReactNode }) {


    return (
        <main className="h-screen grid grid-cols-12 bg-jungle-green-50">
            <div className="col-span-2 md:flex md:justify-start  hidden h-full items-center">
                <Sidebar />
            </div>
            <div className="flex flex-col col-span-12 md:col-span-10 h-full overflow-auto">
                <Navbar />
                <main className=" h-[95%] max-h-full p-3 overflow-auto">{children}</main>
            </div>
            <div className="md:hidden flex col-span-12 justify-center">
                <NavbarMobile />
            </div>
        </main>
    )
}