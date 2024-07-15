import { getExerciseDay, getTrainingsID } from "@/actions/trainings";
import { Button } from "@/app/ui/button";
import TrainingParent from "@/app/ui/dashboard/trainings/training-parent";
import { Training } from "@/interfaces/trainings";
import Link from "next/link";

type Props = {
	params: { id: string; day: string };
};

export default async function Page({ params }: Props) {
	const exercises = await getExerciseDay(params.day, params.id);
	const training: Training = await getTrainingsID(params.id);
	return (
		<div
			className="fixed top-0 left-0 z-50 h-full p-4 w-full max-w-full bg-white"
			aria-labelledby="drawer-label"
		>
			<Link href={"/dashboard/trainings"}>
				<Button className="text-gray-400 bg-transparent  rounded-lg text-sm h-[25px]  flex justify-around p-3 w-[140px]">
					<i className="bx bx-left-arrow-alt"></i>
					<span className="font-bold ">Return menu</span>
					<span className="sr-only">Close menu</span>
				</Button>
			</Link>
			<h5 className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400 absolute top-3.5 end-3.5">
				<svg
					className="w-4 h-4 me-2.5"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
				</svg>
				Info
			</h5>

			<div className="h-full p-4">
				{/**
				 * Pantalla principal donde se ejecutaran las acciones correspondendientes
				 *  Pantalla de descanso
				 *  Pantalla de entrenamiento
				 */}
				<TrainingParent
					exercises={exercises.exercises}
					training={training}
				></TrainingParent>
			</div>
		</div>
	);
}
