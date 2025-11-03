/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getDashboardStats } from "@/actions/coach/dashboard";
import { deactivateTraining } from "@/actions/trainings/deactivate-training";
import CustomerTrainingCard from "@/app/ui/coach/customer-training-card";
import NewTrainingDialogParent from "@/app/ui/coach/new-training-parent.dialog";
import TrainingDetailsDialog from "@/app/ui/coach/training-details.dialog";
import ConfirmationDialog from "@/app/ui/confirmation-dialog";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {};

export default function Page({ }: Props) {
	const [stats, setStats] = useState<any>(null);
	const [error, setError] = useState<boolean>(false);
	const [trainings, setTrainings] = useState<any>([]);
	const searchParams = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		getDashboardStats()
			.then((data: any) => {
				setStats((prev: any) => ({ ...prev, ...data }));
				data.goals_created.forEach((goal: any) => {
					const complete_training_list = goal.trainings.map((training: any) => {
						return { ...training, client_info: { ...goal.client } };
					});
					setTrainings([...trainings, ...complete_training_list]);
				});
			})
			.catch(e => {
				toast.error("Something went wrong")
				setError(true);
			});
	}, []);

	const isNewTraining = searchParams.get("new-training");
	const showTrainingDetails = searchParams.get("details");
	const confirmDelete = searchParams.get("confirm-delete");
	const trainingId = searchParams.get("training_id");
	const full_assignments = stats?.full_assignments || [];

	const confirmDeactivateTraining = async () => {
		// Deactivate training
		if (!trainingId) return;
		try {
			await deactivateTraining(trainingId);
			toast.success("Training deactivated successfully");
		} catch (e) {
			toast.error("Failed to deactivate training");
		}

		router.replace("/coach/dashboard/trainings");
		setTimeout(() => {
			window.location.reload();
		}, 100);
	};

	if (!full_assignments.length || error)
		return (
			<div className="flex flex-col gap-2 justify-center items-center h-full">
				<h3 className="text-lg">An error occurred while fetching data</h3>
				<p className="text-sm text-gray-500">Please try again later.</p>
			</div>
		);
	return (
		<section>
			<div className="gap-2 flex flex-col md:inline-flex md:flex-row justify-between w-full mb-5 p-5">
				<h1 className="text-xl text-jungle-green-700 font-bold">Trainings</h1>
				<div className="gap-2 inline-flex">
					<Link
						href="?new-training=true"
						type="button"
						className="px-3 py-2 text-xs font-medium text-center bg-white hover:text-white border border-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
					>
						<i className="bx bx-plus me-1"></i>
						New training
					</Link>
				</div>
			</div>
			<div className="gap-5 p-5 flex-col flex">
				{trainings.length ? (
					trainings.map((training: any) => {
						return (
							<CustomerTrainingCard
								key={training.training_id}
								training={training}
								assignment={training.client_info}
							/>
						);
					})
				) : (
					<div className="flex flex-col gap-2 justify-center items-center h-full">
						<h3 className="text-lg">
							It&apos;s time to assign some trainings 💪
						</h3>
						<p className="text-sm text-gray-500">
							Assign a training to a customer to view it here
						</p>
						<Link
							href="?new-training=true"
							type="button"
							className="px-4 py-3 text-sm font-bold text-center hover:text-white border text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
						>
							Assign New Training
						</Link>
					</div>
				)}
			</div>

			{confirmDelete && trainingId && (
				<ConfirmationDialog
					canClose={true}
					confirmAction={confirmDeactivateTraining}
					cancelAction={() =>
						router.replace("/coach/dashboard/trainings")
					}
					handleClose={() =>
						router.replace("/coach/dashboard/trainings")
					}
					title={"Are you sure you want to deactivate this training?"}
				/>
			)}
			{showTrainingDetails && trainingId && (
				<TrainingDetailsDialog
					training={trainings.find(
						(train: any) => train.training_id == trainingId
					)}
				/>
			)}
			{isNewTraining && full_assignments.length && (
				<SelectCustomerDialog customers={full_assignments} />
			)}
			<NewTrainingDialogParent />
		</section>
	);
}

function SelectCustomerDialog({ customers }: { customers: any[] }) {
	const router = useRouter();

	const handleClose = () => {
		router.back();
	};

	const handleSelectCustomer = (client_id: string) => {
		router.push("?new-training=true&client_id=" + client_id);
	};

	if (!customers) return null;
	return (
		<dialog
			id="crypto-modal"
			tabIndex={-1}
			className="flex bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full"
		>
			<div className="relative p-4 w-full max-w-md max-h-full">
				<div className="relative bg-white rounded-lg shadow">
					<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
						<h3 className="text-lg font-semibold text-gray-900 ">
							Select a customer
						</h3>
						<button
							type="button"
							onClick={handleClose}
							aria-label="Close modal"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
							data-modal-toggle="modal"
						>
							<i className="bx bx-x text-lg"></i>
							<span className="sr-only">Close modal</span>
						</button>
					</div>
					<div className="p-4 md:p-5">
						<p className="text-sm font-normal text-gray-500">
							Select a customer to start a new training
						</p>
						<ul className="my-4 space-y-3">
							{customers.map((customer: any) => (
								<li
									key={customer.id}
									onClick={() => handleSelectCustomer(customer.client.id)}
									className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow"
								>
									<span className="flex-1 ms-3 whitespace-nowrap">
										{customer.client.edited_name}
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</dialog>
	);
}
