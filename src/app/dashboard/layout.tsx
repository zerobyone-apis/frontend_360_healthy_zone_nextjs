import { Navbar } from "../ui/dashboard/navbar";
import { Sidebar } from "../ui/dashboard/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="h-screen grid grid-cols-12 bg-jungle-green-50">
            <div className="col-span-2 flex justify-center h-full items-center">
                <Sidebar></Sidebar>
            </div>
            <div className="flex flex-col col-span-10">
                <Navbar></Navbar>
                <main className=" h-full p-5">{children}</main>
            </div>
        </main>
    )
}