"use client";
import { DietResponseDTO } from "@/interfaces/diets";
import { DietResumeCardStyles } from "@/use-cases/diets-styles";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { Button } from "../../button";

export default function DietResumeCard({
	diet,
	index,
}: {
	diet: DietResponseDTO;
	index: number;
}) {
	const dietObject = DietResumeCardStyles;
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
					dietObject[diet.diet_status].card
				)
			)}
		>
			{diet.type.replaceAll("_", " ")}
			<div className=" pt-1 flex flex-col items-start gap-2">
				<span className="text-sm">{diet.description_diet}</span>
				<div className="flex justify-between w-full">
					<label
						className={twMerge(
							clsx(
								"p-1 rounded ",
								diet.diet_status && dietObject[diet.diet_status].label
							)
						)}
					>
						<p
							className={twMerge(
								clsx(
									"font-bold",
									diet.diet_status && dietObject[diet.diet_status].labelText
								)
							)}
						>
							{diet.diet_status}
						</p>
					</label>
					<Link
						href={{
							pathname: "/dashboard/diets/" + diet.diet_id,
						}}
					>
						<Button
							className={clsx(
								"p-2 border-2 rounded font-bold",
								dietObject[diet.diet_status].label
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
