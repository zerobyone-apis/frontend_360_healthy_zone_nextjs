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
