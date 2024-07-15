"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import Link from "next/link";
import { Button } from "../../button";
import { TrainingResponseDto } from "@/interfaces/trainings";
import { TrainingResumeCardStyles } from "@/use-cases/trainings-styles";

export default function TrainingResumeCard({
	training,
}: {
	training: TrainingResponseDto;
}) {
	const trainingObjectStyles = TrainingResumeCardStyles;
	const trainingStatus = training.isCompleted
		? "COMPLETED"
		: training.training_status || "CREATED";
	return (
		<Link
			href={{
				pathname: "/dashboard/trainings/" + training.training_id,
			}}
			className={twMerge(
				clsx(
					"flex-grow border-l-8 rounded-md px-3 py-2 w-full bg-slate-50",
					trainingObjectStyles[trainingStatus].card
				)
			)}
		>
			{training.type}
			<div className=" pt-1 flex flex-col items-start gap-2">
				<span className="font-thin text-sm">
					{training.description_training}
				</span>
				<div className="flex justify-between w-full">
					<label
						className={twMerge(
							clsx(
								"p-1 rounded ",
								trainingStatus && trainingObjectStyles[trainingStatus].label
							)
						)}
					>
						<p
							className={twMerge(
								clsx(
									"font-bold",
									trainingStatus &&
										trainingObjectStyles[trainingStatus].labelText
								)
							)}
						>
							{trainingStatus}
						</p>
					</label>
					<Button
						className={clsx(
							"p-2 border-2 rounded font-bold",
							trainingObjectStyles[trainingStatus].label
						)}
					>
						DETAILS{" "}
					</Button>
				</div>
			</div>
		</Link>
	);
}
