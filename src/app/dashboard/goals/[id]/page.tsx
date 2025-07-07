/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getGoalByID } from "@/actions/goals/get-goal-by-id";
import { GoalResponseDTO } from "@/interfaces/goals";
import { toast } from "react-toastify";
import { getProgressByClientID } from "@/actions/goals/get-progress";
import { ProgressResponseDTO } from "@/interfaces/progress";
import ConfirmationDialog from "@/app/ui/confirmation-dialog";
import TrainingDetailsDialog from "@/app/ui/coach/training-details.dialog";
import { deactivateTraining } from "@/actions/trainings/deactivate-training";
import ProgressCard from "@/app/ui/coach/progress-card";
import TrainingResumeCard from "@/app/ui/dashboard/trainings/training-resume-card";
import LoadingPage from "@/app/ui/loading.page";
import { CreateProgressDrawer } from "@/app/ui/dashboard/goal/create-progress-drawer";
import { Button } from "flowbite-react";
import ProgressModal from "@/app/ui/dashboard/goal/progress-modal";
import DietResumeCard from "@/app/ui/dashboard/diets/diet-resume-card";

export default function Page() {
	const router = useRouter();
	const param = useParams();
	const searchParams = useSearchParams();
	const [goal, setGoal] = useState<GoalResponseDTO>();
	const [progress, setProgress] = useState<ProgressResponseDTO[] | null>();
	const [openProgressDrawer, setOpenProgressDrawer] = useState(false);

	const [progressSelected, setProgressSelected] = useState<ProgressResponseDTO>();
	const [openProgressModal, setOpenProgressModal] = useState(false);

	const handleCloseFn = () => {
		setOpenProgressDrawer(false);
		setOpenProgressModal(false);
	}

	const handleSeeProgress = (progress: ProgressResponseDTO) => {
		setProgressSelected(progress);
		setOpenProgressModal(true)
	}
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
			toast.error("Something went wrong, sorry.")
			return <div className="flex justify-center items-center h-screen gap-2">
				<p>Something went wrong...</p>
			</div>;
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
			toast.error("Failed to deactivate training");
		}

		router.back();
		setTimeout(() => {
			window.location.reload();
		}, 100);
	};

	//TODO Implement the page LOADING and ERROR states
	if (!goal) return <LoadingPage message="Loading goals" />;

	return (
		<section className="p-2">
			<div className="w-full inline-flex justify-end gap-2">
				<Button
					onClick={() => setOpenProgressDrawer(true)}
					type="button"
					size="xs"
					className="inline-flex items-center px-4 py-2 text-sm font-medium  border border-gray-200 rounded-lg"
				>
					<i className="bx bx-detail"></i>
					Add progress
				</Button>
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
						style={{ width: goal.isCompleted ? "100%" : goal.progressGoalPercentage.toFixed(0) + "%" }}
					>
						{" "}
						{goal.isCompleted ? "100" : goal.progressGoalPercentage.toFixed(0)}%
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
						<ProgressCard progress={p} key={index} handleSeeProgress={handleSeeProgress} />
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

				{goal.diets.length ? goal.diets.map((diet: any, index) => {
					return (
						<DietResumeCard key={diet.diet_id} diet={diet} index={index} />
					);
				})
					: <div className="flex flex-col gap-2 justify-center items-center h-full">
						<h3 className="text-lg">
							Wait until your coach assign you some trainings 💪
						</h3>
						<p className="text-sm text-gray-500">
							this can be a good opportunity to rest and recover
						</p>
					</div>}

			</div>
			<div className="gap-5 flex-col flex m-5">
				<h2 className="text-lg font-semibold text-jungle-green-700">
					Trainings
				</h2>

				{goal.trainings.length ? (
					<div className="flex flex-col gap-3 col-span-4 md:col-span-3 md:max-h-full md:overflow">
						{goal.trainings.map((training: any) => {
							return (
								<TrainingResumeCard
									key={training.training_id}
									training={training}
									index={training.training_id}
								/>
							);
						})}
					</div>
				) : (
					<div className="flex flex-col gap-2 justify-center items-center h-full">
						<h3 className="text-lg">
							Wait until your coach assign you some trainings 💪
						</h3>
						<p className="text-sm text-gray-500">
							this can be a good opportunity to rest and recover
						</p>
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

			{progressSelected && <ProgressModal progress={progressSelected} goal={goal} handleCloseFn={handleCloseFn} open={openProgressModal} professionalView={false} />}
			<CreateProgressDrawer handleCloseFn={handleCloseFn} open={openProgressDrawer} goal={goal} />
		</section>
	);
}
