'use client'
import Sidebar from "@/app/ui/sidebar-flowbite";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import { User } from "@/interfaces";

export default function Layout({ children }: { children: React.ReactNode }) {
    const user: User = JSON.parse(Cookies.get("user") || "{}");

    const navbarList = () => {
        if (user.client?.plan_type !== "BASIC") {
            return ([{
                icon: 'bx bxs-dashboard text-2xl',
                title: "Dashboard",
                redirect: "/dashboard"
            },
            {
                icon: 'bx bxs-pear text-xl',
                title: "Diets",
                redirect: "/dashboard/diets"
            },
            {
                icon: 'bx bx-sushi text-xl',
                title: "Recipes",
                redirect: "/dashboard/recipes"
            },
            {
                icon: 'bx bx-run text-xl',
                title: "Trainings",
                redirect: "/dashboard/trainings"
            },
            {
                icon: 'bx bxs-flag-checkered text-xl',
                title: "Goals",
                redirect: "/dashboard/goals"
            },
            {
                icon: "bx bx-bell text-xl",
                title: "Notifications",
                redirect: "/dashboard/notifications",
            },
            {
                icon: 'bx bxs-cog text-xl',
                title: "Settings",
                redirect: "/dashboard/settings"
            }])
        }

        return ([{
            icon: 'bx bxs-dashboard text-2xl',
            title: "Dashboard",
            redirect: "/dashboard"
        },
        {
            icon: 'bx bxs-pear text-xl',
            title: "Diets",
            redirect: "/dashboard/diets"
        },
        {
            icon: 'bx bx-run text-xl',
            title: "Trainings",
            redirect: "/dashboard/trainings"
        },
        {
            icon: 'bx bxs-flag-checkered text-xl',
            title: "Goals",
            redirect: "/dashboard/goals"
        },
        {
            icon: "bx bx-bell text-xl",
            title: "Notifications",
            redirect: "/dashboard/notifications",
        },
        {
            icon: 'bx bxs-cog text-xl',
            title: "Settings",
            redirect: "/dashboard/settings"
        }])
    }


    return (
        <>
            <main className=" bg-white">
                <Sidebar list={navbarList()} />
                <main className="p-4 sm:ml-64">
                    <div className="p-4 mt-14">
                        {children}
                    </div>
                </main>
            </main>
            <ToastContainer />
        </>
    )
}