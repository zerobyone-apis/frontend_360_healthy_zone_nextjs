"use server";
import { getDashboardStats } from "@/actions/coach/dashboard";
import DialogsWrapper from "@/app/ui/coach/coach-goals-dialogs-wrapper";
import CustomerGoalCard from "@/app/ui/coach/customer-goal-card";
import { SummaryCoach } from "@/interfaces/summary_coach";
import Link from "next/link";

export default async function Page() {
	const stats: SummaryCoach = await getDashboardStats();

	if (!stats) return null;
	return (
		<>
			<section>
				<div className="inline-flex justify-between w-full mb-5 p-5">
					<h1 className="text-xl text-jungle-green-700 font-bold">Goals</h1>
					<Link
						href="?new-goal=true"
						type="button"
						className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
					>
						<i className="bx bx-plus me-1"></i>
						New Goal
					</Link>
				</div>

				<div className="grid grid-cols-1 gap-4">
					{stats.goals_created.map(goal => {
						const assignment = stats.full_assignments.find(
							assignament => Number(assignament.client.id) == goal.client_id
						);
						return (
							<CustomerGoalCard
								key={goal.id}
								assignment={assignment}
								goal={goal}
							/>
						);
					})}
				</div>
			</section>
			<DialogsWrapper />
		</>
	);
}
