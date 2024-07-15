"use client";
import { useState, useEffect } from "react";
import RestView from "./rest-view";
import SuccessView from "./success-view";
import TrainingView from "./training-view";
import { useParams } from "next/navigation";
import {
	dailyTrainMarkAsComplete,
	trainingMarkAsComplete,
} from "@/actions/trainings/mark-as-completed";
import { ExerciseDTO, Training } from "@/interfaces/trainings";

type Params = {
	day: string;
	id: string;
};

export default function TrainingParent({
	exercises,
	training,
}: {
	exercises: any;
	training: Training;
}) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTrainingCompleted, setIsTrainingCompleted] = useState(false);
	const params: Params = useParams();
	const exercise = exercises[currentIndex] || null;
	useEffect(() => {
		if (currentIndex === exercises.length - 1) {
			const notCompleted = training.daily_training_days.filter(
				day => day.is_day_completed == false
			);
			if (notCompleted.length === 1) {
				trainingMarkAsComplete(params.id).then(res => {
					if (res) setIsTrainingCompleted(true);
					// TODO > Add error handling
				});
			} else {
				dailyTrainMarkAsComplete(params.day).then(res => {
					if (res) setIsTrainingCompleted(true);
					// TODO > Add error handling
				});
			}
		}
	}, [currentIndex]);

	if (isTrainingCompleted) {
		return <SuccessView />;
	}

	if (!exercise.rest) {
		return (
			<TrainingView
				setCurrentIndex={setCurrentIndex}
				exercise={exercise}
			></TrainingView>
		);
	}

	if (exercise.rest && exercises[currentIndex + 1]) {
		return (
			<RestView
				restInSeconds={exercise.rest_in_seconds}
				setCurrentIndex={setCurrentIndex}
				nextExercise={exercises[currentIndex + 1]}
			></RestView>
		);
	}

	return <div>Loading...</div>;
}
