"use client";
import { getDashboardStats } from "@/actions/coach/dashboard";
import { ClientEdited } from "@/interfaces/goals";
import { SummaryCoach } from "@/interfaces/summary_coach";
import clsx from "clsx";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NewGoalDialog() {
	const router = useRouter();
	const [stats, setStats] = useState<SummaryCoach | null>(null);
	useEffect(() => {
		getDashboardStats()
			.then(data => setStats(data))
			.catch(error => {
				toast.error("Something went wrong")
				return <div className="flex justify-center items-center h-screen gap-2">
					<p>Something went wrong...</p>
				</div>;
			});
	}, []);

	const [selectedClient, setSelectedClient] = useState("");
	const [client, setClient] = useState<ClientEdited | null>(null);

	const [selectedGoalType, setSelectedGoalType] = useState("");
	const [selectedTrainerPlan, setSelectedTrainerPlan] = useState("");
	const [goalDescription, setGoalDescription] = useState("");
	const [healthyDescription, setHealthyDescription] = useState("");
	const [weightTarget, setWeightTarget] = useState(0);
	const [targetBodyFatPercentage, setTargetBodyFatPercentage] = useState(0);
	const [amountOfDays, setAmountOfDays] = useState(0);

	useEffect(() => {
		if (selectedClient) {
			const client =
				stats?.full_assignments.find(
					assignment => assignment.client.id == selectedClient
				)?.client || null;
			setClient(client);
		}
	}, [selectedClient]);

	const handleCreateGoal = async () => {
		// Validate fields
		if (!selectedClient || !client) {
			toast.warning("Please select a client");
			return;
		}

		if (!selectedGoalType || !selectedTrainerPlan || !goalDescription) {
			toast.warning("Please fill all the required fields");
			return;
		}

		// Create goal
		const goal = {
			description_goal: goalDescription,
			percentage_body_fat: 0,
			healthy_focus_description: healthyDescription,
			type: selectedGoalType,
			nutritionist_plans: null,
			trainer_plans: selectedTrainerPlan,
			amount_of_days: amountOfDays,
			initial_weight: client.initial_weight,
			initial_height: client.initial_height,
			initial_body_fat_percentage: 0,
			current_weight: client.current_weight,
			target_weight: weightTarget,
			current_body_fat_percentage: 0,
			target_body_fat_percentage: 0,
		};
		try {
			const response = await createNewGoal(selectedClient, goal);
			response && toast.success("Goal created successfully");
			router.push("/coach/dashboard/goals");
			setTimeout(() => {
				window.location.reload();
			}, 100);
		} catch (e) {
			toast.error("Error creating goal");
		}
	};

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
										<option key={assignment.id} value={assignment.client.id}>
											{assignment.client.edited_name}
										</option>
									))}
								</select>
							</div>
							<div className="col-span-full">
								{client && <ClientInfoAccordion client={client} />}
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
						<button
							disabled={!client}
							onClick={handleCreateGoal}
							className="text-white inline-flex w-full justify-center mt-2 bg-jungle-green-700 hover:bg-jungle-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
						>
							Create Goal
						</button>
					</div>
				</div>
			</div>
		</dialog>
	);
}

import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { createNewGoal } from "@/actions/goals/create-goal";

function ClientInfoAccordion({ client }: { client: ClientEdited }) {
	const [hidden, setHidden] = useState(false);
	const collapsedVariants = {
		collapsed: { height: 0, overflow: "hidden", opacity: 0 },
		open: { height: "auto", opacity: 1 },
	};
	return (
		<div id="accordion-collapse" data-accordion="collapse">
			<h2 id="accordion-collapse-heading-1">
				<button
					type="button"
					className={clsx(
						"flex items-center justify-between w-full p-2 font-medium rtl:text-right text-gray-500 border rounded-t-xl  border-gray-200 focus:ring-1 hover:bg-gray-100 gap-3",
						hidden && "rounded-b-xl"
					)}
					data-accordion-target="#accordion-collapse-body-1"
					aria-expanded={hidden ? "false" : "true"}
					aria-controls="accordion-collapse-body-1"
					onClick={() => setHidden(!hidden)}
				>
					<span>Client information</span>
					<svg
						data-accordion-icon
						className="w-3 h-3 rotate-180 shrink-0"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 10 6"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 5 5 1 1 5"
						/>
					</svg>
				</button>
			</h2>
			<AnimatePresence initial={false}>
				{!hidden && (
					<motion.div
						id="accordion-collapse-body-1"
						aria-labelledby="accordion-collapse-heading-1"
						key="content"
						initial="collapsed"
						animate="open"
						exit="collapsed"
						variants={collapsedVariants}
						transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
					>
						{client.description && (
							<div className="p-5 border border-gray-200 h-full">
								<p className="mb-2 text-gray-500">{client.description}</p>
							</div>
						)}
						<div className="p-2 border border-gray-200 h-full flex flex-col gap-2">
							{client.goalClients.length ? (
								<>
									<h5 className="text-sm">Client Goals</h5>
									<ul className="list-disc list-inside">
										{client.goalClients.map(goal => (
											<li key={goal.id}>{goal.target}</li>
										))}
									</ul>
								</>
							) : null}
							<div className="gap-2 grid grid-cols-2">
								<span className="p-2.5 bg-gray-100 border rounded col-span-1">
									Initial Weight: {client.initial_weight}
								</span>
								<span className="p-2.5 bg-gray-100 border rounded col-span-1">
									Initial Height: {client.initial_height}
								</span>
								<span className="p-2.5 bg-gray-100 border rounded col-span-1">
									Current Weight: {client.current_weight}
								</span>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
