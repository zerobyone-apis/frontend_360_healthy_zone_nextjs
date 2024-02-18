'use client'
import { Navbar } from "../ui/dashboard/navbar";
import { Sidebar } from "../ui/dashboard/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {


    return (
        <main className="h-screen grid grid-cols-12 bg-jungle-green-50">
            <div className="col-span-2 flex md:justify-start  h-full items-center">
                <Sidebar></Sidebar>
            </div>
            <div className="flex flex-col col-span-10 h-full overflow-auto">
                <Navbar></Navbar>
                <main className=" h-full max-h-full p-5 overflow-auto">{children}</main>
            </div>
        </main>
    )
}