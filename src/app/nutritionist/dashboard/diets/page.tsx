/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { getDashboardStats } from "@/actions/nutritionist/dashboard";
import Link from "next/link";
import DietResumeCard from "@/app/ui/nutritionist/diet-resume-card";
import { NewDietDrawer } from "@/app/ui/nutritionist/new-diet-drawer";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function Page() {
    const [stats, setStats] = useState<any>(null);
    const [error, setError] = useState<boolean>(false);
    const [diets, setDiets] = useState<any[]>([])
    const params = useSearchParams();
    const router = useRouter();
    const [openDrawer, setOpenDrawer] = useState(false);

    useEffect(() => {
        setOpenDrawer(!!params.get("new-diet"));
    }, [params]);

    useEffect(() => {
        getDashboardStats()
            .then((data: any) => {
                setStats((prev: any) => ({ ...prev, ...data }));
                const diets_list: any[] = [];
                data.goals_created.forEach((goal: any) => {
                    goal.diets.forEach((diet: any) => {
                        if (diet) diets_list.push({ ...diet, client_info: { ...goal.client } });
                    });
                });
                setDiets(diets_list);
            })
            .catch(() => {
                toast.error("Something went wrong");
                setError(true);
            });
    }, []);

    const handleCloseFn = () => {
        setOpenDrawer(false);
        router.push("/nutritionist/dashboard/diets");
    }


    if (!stats || !stats.full_assignments.length) {
        return (
            <div className="flex flex-col gap-2 justify-center items-center h-full">
                <h3 className="text-lg">Wait until the admin assign a client to you</h3>
                <p className="text-sm text-gray-500">Check this site again in a few days 💪</p>
            </div>
        )
    }
    if (error)
        return (
            <div className="flex flex-col gap-2 justify-center items-center h-full">
                <h3 className="text-lg">An error occurred while fetching data</h3>
                <p className="text-sm text-gray-500">Please try again later.</p>
            </div>
        );
    return (
        <section>
            <div className="gap-2 flex flex-col md:inline-flex md:flex-row justify-between w-full mb-5 p-5">
                <h1 className="text-xl text-jungle-green-700 font-bold">Diets</h1>
                <div className="gap-2 inline-flex">
                    <Link
                        href="/nutritionist/dashboard/diets?new-diet=true"
                        type="button"
                        className="px-3 py-2 text-xs font-medium text-center hover:text-white border border-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 bg-white"
                    >
                        <i className="bx bx-plus me-1"></i>
                        New diet
                    </Link>
                </div>
            </div>

            <div className="gap-3 flex flex-col">
                {diets.map((diet: any, index: number) => {
                    const list = [{
                        label: "See details",
                        redirect: "/nutritionist/dashboard/diets/" + diet.diet_id
                    },
                    {
                        label: "Disable diet",
                        redirect: "/nutritionist/dashboard/diest?disable_diet=true&diet_id=" + diet.diet_id
                    }
                    ]
                    return <DietResumeCard key={diet.diet_id} diet={diet} index={index} list={list} />
                })}
            </div>

            <NewDietDrawer open={openDrawer}
                handleCloseFn={handleCloseFn}
                hint={{ href: "/nutritionist/dashboard/diets", title: "Go back" }}
                clients={stats.full_assignments} />
        </section>
    );
}

