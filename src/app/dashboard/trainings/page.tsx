import CounterChart from "@/app/ui/dashboard/counter-chart";
import { getAllTrainings } from "@/actions/trainings";
import TrainingResumeCard from "@/app/ui/dashboard/trainings/training-resume-card";
import Image from "next/image";
import { Button } from "@/app/ui/button";

export default async function Page() {
	const trainings: any | null = await getAllTrainings();
	console.log(trainings);
	const trainingCompletedLength = trainings.filter(
		(training: any) => training.isCompleted || training.training_status == "COMPLETED"
	).length;

	if (!trainings.length || !trainings)
		return (
			<div className="flex justify-center items-center flex-col h-full text-center">
				<h1 className="text-xl font-bold">Trainings not ready yet</h1>
				<p className="text-gray-500">
					Please wait a few days while we prepare your training plan
				</p>
				<Button className="bg-jungle-green-500 rounded text-white font-bold mt-3">
					Dashboard
				</Button>
			</div>
		);

	return (
		<div className="grid grid-cols-4 gap-2">
			<div className="col-span-4 max-h-40">
				<div className="absolute w-full flex justify-center items-center h-40">
					<h3 className="text-3xl font-bold text-white">TRAININGS</h3>
				</div>
				<Image
					src={"/imgs/jonathan-borba-R0y_bEUjiOM-unsplash.jpg"}
					height={3648}
					width={5472}
					alt="Athletic man with a woman coach training"
					className="h-full object-cover rounded-xl"
				></Image>
			</div>
			<div className="col-span-4 md:col-span-1 grid grid-cols-2 max-h-[100px] gap-1 md:gap-2">
				<CounterChart
					cols="col-span-1 md:col-span-2"
					bg="bg-jungle-green-100"
					border="border-jungle-green-500"
					title="COMPLETED ✅"
					count={trainingCompletedLength}
				/>

				<CounterChart
					cols="col-span-1 md:col-span-2"
					bg="bg-yellow-green-100"
					border="border-yellow-green-500"
					title="TOTAL TRAININGS 💪"
					count={trainings.length}
				/>
			</div>
			<div className="flex flex-col gap-3 col-span-4 md:col-span-3 md:max-h-full md:overflow">
				{trainings.length > 0 &&
					trainings.map((training: any, index: number) => (
						<TrainingResumeCard
							key={training.training_id}
							training={training}
							index={index}
						/>
					))}
			</div>
		</div>
	);
}
