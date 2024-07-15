"use client";
import React, { useEffect, useState } from "react";
import NewTrainingDialog from "./new-training.dialog";
import SelectTrainingModal from "./select-training.dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { trainingStore } from "@/stores/training.store";
import { createTraining } from "@/actions/trainings/create-training";
import { toast } from "react-toastify";
import { getLatestGoalByClientID } from "@/actions/goals/get-latest-goal";

type Props = {};

export default function NewTrainingDialogParent({}: Props) {
	const training = trainingStore((state: any) => state.training);
	const resetTraining = trainingStore((state: any) => state.resetTraining);
	const [openDialog, setOpenDialog] = useState<"new" | "select" | null>(null);
	const setCurrentGoal = trainingStore((state: any) => state.setCurrentGoal);
	const [goal, setGoal] = useState<any>(null);
	const searchParams = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		if (searchParams.get("client_id") && searchParams.get("new-training")) {
			const clientId = parseInt(searchParams.get("client_id") as string);
			if (clientId) {
				getLatestGoalByClientID(clientId).then(goal => {
					if (goal) {
						setCurrentGoal(goal);
						setGoal(goal);
					}
				});
			}

			// Open new training dialog
			setOpenDialog("new");
		} else {
			setOpenDialog(null);
		}
	}, [searchParams]);

	const handleNext = () => {
		setOpenDialog("select");
	};

	const handleComplete = async (data: any) => {
		try {
			await createTraining({
				clientID: searchParams.get("client_id") as string,
				training: { ...training, ...data },
			});
			toast.success("Training created successfully");
			setOpenDialog(null);
			resetTraining();
			router.push("/coach/dashboard/trainings");
			setTimeout(() => {
				window.location.reload();
			}, 100);
		} catch (e) {
			toast.error("Error creating training");
			console.log(e);
		}
	};

	return (
		<>
			{openDialog == "new" && goal && (
				<NewTrainingDialog handleNext={handleNext} goal={goal} />
			)}
			{openDialog == "select" && (
				<SelectTrainingModal handleComplete={handleComplete} />
			)}
		</>
	);
}
