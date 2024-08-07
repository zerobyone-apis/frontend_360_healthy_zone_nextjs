import { getAdminActionsSummary } from "@/actions/admin/dashboard/get-actions-summary";
import { getAdminDashboardStatus } from "@/actions/admin/dashboard/get-dashboard-stats";
import { getUserMetricsByDate } from "@/actions/admin/dashboard/get-user-metrics";
import AmountCard from "@/app/ui/admin/amount-card";
import AmountCardRedirect from "@/app/ui/admin/amount-card-redirect";
import GraphicChart from "@/app/ui/admin/payments-chart";
import getLast30Days from "@/utils/getLast30Days";
import { cookies } from "next/headers";

export default async function Page() {
	const cookieStore = cookies();
	const user = JSON.parse(cookieStore.get("user")?.value || "{}");
	const stats = await getAdminDashboardStatus();
	const { initDate, endDate } = getLast30Days();
	const metrics = await getUserMetricsByDate({
		init_date: initDate,
		end_date: endDate,
	});
	const actions = await getAdminActionsSummary();

	return (
		<section className="grid grid-cols-4 gap-4">
			<div className="col-span-full p-2">
				<h2 className="text-xl font-semibold">Dashboard</h2>
				{<p className="text-sm">Welcome back, {user.admin.first_name}</p>}
			</div>

			<div className="col-span-2 md:col-span-1">
				<AmountCard
					title="Total users"
					content={stats.amount_of_active_users}
				/>
			</div>
			<div className="col-span-2 md:col-span-1">
				<AmountCard
					title="Active clients"
					content={stats.amount_of_active_clients}
				/>
			</div>
			<div className="col-span-2 md:col-span-1">
				<AmountCard
					title="Active Coaches"
					content={stats.amount_of_active_coaches}
				/>
			</div>
			<div className="col-span-2 md:col-span-1">
				<AmountCard
					title="Active Nutritionists"
					content={stats.amount_of_active_nutritionist}
				/>
			</div>
			<div className="col-span-full md:col-span-2">
				<GraphicChart
					title="Total users in last 30 days"
					metrics={metrics}
					buttonText="View all"
					buttonLink="/admin/dashboard/users"
				/>
			</div>
			<div className="col-span-full md:col-span-2 gap-2 flex flex-col">
				<AmountCardRedirect
					title="Notifications to approve"
					content={actions.to_approval_notifications.length}
				/>
				<AmountCardRedirect
					title="Client progress to approve"
					content={actions.to_approvals_client_progresses.length}
				/>
				<AmountCardRedirect
					title="Clients to assign"
					content={actions.to_assign_clients_to_professionals.length}
				/>
			</div>
		</section>
	);
}
