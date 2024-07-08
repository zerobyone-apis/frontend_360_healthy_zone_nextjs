"use client";
import React, { useEffect, useState } from "react";
import { getDashboardStats } from "@/actions/coach/dashboard";
import CustomerCard from "@/app/ui/coach/customer-card";
import Link from "next/link";

export default function Page() {
	const [stats, setStats] = useState<any>(null);
	useEffect(() => {
		getDashboardStats().then(data => {
			setStats(data);
		});
	}, []);

	if (!stats) return null;
	return (
		<section>
			<div className="gap-2 flex flex-col md:inline-flex md:flex-row justify-between w-full mb-5 p-5">
				<h1 className="text-xl text-jungle-green-700 font-bold">Customers</h1>
				<div className="gap-2 inline-flex">
					<Link
						href="/coach/dashboard/goals?new-goal=true"
						type="button"
						className="px-3 py-2 text-xs font-medium text-center hover:text-white border border-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
					>
						<i className="bx bx-plus me-1"></i>
						New Goal
					</Link>
					<Link
						href="/coach/dashboard/trainings?new-training=true"
						type="button"
						className="px-3 py-2 text-xs font-medium text-center hover:text-white border border-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
					>
						<i className="bx bx-plus me-1"></i>
						New training
					</Link>
				</div>
			</div>

			<div className="gap-3">
				{stats.full_assignments.map((assigned: any) => {
					return <CustomerCard key={assigned.id} client={assigned.client} />;
				})}
			</div>
		</section>
	);
}
