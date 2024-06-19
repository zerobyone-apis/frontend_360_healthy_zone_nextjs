"use client";
import React, { useEffect } from "react";
import NewTrainingDialog from "./new-training.dialog";
import SelectTrainingModal from "./select-training.dialog";
import { Training } from "@/interfaces/trainings";
import { useSearchParams } from "next/navigation";
import { getGoals } from "@/actions/goals/get-goals";
import { trainingStore } from "@/stores/training.store";

type Props = {};

export default function NewTrainingDialogParent({}: Props) {
	const training = trainingStore((state: any) => state);
	const setTraining = trainingStore((state: any) => state.setTraining);
	const isOpenNewTraining = trainingStore(
		(state: any) => state.dialogs.newTraining
	);
	const isOpenSelectTraining = trainingStore(
		(state: any) => state.dialogs.selectTraining
	);
	const setOpenNewTraining = trainingStore(
		(state: any) => state.setOpenNewTraining
	);
	const setOpenSelectTraining = trainingStore(
		(state: any) => state.setOpenSelectTraining
	);

	const setCurrentGoal = trainingStore((state: any) => state.setCurrentGoal);
	const searchParams = useSearchParams();

	useEffect(() => {
		if (searchParams.get("client_id") && searchParams.get("new-training")) {
			const clientId = parseInt(searchParams.get("client_id") as string);
			if (clientId) {
				getGoals(clientId).then(goals => {
					if (goals.length > 0) {
						setCurrentGoal(goals[0]);
						console.log("NewTrainingDialogParent -> goals", goals);
					}
				});
			}

			// Open new training dialog
			setOpenNewTraining(true);
		} else {
			setOpenNewTraining(false);
			setOpenSelectTraining(false);
		}
	}, [searchParams]);
	console.log("NewTrainingDialogParent -> isOpen", isOpenNewTraining);

	const handleComplete = (data: Training) => {
		setTraining(data);
		setOpenSelectTraining(true);
	};
	return (
		<>
			{isOpenNewTraining && <NewTrainingDialog />}
			{isOpenSelectTraining && (
				<SelectTrainingModal handleComplete={handleComplete} />
			)}
		</>
	);
}
