import clsx from "clsx";
import Link from "next/link";
import React from "react";

type Props = {
	goal: any;
	assignment: any;
	redirectTo?: string;
	showDeactivate?: boolean;
};

export default function CustomerGoalCard({
	goal,
	assignment,
	redirectTo,
	showDeactivate = true,
}: Props) {
	return (
		<div key={goal.id} className="p-4 bg-white rounded-lg shadow-md space-y-2">
			<div className="inline-flex justify-between w-full">
				<h3 className="text-lg text-gray-600">
					{goal.goalType
						.replace(/_/g, " ")
						.toLowerCase()
						.replace(/\b\w/g, (l: any) => l.toUpperCase())}
				</h3>
				{goal.isCompleted ? (
					<span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
						Completed
					</span>
				) : goal.isActive ? (
					<span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
						In Progress
					</span>
				) : (
					<span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
						Deactivated
					</span>
				)}
			</div>
			<p className="text-sm text-gray-600">
				{assignment && assignment.client?.edited_name}
			</p>
			<p className="text-sm font-semibold text-jungle-green-700">
				{goal.descriptionGoal}
			</p>
			<div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
				<div
					className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
					style={{ width: goal.percentage + "%" }}
				>
					{" "}
					{goal.percentage}%
				</div>
			</div>
			<p className="text-sm">
				Duration:{" "}
				<span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 ">
					<svg
						className="w-2.5 h-2.5 me-1.5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
					</svg>
					{goal.amountOfDays} days
				</span>
			</p>
			<p className="text-sm">
				Created:{" "}
				{new Date(goal.created_on).toLocaleDateString("en-US", {
					weekday: "short",
					day: "numeric",
					month: "long",
				})}
			</p>
			<p className="text-sm ">
				End Date:{" "}
				{new Date(goal.end_on).toLocaleDateString("en-US", {
					weekday: "short",
					day: "numeric",
					month: "long",
				})}
			</p>
			<div className={"inline-flex rounded-md justify-end w-full"} role="group">
				<Link
					href={
						redirectTo
							? `${redirectTo}/${goal.id}`
							: `/coach/dashboard/goals/${goal.id}`
					}
					type="button"
					className={clsx(
						"inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 rounded-s-lg",
						!showDeactivate && "rounded-e-lg"
					)}
				>
					<i className="bx bx-detail"></i>
					Details & Progress
				</Link>
				{showDeactivate && (
					<Link
						href={redirectTo ? `${redirectTo}?confirm-delete=true&goal_id=${goal.id}` :
							`/coach/dashboard/goals?confirm-delete=true&goal_id=${goal.id}`}
						type="button"
						className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
					>
						<i className="bx bx-x"></i>
						Deactivate
					</Link>
				)}
			</div>
		</div>
	);
}
