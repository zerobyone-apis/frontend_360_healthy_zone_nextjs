/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";
import { getDashboardStats } from "@/actions/coach/dashboard";
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
		stats = await getDashboardStats();
		console.log(stats)
		totalGoals = stats.goals_created.length;
		stats.goals_created.forEach((goal: any) => {
			totalTrainings += goal.trainings.length;
		})
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
				<AmountCard title={"Customers"} content={`${stats.full_assignments.length} / ${stats.custom.customers_limit}`} />
			</div>
			<div className="md:col-span-1 col-span-full gap-2 flex flex-col">
				<AmountCard title={"Goals"} content={totalGoals} />
			</div>
			<div className="md:col-span-1 col-span-full gap-2 flex flex-col">
				<AmountCard title={"Trainings"} content={totalTrainings} />
			</div>
			<div className="col-span-full">
				<UserMiniList users={stats.full_assignments} redirect="/coach/dashboard/customers" />
			</div>
		</div>
	);
}
