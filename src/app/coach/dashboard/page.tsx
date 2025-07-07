/* eslint-disable react/react-in-jsx-scope */
"use server";
import { getDashboardCoachSummaryStats } from "@/actions/coach/dashboard";
import AmountCard from "@/app/ui/admin/amount-card";
import UserMiniList from "@/app/ui/user-mini-list";
import { cookies } from "next/headers";

export default async function Page() {
	const cookieStore = cookies();
	const user = JSON.parse(cookieStore.get("user")?.value || "{}");
	let stats;
	let totalGoals = 0;
	let totalTrainings = 0;

	try {
		stats = await getDashboardCoachSummaryStats();
		
		totalGoals = stats.total_goals_created;
		totalTrainings = stats.total_trainings_created
	} catch (e) {
		console.error(e);
		return (
			<div className="flex flex-col gap-2 justify-center items-center h-full">
				<h3 className="text-lg">An error occurred while fetching data</h3>
				<p className="text-sm text-gray-500">Please try again later.</p>
			</div>
		);
	}

	if (!stats) return null;
	return (
		<div className="grid grid-cols-3 gap-4">
			<div className="col-span-full p-2">
				<h2 className="text-xl font-semibold ">Dashboard</h2>
				<p className="text-sm">Welcome back, {user.coach.first_name}</p>
			</div>

			<div className="md:col-span-1 col-span-full gap-2 flex flex-col">
				<AmountCard title={"Customers"} content={`${stats.client_assigned.length} / ${stats.custom.customers_limit}`} />
			</div>
			<div className="md:col-span-1 col-span-full gap-2 flex flex-col">
				<AmountCard title={"Goals"} content={totalGoals} />
			</div>
			<div className="md:col-span-1 col-span-full gap-2 flex flex-col">
				<AmountCard title={"Trainings"} content={totalTrainings} />
			</div>
			<div className="col-span-full">
				<UserMiniList clients={stats.client_assigned} redirect="/coach/dashboard/customers" />
			</div>
		</div>
	);
}
