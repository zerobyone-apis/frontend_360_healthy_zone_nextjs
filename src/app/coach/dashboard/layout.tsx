"use client";
import Sidebar from "@/app/ui/sidebar-flowbite";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }: { children: React.ReactNode }) {
	const navbarList = [
		{
			icon: "bx bxs-dashboard text-2xl",
			title: "Dashboard",
			redirect: "/coach/dashboard",
		},
		{
			icon: "bx bxs-user-detail text-xl",
			title: "My Customers",
			redirect: "/coach/dashboard/customers",
		},
		{
			icon: "bx bx-run text-xl",
			title: "Trainings",
			redirect: "/coach/dashboard/trainings",
		},
		{
			icon: "bx bxs-flag-checkered text-xl",
			title: "Goals",
			redirect: "/coach/dashboard/goals",
		},
		{
			icon: "bx bxs-cog text-xl",
			title: "Settings",
			redirect: "/coach/dashboard/settings",
		},
	];

	return (
		<>
			<main className=" bg-jungle-green-50 h-screen">
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
