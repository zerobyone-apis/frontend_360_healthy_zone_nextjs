"use server";
import { getDashboardStats } from "@/actions/nutritionist/dashboard";
import PieChart from "@/app/ui/pie-chart";
import Table from "@/app/ui/table";
import ProgressCard from "../../ui/dashboard/progress-card";

function convertToCustomerTableValues(customers: any) {
	return customers.map((customer: any) => {
		const client_status = customer.client.client_status
			? customer.client.client_status.replaceAll("_", " ")
			: "";
		return {
			items: [
				customer.client.edited_name,
				customer.client.country,
				customer.client.training.length,
				client_status,
				"Details",
			],
			redirectTo: "/nutritionist/dashboard/customers?id=" + customer.id,
		};
	});
}

export default async function Page() {
	let stats;
	try {
		stats = await getDashboardStats();
	} catch (e) {
		console.error(e);
		return (
			<div className="flex flex-col gap-2 justify-center items-center h-full">
				<h3 className="text-lg">An error occurred while fetching data</h3>
				<p className="text-sm text-gray-500">Please try again later.</p>
			</div>
		);
	}
	let tableValues = [];
	if (stats.full_assignments)
		tableValues = convertToCustomerTableValues(stats.full_assignments);
	const pieChartValue = {
		series: [
			stats.total_completed_assignments,
			stats.total_in_progress_assignments,
			stats.total_ready_to_start_assignments,
		],
		colors: ["#a0b43b", "#16BDCA", "#9061F9"],
		labels: ["Completed", "In progress", "Ready to start"],
	};

	if (!stats.full_assignments.length) {
		return (
			<div className="flex flex-col gap-2 justify-center items-center h-full">
				<h3 className="text-lg">Wait until the admin assign a client to you</h3>
				<p className="text-sm text-gray-500">Check this site again in a few days 💪</p>
			</div>
		)
	}
	return (
		<div className="h-full grid grid-cols-3 gap-2">
			<div className="col-span-3">
				{tableValues.length && (
					<Table
						header={["Name", "Country", "Trainings", "Status"]}
						searchbox={false}
						values={tableValues}
					/>
				)}
			</div>
			<div className="md:col-span-1 col-span-3">
				<ProgressCard
					bcolor="bg-android-green-500"
					tcolor="text-android-green-500"
					target={stats.custom.customers_limit}
					percent={stats.custom.customers_percent}
					currentProgress={stats.custom.customers}
					title="Customers"
					icon="bx bxs-user-detail"
				/>
			</div>
			<div className="md:col-span-2 col-span-3">
				<PieChart
					stats={pieChartValue}
					title="Assignaments"
					redirect="/coach/dashboard/customers"
				/>
			</div>
		</div>
	);
}
