"use client";
import { getDashboardStats } from "@/actions/coach/dashboard";
import { SummaryCoach } from "@/interfaces/summary_coach";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NewGoalDialog() {
	const router = useRouter();
	const [stats, setStats] = useState<SummaryCoach | null>(null);
	useEffect(() => {
		getDashboardStats()
			.then(data => setStats(data))
			.catch(error => console.error(error));
	}, []);
	const [selectedClient, setSelectedClient] = useState("");
	const [selectedGoalType, setSelectedGoalType] = useState("");
	const [selectedTrainerPlan, setSelectedTrainerPlan] = useState("");
	const [goalDescription, setGoalDescription] = useState("");
	const [healthyDescription, setHealthyDescription] = useState("");
	const [weightTarget, setWeightTarget] = useState(0);
	const [targetBodyFatPercentage, setTargetBodyFatPercentage] = useState(0);

	return (
		<dialog
			id="select-modal"
			tabIndex={-1}
			className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full bg-gray-900 bg-opacity-50"
		>
			<div className="relative p-4 w-full max-w-md max-h-full">
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
					<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							New Goal
						</h3>
						<button
							type="button"
							onClick={() => router.back()}
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
							data-modal-toggle="select-modal"
						>
							<i className="bx bx-x"></i>
							<span className="sr-only">Close modal</span>
						</button>
					</div>

					<div className="p-4 md:p-5">
						<form className="max-w-sm mx-auto grid grid-cols-4 gap-2">
							<div className="col-span-full">
								<label
									htmlFor="client"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Clients list
								</label>
								<select
									id="client"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									required
									value={selectedClient}
									onChange={e => setSelectedClient(e.target.value)}
								>
									<option value="">Select a client</option>
									{stats?.full_assignments.map((assignment: any) => (
										<option key={assignment.id} value={assignment}>
											{assignment.client.edited_name}
										</option>
									))}
								</select>
							</div>
							<div className="col-span-2">
								<label
									htmlFor="goal-type"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Goal type
								</label>
								<select
									id="goal-type"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									value={selectedGoalType}
									required
									onChange={e => setSelectedGoalType(e.target.value)}
								>
									<option value="">Select goal type</option>
									<option value="LOSE_WEIGHT">Lose weight</option>
									<option value="INCREASE_MASS_MUSCLE">
										Increase mass muscle
									</option>
									<option value="LOSE_WEIGHT_HEALTHY_HABITS">
										Lose weight healthy habits
									</option>
								</select>
							</div>
							<div className="col-span-2">
								<label
									htmlFor="training-plan"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Trainer plan
								</label>
								<select
									id="training-plan"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									value={selectedTrainerPlan}
									onChange={e => setSelectedTrainerPlan(e.target.value)}
									required
								>
									<option value="">Select trainer plan</option>
									<option value="MUSCLE">Muscle</option>
									<option value="RITMIA">Ritmia</option>
									<option value="HIPERTROFIA">Hipertrofia</option>
									<option value="NOT_APPLY">Not Apply</option>
								</select>
							</div>

							<div className="col-span-full">
								<label
									htmlFor="description"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Goal Description
								</label>
								<textarea
									onChange={e => setGoalDescription(e.target.value)}
									value={goalDescription}
									id="description"
									rows={4}
									required
									className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Write your description here..."
								></textarea>
							</div>
							<div className="col-span-full">
								<label
									htmlFor="healthy_description"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Healthy Focus Description
								</label>
								<textarea
									onChange={e => setHealthyDescription(e.target.value)}
									value={healthyDescription}
									id="healthy_description"
									rows={2}
									required
									className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Write your healthy focus description here..."
								></textarea>
							</div>
							<div className="col-span-2">
								<label
									htmlFor="weight-target"
									className="block mb-2 text-sm font-medium text-gray-900"
								>
									Weight target
								</label>
								<input
									type="number"
									id="weight-target"
									value={weightTarget}
									onChange={e => {
										if (Number(e.target.value) >= 0)
											setWeightTarget(Number(e.target.value));
									}}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									placeholder="120kg"
									required
								/>
							</div>
							<div className="col-span-2">
								<label
									htmlFor="target-body-fat-percentage"
									className="block mb-2 text-sm font-medium text-gray-900"
								>
									Target body fat percentage
								</label>
								<input
									type="number"
									id="target-body-fat-percentage"
									value={targetBodyFatPercentage}
									onChange={e => {
										if (Number(e.target.value) >= 0)
											setTargetBodyFatPercentage(Number(e.target.value));
									}}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									placeholder="70%"
									required
								/>
							</div>
						</form>
						<button className="text-white inline-flex w-full justify-center mt-2 bg-jungle-green-700 hover:bg-jungle-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
							Create Goal
						</button>
					</div>
				</div>
			</div>
		</dialog>
	);
}
