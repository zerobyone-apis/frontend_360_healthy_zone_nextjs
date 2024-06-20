"use client";
import { getExercises } from "@/actions/trainings/get-exercises";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ExerciseListSkeleton } from "./exercise-list-skeleton";
import { trainingStore } from "@/stores/training.store";

type Props = {
	handleComplete: (data: any) => void;
};

export default function SelectTrainingModal({ handleComplete }: Props) {
	const router = useRouter();
	const [exercises, setExercises] = useState({
		exercises: [],
		total: 0,
		showing: 0,
		pages: 1,
		page: 1,
		limit: 10,
	});

	const [page, setPage] = useState(1);
	const [target, setTarget] = useState("");
	const [error, setError] = useState("");
	const [name, setName] = useState("");
	const [selected, setSelected] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const training = trainingStore((state: any) => state.training);

	const [currentDay, setCurrentDay] = useState<number>(1);

	const handleSelect = (exercise: any) => {
		setSelected(prevSelected => {
			let updatedSelected = [...prevSelected];
			const dayIndex = currentDay - 1;

			if (!updatedSelected[dayIndex]) {
				updatedSelected[dayIndex] = [];
			}

			let daySelected = [...updatedSelected[dayIndex]];
			const exerciseIndex = daySelected.findIndex(
				(s: any) => s.gifId === exercise.gifId
			);

			if (exerciseIndex == -1) {
				daySelected.push(exercise);
			} else {
				daySelected = daySelected.filter(
					(s: any) => s.gifId !== exercise.gifId
				);
			}

			updatedSelected[dayIndex] = [...daySelected];

			return updatedSelected;
		});
	};

	const handleCompleteTraining = () => {
		if (!selected.length) return setError("Select at least one exercise");

		const hasExercisesPerDay = selected.every(day => day.length > 0);
		if (!hasExercisesPerDay) {
			return setError("Select at least one exercise per day");
		}

		const formatedExercises = selected.map((day, index) => {
			return {
				number_training_day: index + 1,
				total_training_days: training.amount_of_days,
				selected_exercises: day.map((exercise: any) => {
					return {
						name: exercise.name,
						type: exercise.target,
						description: exercise.instructions.join("\n"),
						series: 3,
						repetitions: 15,
						duration_in_seconds: 120,
						rest_in_seconds: 30,
						difficulty: 1,
						url_image: `${process.env.NEXT_PUBLIC_BASE_BUCKET_URL}/${process.env.NEXT_PUBLIC_BUCKET_FOLDER_GIFS}/${exercise.gifId}.gif`,
						is_completed: false,
					};
				}),
			};
		});

		handleComplete(formatedExercises);
	};

	const bucket = process.env.NEXT_PUBLIC_BASE_BUCKET_URL || "";
	const folder = process.env.NEXT_PUBLIC_BUCKET_FOLDER_GIFS || "";

	const targets = [
		"abs",
		"quads",
		"calves",
		"lats",
		"pectorals",
		"glutes",
		"cardiovascular system",
		"upper back",
		"triceps",
		"biceps",
		"adductors",
		"hamstrings",
		"spine",
		"serratus anterior",
		"delts",
		"forearms",
		"levator scapulae",
		"traps",
		"abductors",
	];

	function handleGetExercises() {
		setIsLoading(true);
		getExercises({ limit: 10, page, name, target })
			.then(res => {
				if (res) setExercises(res);
			})
			.catch(err => setError(err))
			.finally(() => setIsLoading(false));
	}

	function handleClose() {
		router.replace("/coach/dashboard/customers", { shallow: true });
	}

	const amountOfDays = training.amount_of_days;
	let dayOptions = [];
	for (let i = 1; i <= amountOfDays; i++) {
		dayOptions.push(
			<option key={i} value={i}>
				Day {i} - Total Exercises [{selected[i - 1]?.length || 0}]
			</option>
		);
	}

	useEffect(() => {
		handleGetExercises();
	}, [page]);

	useEffect(() => {
		setPage(1);
		handleGetExercises();
	}, [name, target]);

	const startItem = (page - 1) * 10 + 1;
	const endItem = Math.min(page * 10, exercises.total);

	return (
		<dialog
			id="select-modal"
			aria-modal="true"
			aria-labelledby="modal-headline"
			className="flex bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full"
		>
			<div className="relative p-4 w-full max-w-md max-h-screen h-full overflow-y-auto">
				<div className="relative bg-white rounded-lg shadow">
					<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
						<h3 className="text-lg font-semibold text-gray-900">
							New Training
						</h3>
						<button
							type="button"
							onClick={handleClose}
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
							data-modal-toggle="select-modal"
						>
							<svg
								className="w-3 h-3"
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
					<form className="max-w-lg mx-auto p-2">
						<div className="col-span-2 sm:col-span-1 mb-2">
							<select
								id="category"
								value={currentDay}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
								onChange={e => setCurrentDay(Number(e.target.value))}
								required
							>
								{dayOptions}
							</select>
						</div>
						<div className="flex p-2">
							<select
								id="dropdown"
								data-dropdown-toggle="dropdown"
								onChange={e => setTarget(e.target.value)}
								className="flex-shrink-0 z-10 w-[150px] inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
							>
								<option value={""}>All targets</option>
								{targets.map(target => (
									<option key={target} value={target}>
										{target}
									</option>
								))}
							</select>

							<div className="relative w-full">
								<input
									type="search"
									name="search-exercise"
									onChange={e => setName(e.target.value)}
									id="search-dropdown"
									className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Search by exercise name"
								/>
							</div>
						</div>
					</form>
					<div className="p-4 md:p-5">
						{error && (
							<div className="p-4 bg-red-100 text-red-700 rounded-lg mb-4">
								{error}
							</div>
						)}
						{exercises.total !== 0 && (
							<p className="text-gray-500 mb-4 text-sm">
								The order is defined by the selected items
							</p>
						)}
						<ul className="space-y-4 mb-4">
							{isLoading && (
								<>
									<ExerciseListSkeleton />
									<ExerciseListSkeleton />
									<ExerciseListSkeleton />
									<ExerciseListSkeleton />
									<ExerciseListSkeleton />
									<ExerciseListSkeleton />
									<ExerciseListSkeleton />
								</>
							)}
							{exercises.exercises.map((exercise: any) => {
								const checked =
									selected.length &&
									selected[currentDay - 1]?.length > 0 &&
									selected[currentDay - 1].some(
										(s: any) => s.gifId === exercise.gifId
									);
								let index = null;
								if (checked) {
									//find the index of the selected exercise
									index = selected[currentDay - 1].findIndex(
										(s: any) => s.gifId === exercise.gifId
									);
									index = index + 1;
								}
								return (
									<li
										key={exercise.gifId}
										role="checkbox"
										className="peer"
										onClick={() => handleSelect(exercise)}
										aria-checked={checked}
									>
										<label
											htmlFor={exercise.gifId}
											className={clsx(
												"inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-jungle-green-600 peer-checked:text-jungle-green-600 hover:text-gray-900 hover:bg-gray-100",
												checked &&
													"border-jungle-green-600 text-jungle-green-600"
											)}
										>
											<img
												className="w-12 h-12 cover"
												src={`${bucket}${folder}/${exercise.gifId}.gif`}
												alt={exercise.name}
											/>
											<div className="block text-left">
												<div className="w-full text-left text-lg font-semibold">
													{exercise.name}
												</div>
												<div className="w-full text-gray-500">
													{exercise.target}
												</div>
											</div>
											{index ? (
												<div className="p-2 bg-jungle-green-500 text-white rounded-full">
													{index}
												</div>
											) : (
												<svg
													className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500"
													aria-hidden="true"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 14 10"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M1 5h12m0 0L9 1m4 4L9 9"
													/>
												</svg>
											)}
										</label>
									</li>
								);
							})}
							{exercises.total === 0 && (
								<h3 className="text-center text-jungle-green-500 font-bold text-xl">
									No exercises found...
								</h3>
							)}
						</ul>

						<div className="flex flex-col items-center">
							<span className="text-sm text-gray-700">
								Showing{" "}
								<span className="font-semibold text-gray-900">{startItem}</span>{" "}
								to{" "}
								<span className="font-semibold text-gray-900">{endItem}</span>{" "}
								of{" "}
								<span className="font-semibold text-gray-900">
									{exercises.total}
								</span>{" "}
								Entries
							</span>
							<div className="inline-flex mt-2 xs:mt-0">
								<button
									onClick={() => setPage(page - 1)}
									disabled={page === 1}
									className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
								>
									<svg
										className="w-5 h-5 mr-2"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M12.293 14.707a1 1 0 0 0 1.414-1.414L9.414 9l4.293-4.293A1 1 0 0 0 12.293 3.293l-5 5a1 1 0 0 0 0 1.414l5 5Z"
											clipRule="evenodd"
										/>
									</svg>
									Prev
								</button>
								<button
									onClick={() => setPage(page + 1)}
									disabled={page === exercises.pages}
									className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
								>
									Next
									<svg
										className="w-5 h-5 ml-2"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M7.707 14.707a1 1 0 0 1-1.414-1.414L10.586 9 6.293 4.707A1 1 0 0 1 7.707 3.293l5 5a1 1 0 0 1 0 1.414l-5 5Z"
											clipRule="evenodd"
										/>
									</svg>
								</button>
							</div>
						</div>
						<button
							onClick={handleCompleteTraining}
							className="text-white inline-flex w-full justify-center mt-2 bg-jungle-green-700 hover:bg-jungle-green-800 focus:ring-4 focus:outline-none focus:ring-jungle-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center gap-2 items-center"
						>
							<i className="bx bx-check font-bold"></i>
							Create training
						</button>
					</div>
				</div>
			</div>
		</dialog>
	);
}
