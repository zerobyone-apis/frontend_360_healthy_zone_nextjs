/* eslint-disable react/react-in-jsx-scope */
"use server";

import UserMiniList from "@/app/ui/user-mini-list";
import AmountCard from "@/app/ui/admin/amount-card";
import { cookies } from "next/headers";
import { getDashboardNutritionistSummaryStats } from "@/actions/coach/dashboard";

export default async function Page() {
	const cookieStore = cookies();
	const user = JSON.parse(cookieStore.get("user")?.value || "{}");

	let stats;
	let totalGoals = 0;
	let totalDiets = 0;
	try {
		stats = await getDashboardNutritionistSummaryStats();
		console.log(stats);
		totalGoals = stats.total_goals_created;
		totalDiets = stats.total_diets_created;
		
	} catch (e) {
		console.error(e);
		return (
			<div className="flex flex-col gap-2 justify-center items-center h-full">
				<h3 className="text-lg">An error occurred while fetching data</h3>
				<p className="text-sm text-gray-500">Please try again later.</p>
			</div>
		);
	}

	if (!stats.client_assigned.length) {
		return (
			<div className="flex flex-col gap-2 justify-center items-center h-full">
				<h3 className="text-lg">Wait until the admin assign a client to you</h3>
				<p className="text-sm text-gray-500">Check this site again in a few days 💪</p>
			</div>
		);
	}
	return (
		<div className="grid grid-cols-3 gap-4">
			<div className="col-span-full p-2">
				<h2 className="text-xl font-semibold ">Dashboard</h2>
				<p className="text-sm">Welcome back, {user.nutritionist.first_name}</p>
			</div>

			<div className="md:col-span-1 col-span-full gap-2 flex flex-col">
				<AmountCard title={"Customers"} content={`${stats.client_assigned.length} / ${stats.custom.customers_limit}`} />
			</div>
			<div className="md:col-span-1 col-span-full gap-2 flex flex-col">
				<AmountCard title={"Goals"} content={totalGoals} />
			</div>
			<div className="md:col-span-1 col-span-full gap-2 flex flex-col">
				<AmountCard title={"Diets"} content={totalDiets} />
			</div>
			<div className="col-span-full">
				<UserMiniList clients={stats.client_assigned} redirect="/nutritionist/dashboard/customers" />
			</div>
		</div>
	);
}
