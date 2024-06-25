import { getTrainingsID } from "@/actions/trainings";
import { Button } from "@/app/ui/button";
import ExercisesTimeline from "@/app/ui/dashboard/trainings/exercises-timeline";
import TrainingDifficultyCard from "@/app/ui/dashboard/trainings/training-difficulty-card";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
	const training = await getTrainingsID(Number(params.id));
	console.log(training);
	const currentPath = "/dashboard/trainings/" + params.id;
	return (
		<>
			<div className="grid grid-cols-4 gap-3">
				<div className="col-span-4">
					<h3 className="font-sans font-bold text-center text-xl">
						{training?.type}
					</h3>
					<h5 className="font-sans font-thin text-center">
						{training?.description_training}
					</h5>
				</div>
				<div className="col-span-4 md:col-span-1 gap-4 flex flex-col">
					<TrainingDifficultyCard days_remaining={20} difficulty={3} />
					<Link href={currentPath + "/in-progress/2"}>
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
				<Link href={currentPath + "/in-progress/2"}>
					<Button className="md:hidden bg-teal-500 rounded text-white hover:bg-jungle-green-400 fixed md:bottom-4 bottom-20 font-sans font-bold gap-1">
						<i className="bx bx-play text-2xl"></i>START TRAINING
					</Button>
				</Link>
			</div>
		</>
	);
}
