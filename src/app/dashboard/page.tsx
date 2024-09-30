"use client";
import { useEffect, useState } from "react";
import { PlanOfferCard } from "../ui/dashboard/plan-offer-card";
import ProgressCard from "../ui/dashboard/progress-card";
import { TasksCard } from "../ui/dashboard/tasks-card";
import { motion } from "framer-motion";
import {
	ClientSubscription,
	paypalSubscription,
} from '@/actions/paypal/subscriptions-paypal';
import Cookies from 'js-cookie';
import { User } from "@/interfaces/user";

export default function Page() {
	const [paypalLink, setPaypalLink] = useState(null);
	const user: User = JSON.parse(Cookies.get("user") || "");

	const handleSubscription = async (planId: string, price: number) => {
		try {

			const clientSubscriptionBody: ClientSubscription = {
				client_id: user.client.id, // todo: Aca toca ver como redireccionamos al cliente para tener el id de Cliente, para ello debe estar registrado.
				plan_id: planId,
				shiping_amount: {
					value: price,
					currency_code: 'USD',
				},
			};

			const respPaypalLink = await paypalSubscription(clientSubscriptionBody);

			if (!respPaypalLink)
				console.error('Ocurrio un error con la subscripcion');
			// const data = await response.json();

			// 'data.paypalLink' debe ser el enlace de PayPal devuelto por tu backend
			if (respPaypalLink) {
				setPaypalLink(respPaypalLink); // Guarda el enlace en un estado
			}
		} catch (error) {
			console.error('Error al crear la suscripción:', error);
		}
	};

	useEffect(() => {
		if (!user.client?.subscription) {
			const plan_id = Cookies.get("plan_id") || "";
			const price = Number(Cookies.get("plan_price") || "");
			handleSubscription(plan_id, price);
		}
	}, [])


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
					<TasksCard />
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
				<motion.div
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
						target="73 kg"
						percent={30}
						currentProgress="89 kg"
						title="Weight"
					/>
				</motion.div>
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
						target="1900cal / week"
						percent={70}
						currentProgress="1500cal / week"
						title="Daily Calories"
					/>
				</motion.div>
				<div className="md:col-span-1 col-span-3">
					<ProgressCard
						bcolor="bg-red-600"
						tcolor="text-red-600"
						target="15 / Day"
						percent={10}
						currentProgress="5 / Day"
						title="Water Glasses"
					/>
				</div>
			</div>
			{/* Mostrar el iframe de PayPal si paypalLink está definido */}
			{paypalLink && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white rounded-lg shadow-lg overflow-hidden w-11/12 md:w-2/3 lg:w-1/2">
						<div className="flex justify-between items-center p-4 border-b">
							<h2 className="text-xl font-semibold">Complete your Payment</h2>
							<button
								className="text-gray-500 hover:text-gray-800"
								onClick={() => setPaypalLink(null)} // Para cerrar el modal
							>
								&times; {/* Icono de cerrar */}
							</button>
						</div>
						<iframe
							src={paypalLink}
							className="w-full h-[600px]"
							style={{ border: 'none' }}
						/>
						<div className="p-4">
							<p className="text-sm text-gray-600">
								Please complete your payment through the PayPal interface
								above.
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
