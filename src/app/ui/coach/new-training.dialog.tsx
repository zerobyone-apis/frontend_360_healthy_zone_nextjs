/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CoachPlansServices, TrainingTypes } from "@/interfaces/trainings";
import { trainingStore } from "@/stores/training.store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
	handleNext: () => void;
	goal: any;
};

export default function NewTrainingDialog({ handleNext, goal }: Props) {
	const frequencyForm = goal.client?.customForm?.formMap.frequency || "";

	const [counter, setCounter] = useState(1);
	const [trainingType, setTrainingType] = useState<string>("");
	const [coachPlans, setCoachPlans] = useState<string>("");
	const [descriptionTraining, setDescription] = useState<string>("");
	const [frequency, setFrequency] = useState<string>(frequencyForm);

	// need to create a calculation for the amount of training days based on the frequency of the training and the duration of the training
	const [amountOfTrainingDays, setAmountOfTrainingDays] = useState<number>(0);

	useEffect(() => {
		const amountOfTrainingDaysCalc = () => {
			let frequencyNumber = 0;

			if (frequency === "All in a row") {
				return counter;
			} else {
				frequencyNumber = parseInt(frequency.split(" ")[0]);
				if (
					(counter < 7 && frequencyNumber < counter) ||
					counter === frequencyNumber
				) {
					return frequencyNumber;
				}
				if (counter < 7 && frequencyNumber > counter) {
					return counter;
				}
				// rounded to the nearest whole number
				return Math.round((counter * frequencyNumber) / 7);
			}
		};
		setAmountOfTrainingDays(amountOfTrainingDaysCalc());
	}, [counter, frequency]);

	const setTraining = trainingStore((state: any) => state.setTraining);

	const router = useRouter();

	function handleClose() {
		router.replace("/coach/dashboard/trainings");
	}

	const handleNextStep = () => {
		setTraining({
			training_duration_days: counter,
			amount_of_training_days: amountOfTrainingDays,
			coach_plans: coachPlans,
			type: trainingType,
			description_training: descriptionTraining,
			frequency: frequency,
		});
		handleNext();
	};

	const handleIncrement = () => {
		if (counter >= 30) return;
		setCounter(prevCounter => prevCounter + 1);
	};

	const handleDecrement = () => {
		if (counter > 1) {
			setCounter(prevCounter => prevCounter - 1);
		}
	};

	return (
		<dialog
			id="crud-modal"
			tabIndex={-1}
			className="flex bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full"
		>
			<div className="relative p-4 w-full max-w-md max-h-full">
				<div className="relative bg-white rounded-lg shadow">
					<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
						<h3 className="text-lg font-semibold text-gray-900">
							New Training details
						</h3>
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
					<div
						className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 m-2"
						role="alert"
					>
						<svg
							className="flex-shrink-0 inline w-4 h-4 me-3"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
						</svg>
						<span className="sr-only">Info</span>
						<div className="flex flex-col">
							{goal && (
								<>
									<strong className="font-semibold">Goal Description:</strong>
									<span className="font-medium">{goal.descriptionGoal}</span>
								</>
							)}
						</div>
					</div>
					<form className="p-4 md:p-5">
						<div className="grid gap-4 mb-4 grid-cols-2">
							<div className="col-span-2 sm:col-span-1">
								<label
									htmlFor="quantity-input"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Duration in days:
								</label>
								<div className="relative flex items-center max-w-[8rem]">
									<button
										type="button"
										id="decrement-button"
										data-input-counter-decrement="quantity-input"
										className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
										onClick={handleDecrement}
									>
										<i className="bx bx-minus"></i>
									</button>
									<input
										type="text"
										id="quantity-input"
										data-input-counter
										data-input-counter-min="1"
										data-input-counter-max="30"
										aria-describedby="helper-text-explanation"
										className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="60"
										value={counter}
										disabled={true}
										required
									/>
									<button
										type="button"
										id="increment-button"
										data-input-counter-increment="quantity-input"
										className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
										onClick={handleIncrement}
									>
										<i className="bx bx-plus"></i>
									</button>
								</div>
							</div>
							<div className="col-span-2 sm:col-span-1">
								<label
									htmlFor="frequency"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Training Frequency
								</label>
								<select
									id="frequency"
									disabled={!!frequencyForm}
									value={frequency}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
									onChange={e => setFrequency(e.target.value)}
									required
								>
									<option value="">Select </option>
									<option value="1 per week">1 Per Week</option>
									<option value="2 times per week">2 times Per Week</option>
									<option value="3 times per week">3 times Per Week </option>
									<option value="4 times per week">4 times Per Week </option>
									<option value="5 times per week">5 times Per Week </option>
									<option value="6 times per week">6 times Per Week </option>
									<option value="All in a row">All in a row </option>
								</select>
							</div>
							<div className="col-span-2 sm:col-span-1">
								<label
									htmlFor="category"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Category
								</label>
								<select
									id="category"
									value={coachPlans}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
									onChange={e => setCoachPlans(e.target.value)}
									required
								>
									<option value={""}>Select category</option>
									<option value={CoachPlansServices.MUSCLE}>Muscle</option>
									<option value={CoachPlansServices.RITMIA}>Ritmia</option>
									<option value={CoachPlansServices.HIPERTROFIA}>
										Hipertrofia
									</option>
									<option value={CoachPlansServices.NOT_APPLY}>
										Not Apply
									</option>
								</select>
							</div>
							<div className="col-span-2 sm:col-span-1">
								<label
									htmlFor="trainingType"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Training Type
								</label>
								<select
									id="trainingType"
									value={trainingType}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
									onChange={e => setTrainingType(e.target.value)}
									required
								>
									<option value="">Select training type</option>
									<option value={TrainingTypes.LOSE_WEIGHT}>Lose Weight</option>
									<option value={TrainingTypes.INCREASE_MASS_MUSCLE}>
										Increase Mass Muscle
									</option>
									<option value={TrainingTypes.LOSE_WEIGHT_HEALTHY_HABITS}>
										Lose Weight Healthy Habits
									</option>
								</select>
							</div>
							<div className="col-span-2">
								<label
									htmlFor="description"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Training Description
								</label>
								<textarea
									id="description"
									name={"description_training"}
									value={descriptionTraining}
									onChange={e => setDescription(e.target.value)}
									rows={4}
									className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Write product description here"
								></textarea>
							</div>
						</div>

						<button
							type="button"
							disabled={
								!trainingType ||
								!coachPlans ||
								!descriptionTraining ||
								!frequency
							}
							onClick={handleNextStep}
							className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center gap-2 items-center"
						>
							Select Exercises ({amountOfTrainingDays || 0} days)
							<i className="bx bx-right-arrow-alt font-bold"></i>
						</button>
					</form>
				</div>
			</div>
		</dialog>
	);
}
