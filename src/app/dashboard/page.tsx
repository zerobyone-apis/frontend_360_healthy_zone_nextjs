"use client";

import { useEffect, useState, useCallback } from "react";
import { PlanOfferCard } from "../ui/dashboard/plan-offer-card";
import ProgressCard from "../ui/dashboard/progress-card";
import { TasksCard } from "../ui/dashboard/tasks-card";
import { motion, progress } from "framer-motion";
import Cookies from "js-cookie";
import { User } from "@/interfaces/user";
import { ClientSubscription, paypalSubscription } from "@/actions/paypal/subscriptions-paypal";
import { getNotificationsByUser } from "@/actions/users/get-notifications-by-user";
import { getProfileInfo } from "@/actions/profile/getProfileInfo";
import { Spinner } from "flowbite-react";
import { getCustomFormsByUserID } from "@/actions/customForm/get-all-custom-forms-by-userid";

export default function Page() {
	const [paypalLink, setPaypalLink] = useState<string | null>(null);
	const [notifications, setNotifications] = useState<any[]>([]);
	const [profile, setProfile] = useState<any>(null);
	const [customForm, setCustomForm] = useState<any>(null);
	const [error, setError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	const user: User = JSON.parse(Cookies.get("user") || "{}");
	const planId = Cookies.get("plan_id") || "";
	const price = Number(Cookies.get("plan_price") || 0);

	const fetchSubscription = useCallback(async () => {
		if (user.client?.subscription) return;

		try {
			const clientSubscriptionBody: ClientSubscription = {
				client_id: user.client.id,
				plan_id: planId,
				shiping_amount: {
					value: price,
					currency_code: "USD",
				},
			};

			const respPaypalLink = await paypalSubscription(clientSubscriptionBody);

			if (respPaypalLink) {
				setPaypalLink(respPaypalLink);
			} else {
				console.error("Error creating the subscription");
			}
		} catch (error) {
			console.error("Error creating subscription:", error);
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

	const fetchProfileInfo = useCallback(async () => {
		try {
			const data = await getProfileInfo();
			setProfile(data);
		} catch {
			setError(true);
		}
	}, []);

	const fetchCustomForm = useCallback(async () => {
		try {
			const data = await getCustomFormsByUserID();
			if (data.length) {
				setCustomForm(data[data.length - 1]);
			}
		} catch {
			setError(true);
		}
	}, []);

	useEffect(() => {
		setLoading(true);
		Promise.all([fetchSubscription(), fetchNotifications(), fetchProfileInfo(), fetchCustomForm()])
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

	console.log("custom form", customForm);


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

				{profile && <motion.div
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
						target={customForm.formMap?.target_weight ? customForm.formMap?.target_weight + " kg" : "Not defined yet.."}
						percent={30}
						currentProgress={profile.current_weight + " kg"}
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
					className="md:col-span-1 col-span-3"
				>
					<ProgressCard
						bcolor="bg-jungle-green-600"
						tcolor="text-jungle-green-600"
						target="3 / week"
						percent={33}
						currentProgress="1 / 3"
						title="Daily exercises"
					/>
				</motion.div>

				<div className="md:col-span-1 col-span-3">
					<ProgressCard
						bcolor="bg-red-600"
						tcolor="text-red-600"
						target="10 days left"
						percent={79}
						currentProgress="19 days"
						title="Diet progress"
					/>
				</div>
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
