"use client";
import Sidebar from "@/app/ui/sidebar-flowbite";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }: { children: React.ReactNode }) {
	const navbarList = [
		{
			icon: "bx bxs-dashboard text-xl",
			title: "Dashboard",
			redirect: "/nutritionist/dashboard",
		},
		{
			icon: "bx bxs-user-detail text-xl",
			title: "My Customers",
			redirect: "/nutritionist/dashboard/customers",
		},
		{
			icon: "bx bxs-pear text-xl",
			title: "Diets",
			redirect: "/nutritionist/dashboard/diets",
		},
		{
			icon: "bx bxs-flag-checkered text-xl",
			title: "Goals",
			redirect: "/nutritionist/dashboard/goals",
		},
		{
			icon: "bx bxs-cog text-xl",
			title: "Settings",
			redirect: "/nutritionist/dashboard/settings",
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
