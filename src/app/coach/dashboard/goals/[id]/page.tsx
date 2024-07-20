"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getGoalByID } from "@/actions/goals/get-goal-by-id";
import { GoalResponseDTO } from "@/interfaces/goals";
import { toast } from "react-toastify";
import { getProgressByClientID } from "@/actions/goals/get-progress";
import { ProgressResponseDTO } from "@/interfaces/progress";
import Link from "next/link";
import CustomerTrainingCard from "@/app/ui/coach/customer-training-card";
import ConfirmationDialog from "@/app/ui/confirmation-dialog";
import TrainingDetailsDialog from "@/app/ui/coach/training-details.dialog";
import { deactivateTraining } from "@/actions/trainings/deactivate-training";
import ProgressCard from "@/app/ui/coach/progress-card";

export default function Page() {
	const router = useRouter();
	const param = useParams();
	const searchParams = useSearchParams();
	const [goal, setGoal] = useState<GoalResponseDTO>();
	const [progress, setProgress] = useState<ProgressResponseDTO[] | null>();

	async function getGoalAndProgress() {
		const id: string = Array.isArray(param.id) ? param.id[0] : param.id;

		try {
			const goalResponse = await getGoalByID(id);
			if (!goalResponse) {
				toast.error("Goal not found");
				return router.back();
			}
			//sort trainings by created date
			goalResponse.trainings.sort((a, b) => {
				return (
					new Date(a.created_on).getTime() - new Date(b.created_on).getTime()
				);
			});

			setGoal(goalResponse);

			const progressResponse = await getProgressByClientID(
				goalResponse.client.id
			);
			const progressFiltered = progressResponse?.filter(
				p => p.goal_id == goalResponse.id
			);

			const progressSorted = progressFiltered
				?.filter(p => p.is_valid === true && p.is_blocked === false)
				.sort((a, b) => {
					return (
						new Date(a.created_on).getTime() - new Date(b.created_on).getTime()
					);
				});

			setProgress(progressSorted);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getGoalAndProgress();
	}, []);

	const showTrainingDetails = searchParams.get("details");
	const confirmDelete = searchParams.get("confirm-delete");
	const trainingId = searchParams.get("training_id");
	const trainingSelected =
		goal?.trainings.find(train => train.training_id == trainingId) || null;
	const confirmDeactivateTraining = async () => {
		// Deactivate training
		if (!trainingId) return;
		try {
			await deactivateTraining(trainingId);
			toast.success("Training deactivated successfully");
		} catch (e) {
			console.error(e);
			toast.error("Failed to deactivate training");
		}

		router.back();
		setTimeout(() => {
			window.location.reload();
		}, 100);
	};

	//TODO Implement the page LOADING and ERROR states
	if (!goal) return <div>Loading</div>;

	return (
		<section className="p-2">
			<div className="w-full inline-flex justify-end gap-2">
				<Link
					href={`?edit-progress=true`}
					type="button"
					className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
				>
					<i className="bx bx-detail"></i>
					Edit progress
				</Link>
				<Link
					href={`?confirm-delete=true`}
					type="button"
					className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
				>
					<i className="bx bx-x"></i>
					Deactivate
				</Link>
			</div>
			<div className="w-full text-center flex justify-center flex-col p-2">
				<h1 className="text-xl text-jungle-green-700 font-bold text-center">
					{goal.goalType
						.replace(/_/g, " ")
						.toLowerCase()
						.replace(/\b\w/g, (l: any) => l.toUpperCase())}{" "}
					{goal.isCompleted ? (
						<span className="bg-green-100 text-green-800 text-sm font-bold me-2 px-2.5 py-0.5 rounded-full">
							Completed
						</span>
					) : (
						<span className="bg-yellow-100 text-yellow-800 text-sm font-bold me-2 px-2.5 py-0.5 rounded-full">
							In Progress
						</span>
					)}
				</h1>
				<p className="text-center">{goal.descriptionGoal}</p>
			</div>
			<div className="p-5">
				<div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
					<div
						className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
						style={{ width: goal.percentage + "%" }}
					>
						{" "}
						{goal.percentage}%
					</div>
				</div>
			</div>
			<p className="text-sm">
				Duration:{" "}
				<span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 ">
					<svg
						className="w-2.5 h-2.5 me-1.5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
					</svg>
					{goal.amountOfDays} days
				</span>
			</p>
			<p className="text-sm">
				Created:{" "}
				{new Date(goal.created_on).toLocaleDateString("en-US", {
					weekday: "short",
					day: "numeric",
					month: "long",
				})}
			</p>
			<p className="text-sm ">
				End Date:{" "}
				{new Date(goal.end_on).toLocaleDateString("en-US", {
					weekday: "short",
					day: "numeric",
					month: "long",
				})}
			</p>
			<div className="w-full grid grid-cols-3 gap-2 mt-2">
				<div className="col-span-3">
					<h2 className="text-lg font-semibold text-jungle-green-700">
						Progress
					</h2>
				</div>
				<div className="col-span-3">
					{progress?.map(p => (
						<ProgressCard progress={p} key={p.id} />
					))}
				</div>
			</div>
			<div className="w-full grid grid-cols-3 gap-2 mt-2">
				<div className="col-span-3">
					<h2 className="text-lg font-semibold text-jungle-green-700">
						Targets Metrics
					</h2>
				</div>
				<div className="col-span-1 col-start-2">
					<label
						htmlFor="small-input"
						className="block mb-1 text-sm font-medium text-gray-900"
					>
						Initial Height
					</label>
					<p
						id="small-input"
						className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500  overflow-hidden"
					>
						{goal.initial_height}
					</p>
				</div>
				<div className="col-span-1 col-end-2">
					<label
						htmlFor="small-input"
						className="block mb-1 text-sm font-medium text-gray-900"
					>
						Initial Weight
					</label>
					<p
						id="small-input"
						className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 overflow-hidden"
					>
						{goal.initial_weight}
					</p>
				</div>
				<div className="col-span-1">
					<label
						htmlFor="small-input"
						className="block mb-1 text-sm font-medium text-gray-900"
					>
						Current Weight
					</label>
					<p
						id="small-input"
						className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500  overflow-hidden"
					>
						{goal.current_weight}
					</p>
				</div>
				<div className="col-span-1">
					<label
						htmlFor="small-input"
						className="block mb-1 text-sm font-medium text-gray-900"
					>
						Target Weight
					</label>
					<p
						id="small-input"
						className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500  overflow-hidden"
					>
						{goal.target_weight}
					</p>
				</div>
				<div className="col-span-1 col-end-2">
					<label
						htmlFor="small-input"
						className="block mb-1 text-sm font-medium text-gray-900 "
					>
						Initial Body Fat Percentage
					</label>
					<p
						id="small-input"
						className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500  overflow-hidden"
					>
						{goal.initial_body_fat_percentage}
					</p>
				</div>
				<div className="col-span-1">
					<label
						htmlFor="small-input"
						className="block mb-1 text-sm font-medium text-gray-900"
					>
						Current Body Fat Percentage
					</label>
					<p
						id="small-input"
						className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500  overflow-hidden"
					>
						{goal.current_body_fat_percentage}
					</p>
				</div>
				<div className="col-span-1">
					<label
						htmlFor="small-input"
						className="block mb-1 text-sm font-medium text-gray-900"
					>
						Target Body Fat Percentage
					</label>
					<p
						id="small-input"
						className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500  overflow-hidden"
					>
						{goal.target_body_fat_percentage}
					</p>
				</div>
			</div>
			<div className="gap-5 flex-col flex m-5">
				<h2 className="text-lg font-semibold text-jungle-green-700">
					Trainings
				</h2>

				{goal.trainings.length ? (
					goal.trainings.map((training: any) => {
						return (
							<CustomerTrainingCard
								key={training.training_id}
								training={training}
								assignment={goal.client}
								showActions={true}
							/>
						);
					})
				) : (
					<div className="flex flex-col gap-2 justify-center items-center h-full">
						<h3 className="text-lg">
							It&apos;s time to assign some trainings 💪
						</h3>
						<p className="text-sm text-gray-500">
							Assign a training to a customer to view it here
						</p>
						<Link
							href={"?new-training=true&client_id=" + goal.client.id}
							type="button"
							className="px-4 py-3 text-sm font-bold text-center hover:text-white border text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
						>
							Assign New Training
						</Link>
					</div>
				)}
			</div>

			{confirmDelete && trainingId && (
				<ConfirmationDialog
					canClose={true}
					confirmAction={confirmDeactivateTraining}
					cancelAction={() => {
						router.push("/coach/dashboard/goals/" + goal.id, { replace: true });
					}}
					handleClose={() => {
						router.push("/coach/dashboard/goals/" + goal.id, { replace: true });
					}}
					title={"Are you sure you want to deactivate this training?"}
				/>
			)}
			{showTrainingDetails && trainingSelected && (
				<TrainingDetailsDialog
					training={trainingSelected}
					handleCloseOuter={() => {
						router.push("/coach/dashboard/goals/" + goal.id, { replace: true });
					}}
				/>
			)}
		</section>
	);
}
