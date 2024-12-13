"use client";

import { useEffect, useState, useCallback } from "react";
import { PlanOfferCard } from "../ui/dashboard/plan-offer-card";
import ProgressCard from "../ui/dashboard/progress-card";
import { TasksCard } from "../ui/dashboard/tasks-card";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { User } from "@/interfaces/user";
import { ClientSubscription, paypalSubscription } from "@/actions/paypal/subscriptions-paypal";
import { getNotificationsByUser } from "@/actions/users/get-notifications-by-user";
import { Spinner } from "flowbite-react";
import { toast } from "react-toastify";
import { getClientDashboard } from "@/actions/client/client-dashboard";

export default function Page() {
	const [paypalLink, setPaypalLink] = useState<string | null>(null);
	const [notifications, setNotifications] = useState<any[]>([]);
	const [dashboard, setDashboard] = useState<any>(null);
	const [error, setError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	const user: User = JSON.parse(Cookies.get("user") || "{}");
	const planId = Cookies.get("plan_id") || "";
	const price = Number(Cookies.get("plan_price") || 0);
	const planType = Cookies.get("plan_type") || "";

	const fetchSubscription = useCallback(async () => {
		if (user.client?.subscription) return;

		try {
			const clientSubscriptionBody: ClientSubscription = {
				client_id: user.client.id,
				plan_id: planId,
				type: planType,
				shiping_amount: {
					value: price,
					currency_code: "USD",
				},
			};

			const respPaypalLink = await paypalSubscription(clientSubscriptionBody);

			if (respPaypalLink) {
				setPaypalLink(respPaypalLink);
			} else {
				toast.error("Error creating the subscription");
			}
		} catch (error) {
			toast.error("Error creating subscription");
		}
	}, [user, planId, price]);

	const fetchNotifications = useCallback(async () => {
		try {
			const data = await getNotificationsByUser();
			setNotifications(data);
		} catch {
			setError(true);
		}
	}, []);

	const fetchDashboardInfo = useCallback(async () => {
		try {
			const data = await getClientDashboard();
			setDashboard(data);
		} catch {
			setError(true);
		}
	}, []);

	useEffect(() => {
		setLoading(true);
		Promise.all([fetchSubscription(), fetchNotifications(), fetchDashboardInfo()])
			.finally(() => setLoading(false));
	}, []);



	if (loading) {
		return <div className="flex justify-center items-center h-screen gap-2">
			<Spinner color="success" />
			<p>Loading...</p>
		</div>;
	}

	if (error) {
		return <div className="flex justify-center items-center h-screen gap-2">
			<p>Something went wrong...</p>
		</div>;
	}

	const currentWeight = dashboard.client_profile.current_weight;
	const targetWeight = dashboard.client_profile.target_weight;

	// Supongamos que el peso inicial es igual al peso actual al principio.
	const initialWeight = dashboard.client_profile.initial_weight || currentWeight;

	let percent = 0;

	if (currentWeight > targetWeight) {
		// Objetivo de pérdida de peso
		percent = ((initialWeight - currentWeight) / (initialWeight - targetWeight)) * 100;
	} else {
		// Objetivo de ganancia de peso
		percent = (currentWeight / targetWeight) * 100;
	}

	// Asegúrate de que el porcentaje no exceda el 100% y redondea si es necesario
	percent = Number(Math.min(Math.max(percent, 0), 100).toFixed(2))
	console.log(dashboard)

	let trainingsDone = 0;
	let totalTrainings = 0;

	dashboard.goals_with_progress.map((goal: any) => {
		goal.trainings.map((training: any) => {
			if (!training.isCompleted) {
				trainingsDone += training.daily_training_days.filter((d: any) => d.is_day_completed).length;
				totalTrainings += training.daily_training_days.length;
			}
		})
	})

	const trainingPercentage = ((trainingsDone * 100) / totalTrainings).toFixed(0);
	console.log(trainingsDone, totalTrainings);

	return (
		<>
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
					<TasksCard notifications={notifications} />
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

				{dashboard.client_profile && <motion.div
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
						target={`${targetWeight} kg`}
						percent={percent}
						currentProgress={`${currentWeight} kg`}
						title="Weight"
					/>
				</motion.div>}

				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{
						duration: 0.8,
						delay: 0.7,
						ease: [0, 0.71, 0.2, 1.01],
					}}
					className="md:col-span-2 col-span-3"
				>
					<ProgressCard
						bcolor="bg-jungle-green-600"
						tcolor="text-jungle-green-600"
						target={"complete all the daily exercises"}
						percent={trainingPercentage}
						currentProgress={`${trainingsDone} / ${totalTrainings}`}
						title="Daily exercises"
					/>
				</motion.div>

				{/* <div className="md:col-span-1 col-span-3">
					<ProgressCard
						bcolor="bg-red-600"
						tcolor="text-red-600"
						target="10 days left"
						percent={79}
						currentProgress="19 days"
						title="Diet progress"
					/>
				</div> */}
			</div>

			{paypalLink && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white rounded-lg shadow-lg overflow-hidden w-11/12 md:w-2/3 lg:w-1/2">
						<div className="flex justify-between items-center p-4 border-b">
							<h2 className="text-xl font-semibold">Complete your Payment</h2>
							<button
								className="text-gray-500 hover:text-gray-800"
								onClick={() => setPaypalLink(null)}
							>
								&times;
							</button>
						</div>
						<iframe
							src={paypalLink}
							className="w-full h-[600px]"
							style={{ border: "none" }}
						/>
						<div className="p-4">
							<p className="text-sm text-gray-600">
								Please complete your payment through the PayPal interface above.
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
