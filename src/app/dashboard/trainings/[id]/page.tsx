import { getTrainingsID } from "@/actions/trainings";
import { Button } from "@/app/ui/button";
import DailyTrainingCounter from "@/app/ui/dashboard/trainings/daily-training-counter";
import ExercisesTimeline from "@/app/ui/dashboard/trainings/exercises-timeline";
import TrainingDifficultyCard from "@/app/ui/dashboard/trainings/training-difficulty-card";
import { Training } from "@/interfaces/trainings";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
	const training: Training = await getTrainingsID(Number(params.id));
	// take the daily train day ID for the next day to be completed
	let nextDay = null;
	nextDay = training?.daily_training_days.find(day => !day.is_day_completed);
	console.log(nextDay?.id);

	const currentPath = "/dashboard/trainings/" + params.id;

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

				<div className="col-span-4 md:col-span-1 gap-4 flex flex-col">
					<DailyTrainingCounter
						daily_training_days={training.daily_training_days}
					/>
					{/* <TrainingDifficultyCard
						days_remaining={training.amount_of_days}
						difficulty={difficulty}
					/> */}
					<Link href={currentPath + "/in-progress/" + nextDay?.id}>
						<Button className="hidden bg-teal-500 rounded text-white hover:bg-jungle-green-400 font-sans font-bold gap-1 md:flex justify-center">
							<i className="bx bx-play text-2xl"></i>START TRAINING
						</Button>
					</Link>
				</div>

				<div className="col-span-4 md:col-span-3">
					<ExercisesTimeline
						exercises={training?.daily_training_days[0].selected_exercises}
					/>
				</div>
				<div className="hidden col-span-1 md:block"></div>
			</div>
			<div className="w-full flex justify-center">
				<Link href={currentPath + "/in-progress/1"}>
					<Button className="md:hidden bg-teal-500 rounded text-white hover:bg-jungle-green-400 fixed md:bottom-4 bottom-20 font-sans font-bold gap-1">
						<i className="bx bx-play text-2xl"></i>START TRAINING
					</Button>
				</Link>
			</div>
		</>
	);
}
