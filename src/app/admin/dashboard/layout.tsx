"use client";
import { Navbar } from "../../ui/dashboard/navbar";
import { Sidebar } from "../../ui/dashboard/sidebar";
import { NavbarMobile } from "../../ui/dashboard/navbar-mobile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }: { children: React.ReactNode }) {
	const navbarList = [
		{
			icon: "bx bxs-dashboard text-2xl",
			title: "Dashboard",
			redirect: "/admin/dashboard",
		},
		{
			icon: "bx bx-spreadsheet text-xl",
			title: "Pending actions",
			redirect: "/admin/dashboard/pending-actions",
		},
		{
			icon: "bx bxs-group text-xl",
			title: "Users List",
			redirect: "/admin/dashboard/users-list",
		},
		{
			icon: "bx bxs-cog text-xl",
			title: "Settings",
			redirect: "/admin/dashboard/settings",
		},
	];

	return (
		<>
			<main className="h-screen grid grid-cols-12 bg-jungle-green-50">
				<div className="col-span-2 md:flex md:justify-start  hidden h-full items-center">
					<Sidebar list={navbarList} />
				</div>
				<div className="flex flex-col col-span-12 md:col-span-10 h-full overflow-auto">
					<Navbar />
					<main className=" h-[95%] max-h-full p-3 overflow-auto">
						{children}
					</main>
				</div>
				<div className="md:hidden flex col-span-12 justify-center">
					<NavbarMobile list={navbarList} />
				</div>
			</main>
			<ToastContainer />
		</>
	);
}
