"use client";
import ExercisesTimeline from "@/app/ui/dashboard/trainings/exercises-timeline";
import { Training } from "@/interfaces/trainings";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TrainingDetailsDialog({
	training,
	handleCloseOuter,
}: {
	training: Training;
	handleCloseOuter?: () => void;
}) {
	const router = useRouter();
	const handleClose = () => {
		if (handleCloseOuter) {
			return handleCloseOuter();
		}
		router.replace("/coach/dashboard/trainings", { shallow: true });
	};
	const [selectedDay, setSelectedDay] = useState(0); // 0 is the first day
	let days = [];

	// sort the days by the day number
	training.daily_training_days.sort(
		(a, b) => a.number_training_day - b.number_training_day
	);

	for (let i = 0; i < training.amount_of_training_days; i++) {
		days.push(
			<span
				key={i}
				onClick={() => {
					setSelectedDay(i);
				}}
				className={clsx(
					"bg-gray-100 text-xs font-medium me-2 px-2.5 text-nowrap py-0.5 h-6 rounded-full cursor-pointer",
					"hover:border-blue-600 hover:bg-blue-400 hover:text-white ease-in-out transition-all duration-200",
					selectedDay === i && "border border-blue-400 text-blue-800",
					training["daily_training_days"][i]?.is_day_completed && [
						"bg-green-400",
						"text-white",
					]
				)}
			>
				Day {i + 1}
			</span>
		);
	}

	if (!training)
		return (
			<div>
				<h1>Training not found</h1>
			</div>
		);

	return (
		<dialog
			id="training-modal"
			tabIndex={-1}
			className="flex bg-black/50 overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-center md:inset-0 h-full w-full max-h-full"
		>
			<div className="relative p-4 w-full max-w-md max-h-full">
				<div className="relative bg-white rounded-lg shadow w-full">
					<div className="flex justify-end p-2">
						<button
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
							onClick={handleClose}
							data-modal-toggle="crud-modal"
						>
							<svg
								className="w-3 h-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
					</div>
					<div className="grid grid-cols-4 gap-3 p-2 w-full">
						<div className="col-span-4">
							<h3 className="font-sans font-bold text-center text-xl">
								{training?.type.replaceAll("_", " ")}
							</h3>
							<h5 className="font-sans font-thin text-center">
								{training?.description_training}
							</h5>
						</div>
						<div className="col-span-4 max-w-full overflow-auto flex flex-row">
							{days}
						</div>
						<div className="col-span-4">
							<ExercisesTimeline
								exercises={
									training.daily_training_days[selectedDay]
										.selected_exercises || []
								}
							/>
						</div>
						<div className="hidden col-span-1 md:block"></div>
					</div>
				</div>
			</div>
		</dialog>
	);
}
