"use client";
import React, { useEffect, useState } from "react";
import NewTrainingDialog from "./new-training.dialog";
import SelectTrainingModal from "./select-training.dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { getGoals } from "@/actions/goals/get-goals";
import { trainingStore } from "@/stores/training.store";
import { createTraining } from "@/actions/trainings/create-training";
import { toast } from "react-toastify";

type Props = {};

export default function NewTrainingDialogParent({}: Props) {
	const training = trainingStore((state: any) => state.training);
	const [openDialog, setOpenDialog] = useState<"new" | "select" | null>(null);
	const setTraining = trainingStore((state: any) => state.setTraining);
	const setCurrentGoal = trainingStore((state: any) => state.setCurrentGoal);
	const searchParams = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		if (searchParams.get("client_id") && searchParams.get("new-training")) {
			const clientId = parseInt(searchParams.get("client_id") as string);
			if (clientId) {
				getGoals(clientId).then(goals => {
					if (goals.length > 0) {
						setCurrentGoal(goals[0]);
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
		setTraining({ ...training, dailyTrainingDays: [...data] });
		setOpenDialog(null);
		try {
			console.log("training data", data);
			await createTraining({
				clientID: searchParams.get("client_id") as string,
				training,
			});
			toast.success("Training created successfully");
			return router.replace("/coach/dashboard/customers", { shallow: true });
		} catch (e) {
			toast.error("Error creating training");
			console.log(e);
		}
	};

	return (
		<>
			{openDialog == "new" && <NewTrainingDialog handleNext={handleNext} />}
			{openDialog == "select" && (
				<SelectTrainingModal handleComplete={handleComplete} />
			)}
		</>
	);
}
