"use server";
import { getGoalsByClientID } from "@/actions/goals/get-goal-by-id-client";
import CustomerGoalCard from "@/app/ui/coach/customer-goal-card";
import { GoalResponseDTO } from "@/interfaces/goals";
import Link from "next/link";
import Image from "next/image";

export default async function Page() {
	let goals: GoalResponseDTO[] | undefined;
	try {
		goals = await getGoalsByClientID();
	} catch (e) {
		console.error(e);
		return (
			<div className="flex flex-col gap-2 justify-center items-center h-full">
				<h3 className="text-lg">An error occurred while fetching data</h3>
				<p className="text-sm text-gray-500">Please try again later.</p>
			</div>
		);
	}

	if (!goals) {
		return (
			<div className="flex flex-col gap-2 justify-center items-center h-full">
				<h3 className="text-lg">It&apos;s time to assign some goals 💪</h3>
				<p className="text-sm text-gray-500">
					Assign a goal to a customer and view it here.
				</p>
				<Link
					href="?new-training=true"
					type="button"
					className="px-4 py-3 text-sm font-bold text-center hover:text-white border text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
				>
					Assign New Goal
				</Link>
			</div>
		);
	}
	return (
		<section className="grid grid-cols-4 gap-2">
			<div className="col-span-4 max-h-40">
				<div className="absolute w-full flex justify-center items-center h-40">
					<h3 className="text-3xl font-bold text-white shadow-inherit">
						Goals
					</h3>
				</div>
				<Image
					src={"/imgs/coach-goals-portada.webp"}
					height={3648}
					width={5472}
					alt="Goals cover"
					className="h-full object-cover rounded-xl"
				></Image>
			</div>

			<div className="grid grid-cols-1 gap-4 col-span-full">
				{goals.map(goal => {
					return (
						<CustomerGoalCard
							key={goal.id}
							assignment={goal.client}
							goal={goal}
							redirectTo="/dashboard/goals"
							showDeactivate={false}
						/>
					);
				})}
			</div>
		</section>
	);
}
