"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getGoalByID } from "@/actions/goals/get-goal-by-id";
import { GoalResponseDTO } from "@/interfaces/goals";
import { toast } from "react-toastify";
import { getProgressByClientID } from "@/actions/goals/get-progress";
import { ProgressResponseDTO } from "@/interfaces/progress";
import Link from "next/link";
import ConfirmationDialog from "@/app/ui/confirmation-dialog";
import { deactivateTraining } from "@/actions/trainings/deactivate-training";
import ProgressCard from "@/app/ui/coach/progress-card";
import DietResumeCard from "@/app/ui/dashboard/diets/diet-resume-card";

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
			goalResponse.diets.sort((a, b) => {
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
	const dietID = searchParams.get("diet_id");
	const trainingSelected =
		goal?.trainings.find(train => train.training_id == dietID) || null;
	const confirmDeactivateDiet = async () => {
		// Deactivate training
		if (!dietID) return;
		try {
			await deactivateTraining(dietID);
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
						style={{ width: goal.isCompleted ? "100%" : goal.percentage + "%" }}
					>
						{" "}
						{goal.isCompleted ? "100" : goal.percentage}%
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
					{progress?.map((p, index) => (
						<ProgressCard progress={p} key={index} />
					))}

					{!progress?.length &&
						<div className="w-full p-4 bg-jungle-green-100 shadow rounded-xl text-center text-gray-500">
							No progress yet...
						</div>}
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
						{Math.ceil(goal.initial_height)} cm
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
						{Math.ceil(goal.initial_weight)} kg
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
						{Math.ceil(goal.client.current_weight)} kg
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
						{Math.ceil(goal.target_weight)} kg
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
						{Math.ceil(goal.initial_body_fat_percentage)}%
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
						{Math.ceil(goal.current_body_fat_percentage)}%
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
						{Math.ceil(goal.target_body_fat_percentage)}%
					</p>
				</div>
			</div>
			<div className="gap-5 flex-col flex m-5">
				<h2 className="text-lg font-semibold text-jungle-green-700">
					Diets
				</h2>

				{goal.diets.length ? (
					goal.diets.map((diet: any, index) => {
						return (
							<DietResumeCard key={diet.diet_id} diet={diet} index={index} />
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

			{confirmDelete && dietID && (
				<ConfirmationDialog
					canClose={true}
					confirmAction={confirmDeactivateDiet}
					cancelAction={() => {
						router.push("/nutritionist/dashboard/goals/" + goal.id, { replace: true });
					}}
					handleClose={() => {
						router.push("/nutritionist/dashboard/goals/" + goal.id, { replace: true });
					}}
					title={"Are you sure you want to deactivate this training?"}
				/>
			)}
		</section>
	);
}
