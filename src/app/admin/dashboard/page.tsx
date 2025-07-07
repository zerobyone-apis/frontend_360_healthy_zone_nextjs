
import { getAdminDashboardStatus } from "@/actions/admin/dashboard/get-dashboard-stats";
import { getUserMetricsByDate } from "@/actions/admin/dashboard/get-user-metrics";
import AmountCard from "@/app/ui/admin/amount-card";
import AmountCardRedirect from "@/app/ui/admin/amount-card-redirect";
import GraphicChart from "@/app/ui/admin/payments-chart";
import RecentPaymentsTable from "@/app/ui/admin/recent-payments-table";
import getLast30Days from "@/utils/getLast30Days";
import { cookies } from "next/headers";

export default async function Page() {
	const cookieStore = cookies();
	const user = JSON.parse(cookieStore.get("user")?.value || "{}");

    let stats, metrics;

	const { initDate, endDate } = getLast30Days();
	try {
		stats = await getAdminDashboardStatus();
		metrics = await getUserMetricsByDate({
			init_date: initDate,
			end_date: endDate,
		});
	//	actions = await getAdminActionsSummary(); // TODO: Esta llamada desaparecera
	} catch (e) {
		return (<div className="flex flex-col gap-2 justify-center items-center h-full">
			<h3 className="text-lg">An error occurred while fetching data</h3>
			<p className="text-sm text-gray-500">Please try again later.</p>
		</div>)
	}

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
                        <div className="col-span-2 md:col-span-1">
                                <AmountCard
                                        title="Progress to approve"
                                        content={stats.amount_of_client_progress_to_approval_today}
                                />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                                <AmountCard
                                        title="Pending payments"
                                        content={stats.success_and_pending_payments.amount_of_pending_payments}
                                />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                                <AmountCard
                                        title="Successful payments"
                                        content={stats.success_and_pending_payments.amount_of_success_payments}
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
                        <div className="col-span-full md:col-span-2">
                                <RecentPaymentsTable payments={stats.success_and_pending_payments.payments} />
                        </div>
                        <div className="col-span-full md:col-span-2 gap-2 flex flex-col">
                                <AmountCardRedirect
                                        title="Notifications to approve"
                                        content={stats.to_approval_notifications}
                                        redirectTo="/admin/dashboard/pending-actions?tab=notifications"
                                />
                                <AmountCardRedirect
                                        title="Client progress to approve"
                                        content={stats.to_approval_client_progresses}
                                        redirectTo="/admin/dashboard/pending-actions?tab=progress"
                                />
                                <AmountCardRedirect
                                        title="Clients to assign"
                                        content={stats.to_assign_clients_to_professionals}
                                        redirectTo="/admin/dashboard/pending-actions?tab=clients"
                                />
                        </div>
                </section>
        );
}
