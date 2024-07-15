import { SelectedExercise } from "@/interfaces/trainings";
import Image from "next/image";
import React from "react";
import { SeeMoreText } from "../../see-more-text";

export default function ExercisesTimeline({
	exercises,
}: {
	exercises: SelectedExercise[];
}) {
	return (
		<ol className="relative border-s border-gray-200">
			{exercises.map((exercise, index) => (
				<li className="mb-10 ms-4" key={index}>
					<div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white "></div>
					<time className="mb-1 text-sm font-normal leading-none text-gray-400 ">
						{exercise.duration_in_seconds
							? exercise.duration_in_seconds + " seconds"
							: exercise.repetitions + " reps, " + exercise.series + " sets"}
					</time>
					<h3 className="text-lg font-semibold text-gray-900 ">
						{exercise.name}
					</h3>
					{/* DELETE DEFAULT IMAGE */}
					<Image
						src={exercise.url_image || "/imgs/placeholder_not_found.png"}
						alt={""}
						width={318}
						height={159}
					></Image>
					<div className="w-full md:w[80%]">
						<SeeMoreText
							textClasses={
								"mb-4 text-base font-normal text-gray-500 whitespace-pre-line"
							}
						>
							{exercise.description || ""}
						</SeeMoreText>
					</div>
				</li>
			))}
		</ol>
	);
}
