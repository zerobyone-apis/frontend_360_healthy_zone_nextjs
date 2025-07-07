"use client";

import { useRouter, useSearchParams } from "next/navigation";
import NewGoalDialog from "./new-goal-dialog";
import ConfirmationDialog from "../confirmation-dialog";
import { deactivateGoal } from "@/actions/goals/deactivate-goal";
import { toast } from "react-toastify";

export default function DialogsWrapper() {
	const params = useSearchParams();
	const router = useRouter();
	const goalId = params.get("goal_id");
	const confirmDelete = () => {
		deactivateGoal(Number(goalId))
			.then(() => {
				router.push("/nutritionist/dashboard/goals");
				setTimeout(() => {
					window.location.reload();
				}, 100);
				toast.success("Goal deleted successfully");
			})
			.catch(() => {
				toast.error("Error deleting goal");
			});
	};

	return (
		<>
			{params.get("new-goal") && <NewGoalDialog />}
			{params.get("confirm-delete") && (
				<ConfirmationDialog
					canClose={true}
					confirmAction={confirmDelete}
					cancelAction={() => router.push("/nutritionist/dashboard/goals")}
					handleClose={() => router.push("/nutritionist/dashboard/goals")}
					title={"Are you sure you want to delete this goal?"}
				/>
			)}
		</>
	);
}
