import React from "react";
import { addDays } from "date-fns";
import { DailyTrainingDay } from "@/interfaces/trainings";

const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

const DailyTrainingCounter = ({
	daily_training_days,
}: {
	daily_training_days: DailyTrainingDay[];
}) => {
	const today = new Date();
	const todayIndex = today.getDay(); // Índice del día actual (0-6)

	// Obtener los últimos 3 días completados o no
	const lastTrainingDays = daily_training_days.slice(-3);

	// Calcular los días a mostrar centrados en el día actual
	const daysToShow = [];
	for (let i = -3; i <= 3; i++) {
		const date = addDays(today, i);
		const dayIndex = (todayIndex + i + 7) % 7; // Asegura que el índice esté en el rango 0-6
		const trainingDay = lastTrainingDays.find(
			day => new Date(day.created_on).toDateString() === date.toDateString()
		);
		const isCompleted = trainingDay ? trainingDay.is_day_completed : false;
		daysToShow.push({
			label: dayLabels[dayIndex],
			date: date,
			status: isCompleted ? "completed" : "pending",
		});
	}

	return (
		<div className="bg-white shadow-md rounded-lg p-4 max-w-xs">
			<div className="flex justify-between items-center mb-4">
				<span className="text-gray-700 font-semibold">Daily Goals</span>
				<button className="text-blue-500 hover:underline"></button>
			</div>
			<div className="text-2xl font-bold text-gray-800 mb-4">
				{daily_training_days.filter((day: any) => day.is_day_completed).length}/
				{daily_training_days.length}
			</div>
			<div className="flex justify-between">
				{daysToShow.map((day, index) => (
					<div key={index} className="flex flex-col items-center">
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center ${
								day.status === "completed"
									? "bg-blue-500 text-white"
									: "bg-gray-300 text-gray-500"
							}`}
						>
							{day.status === "completed" ? "✓" : "○"}
						</div>
						<span className="mt-1 text-xs text-gray-600">{day.label}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default DailyTrainingCounter;
