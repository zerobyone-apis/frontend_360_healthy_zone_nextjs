"use client";
import { getTrainingsID } from "@/actions/trainings";
import { trainingMarkInProgress } from "@/actions/trainings/training-in-progress";
import ExercisesTimeline from "@/app/ui/dashboard/trainings/exercises-timeline";
import { Training } from "@/interfaces/trainings";
import clsx from "clsx";
import { useParams, useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Page() {
	const params = useParams();
	const router = useRouter();
	const [training, setTraining] = useState<Training>();
	const [selectedDay, setSelectedDay] = useState(0); // 0 is the first day
	const [loading, setLoading] = useState(true);
	const currentPath = "/dashboard/trainings/" + params.id;

	useEffect(() => {
		const id = params.id;
		if (!id || typeof id !== "string") return;
		getTrainingsID(id)
			.then((data: Training) => {
				data.daily_training_days.sort(
					(a, b) => a.number_training_day - b.number_training_day
				);

				const selectedIndex = data.daily_training_days.findIndex(
					day => !day.is_day_completed
				);
				if (selectedIndex !== -1) setSelectedDay(selectedIndex);

				setTraining(data);
			})
			.catch(() => {
				toast.error("Something went wrong");
				return <div className="flex justify-center items-center h-screen gap-2">
					<p>Something went wrong...</p>
				</div>;
			})
			.finally(() => setLoading(false));
	}, []);

	const days: ReactElement[] = [];

	if (training) {
		for (let i = 0; i < training.amount_of_training_days; i++) {
			const day = training.daily_training_days[i];
			days.push(
				<span
					key={i}
					onClick={() => {
						setSelectedDay(i);
					}}
					className={clsx(
						"bg-gray-100 text-xs font-medium me-2 px-2.5 text-nowrap py-0.5 h-6 rounded-full cursor-pointer",
						"hover:border-blue-600 hover:bg-blue-400 hover:text-white ease-in-out transition-all duration-200",
						day?.is_day_completed && ["bg-green-400", "text-white"],
						selectedDay === i && "border border-blue-400 text-blue-800"
					)}
				>
					Day {i + 1}
				</span>
			);
		}
	}

	// take the daily train day ID for the next day to be completed
	const nextDay = training?.daily_training_days[selectedDay];

	//handler click on start training
	const handleStartTraining = async () => {
		if (!nextDay) return;

		// if the training is not in progress, then start it.
		if (!training.init_on) {
			try {
				await trainingMarkInProgress(training.training_id);
			} catch (error) {
				toast.error("Error starting training");
				throw new Error("Error starting training");
			}
		}

		router.push(currentPath + "/in-progress/" + nextDay.id);
	};

	if (loading) return <div>Loading...</div>;
	if (!training)
		return (
			<div>
				<h1>Training not found</h1>
			</div>
		);

	return (
		<>
			<div className="grid grid-cols-4 gap-3">
				<div className="col-span-4">
					<h3 className="font-sans font-bold text-center text-xl">
						{training?.type.replaceAll("_", " ")}
					</h3>
					<h5 className="font-sans font-thin text-center">
						{training?.description_training}
					</h5>
				</div>

				<div className="col-span-4 md:col-span-1 gap-4 flex flex-col items-center">
					<div className="inline-flex md:flex-wrap gap-1 overflow-auto md:overflow-auto max-w-full">
						{days}
					</div>
					<motion.button
						whileHover={{
							scale: 1.2,
							transition: { duration: 0.3 },
						}}
						onHoverStart={e => { }}
						onHoverEnd={e => { }}
						disabled={!nextDay || nextDay.is_day_completed}
						onClick={handleStartTraining}
						className={clsx(
							"hidden md:flex justify-center rounded font-sans font-bold gap-1 p-2 w-[80%]",
							!nextDay?.is_day_completed
								? "bg-teal-500 text-white hover:bg-jungle-green-400 "
								: "bg-gray-400 cursor-not-allowed"
						)}
					>
						{nextDay?.is_day_completed ? (
							"DAY COMPLETED"
						) : (
							<>
								<i className="bx bx-play text-2xl"></i>
								START TRAINING
							</>
						)}
					</motion.button>
				</div>

				<div className="col-span-4 md:col-span-3">
					<ExercisesTimeline exercises={nextDay?.selected_exercises || []} />
				</div>
				<div className="hidden col-span-1 md:block"></div>
			</div>
			<div className="w-full flex justify-center">
				<motion.button
					whileHover={{
						scale: 1.2,
						transition: { duration: 0.3 },
					}}
					onHoverStart={e => { }}
					onHoverEnd={e => { }}
					disabled={!nextDay || nextDay.is_day_completed}
					onClick={handleStartTraining}
					className={clsx(
						"md:hidden rounded fixed md:bottom-4 bottom-20 font-sans font-bold gap-1 p-2 w-[40%]",
						!nextDay?.is_day_completed
							? "bg-teal-500 text-white hover:bg-jungle-green-400 "
							: "bg-gray-400 cursor-not-allowed"
					)}
				>
					{nextDay?.is_day_completed ? (
						"DAY COMPLETED"
					) : (
						<>
							<i className="bx bx-play text-2xl"></i>
							START TRAINING
						</>
					)}
				</motion.button>
			</div>
		</>
	);
}
