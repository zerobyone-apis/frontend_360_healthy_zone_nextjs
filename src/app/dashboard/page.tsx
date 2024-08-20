"use client";
import { PlanOfferCard } from "../ui/dashboard/plan-offer-card";
import ProgressCard from "../ui/dashboard/progress-card";
import { TasksCard } from "../ui/dashboard/tasks-card";
import { motion } from "framer-motion";

export default function Page() {
	return (
		<div className="h-full grid grid-cols-3 gap-2">
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{
					duration: 0.8,
					delay: 0.2,
					ease: [0, 0.71, 0.2, 1.01],
				}}
				className="md:col-span-2 col-span-3"
			>
				<TasksCard />
			</motion.div>
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{
					duration: 0.8,
					delay: 0.3,
					ease: [0, 0.71, 0.2, 1.01],
				}}
				className="md:col-span-1 col-span-3"
			>
				<PlanOfferCard />
			</motion.div>
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{
					duration: 0.8,
					delay: 0.4,
					ease: [0, 0.71, 0.2, 1.01],
				}}
				className="md:col-span-1 col-span-3"
			>
				<ProgressCard
					bcolor="bg-yellow-green-500"
					tcolor="text-yellow-green-500"
					target="73 kg"
					percent={30}
					currentProgress="89 kg"
					title="Weight"
				/>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{
					duration: 0.8,
					delay: 0.7,
					ease: [0, 0.71, 0.2, 1.01],
				}}
				className="md:col-span-1 col-span-3"
			>
				<ProgressCard
					bcolor="bg-jungle-green-600"
					tcolor="text-jungle-green-600"
					target="1900cal / week"
					percent={70}
					currentProgress="1500cal / week"
					title="Daily Calories"
				/>
			</motion.div>
			<div className="md:col-span-1 col-span-3">
				<ProgressCard
					bcolor="bg-red-600"
					tcolor="text-red-600"
					target="15 / Day"
					percent={10}
					currentProgress="5 / Day"
					title="Water Glasses"
				/>
			</div>
		</div>
	);
}
