"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { Button } from "../../button";
import { TrainingResponseDto } from "@/interfaces/trainings";
import { TrainingResumeCardStyles } from "@/use-cases/trainings-styles";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TrainingResumeCard({
	training,
	index,
}: {
	training: TrainingResponseDto;
	index: number;
}) {
	const trainingObjectStyles = TrainingResumeCardStyles;
	const trainingStatus = training.isCompleted
		? "COMPLETED"
		: training.training_status || "CREATED";
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{
				duration: 0.8,
				delay: 0.3 + index * 0.1,
				ease: [0, 0.71, 0.2, 1.01],
			}}
			className={twMerge(
				clsx(
					"flex-grow border-l-8 rounded-md px-3 py-2 w-full bg-slate-50",
					trainingObjectStyles[trainingStatus].card
				)
			)}
		>
			{training.type}
			<div className="pt-1 flex flex-col items-start gap-2">
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
					<Link
						href={{ pathname: "/dashboard/trainings/" + training.training_id }}
					>
						<Button
							className={clsx(
								"p-2 border-2 rounded font-bold",
								trainingObjectStyles[trainingStatus].label
							)}
						>
							DETAILS{" "}
						</Button>
					</Link>
				</div>
			</div>
		</motion.div>
	);
}
