"use client";
import React, { useEffect, useState } from "react";
import { getDashboardStats } from "@/actions/coach/dashboard";
import CustomerCard from "@/app/ui/coach/customer-card";
import NewTrainingDialogParent from "@/app/ui/coach/new-training-parent.dialog";

export default function Page() {
	const [stats, setStats] = useState<any>(null);
	useEffect(() => {
		getDashboardStats().then(data => {
			setStats(data);
		});
	}, []);

	if (!stats) return null;
	return (
		<div className="gap-3">
			{stats.full_assignments.map((assigned: any) => {
				return <CustomerCard key={assigned.id} client={assigned.client} />;
			})}
			<NewTrainingDialogParent />
		</div>
	);
}
