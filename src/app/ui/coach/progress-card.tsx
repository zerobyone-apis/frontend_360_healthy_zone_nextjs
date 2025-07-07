"use client"
import { ProgressResponseDTO } from "@/interfaces/progress";
import clsx from "clsx";
import React, { ReactElement } from "react";
import { Button } from "../button";

type Props = {
	progress: ProgressResponseDTO;
	handleSeeProgress: (progress: ProgressResponseDTO) => void;
};

export default function ProgressCard({ progress, handleSeeProgress }: Props) {
	const pics = progress.advace_pictures_uris_form;
	const photosFormatted: ReactElement[] = [];
	if (pics) {
		Object.keys(pics).forEach((key: string, index: number) => {
			const pic = pics[key];
			if (pic)
				photosFormatted.push(
					<img
						key={index}
						src={pic}
						alt={"training-pic-" + index}
						className={clsx(
							"w-10 h-10 object-cover rounded-full border-2 border-white "
						)}
					/>
				);
		});
	} else {
		for (let i = 0; i < 4; i++) {
			photosFormatted.push(
				<img
					key={i}
					src={"/imgs/placeholder_not_found.png"}
					alt=""
					className={clsx(
						"w-10 h-10 object-cover rounded-full border-2 border-white "
					)}
				/>
			);
		}
	}
	return (
		<div className="w-full shadow bg-white p-5 rounded mb-3.5">
			<div className="inline-flex justify-between w-full">
				<div className="-space-x-2 rtl:space-x-reverse inline-flex">
					{photosFormatted}
				</div>
				<div>
					<p className="text-xs text-gray-500">
						{formatDate(progress.created_on)}
					</p>
				</div>
			</div>
			<div>
				<h5 className="font-semibold text-gray-800">Progress Description:</h5>
				<p className="text-sm font-semibold text-gray-500">
					{progress.description_advance}
				</p>
			</div>
			<div className="inline-flex rounded-md justify-end w-full" role="group">
				<Button
					type="button"
					onClick={() => handleSeeProgress(progress)}
					className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
				>
					<i className="bx bx-detail"></i>
					Details & Comments
				</Button>
			</div>
		</div>
	);
}

function formatDate(dateString: string): string {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	// Parse the input date string into a Date object
	const [day, month, year, time] = dateString.split(/[\s-:]+/);
	const date = new Date(
		Number(year),
		Number(month) - 1,
		Number(day),
		Number(time.slice(0, 2)),
		Number(time.slice(2, 4)),
		Number(time.slice(4, 6))
	);

	// Format the date
	const formattedDate = `${months[date.getMonth()]
		} ${date.getDate()}, ${date.getFullYear()} at ${date
			.getHours()
			.toString()
			.padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

	return formattedDate;
}
