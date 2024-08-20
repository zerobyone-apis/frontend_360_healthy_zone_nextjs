"use client";
import Sidebar from "@/app/ui/sidebar-flowbite";
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
			<main className=" bg-white">
				<Sidebar list={navbarList} />
				<main className="p-4 sm:ml-64">
					<div className="p-4 mt-14">
						{children}
					</div>
				</main>
			</main>
			<ToastContainer />
		</>
	);
}
