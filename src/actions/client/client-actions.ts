/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

export async function getProfile() {
	const cookieStore = cookies();
	const user: any = JSON.parse(cookieStore.get("user")?.value || "");
	const userId: any = user.client?.id;
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;
	console.log(userId);
	try {
		const resp = await fetch(process.env.BASE_PATH + "/v1.0/client/" + userId, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store",
				Authorization: token,
			},
			next: {
				revalidate: 60,
			},
		});

		const respi = await resp.json();
		console.log(respi);
		return respi;
	} catch (error) {
		return {
			error: true,
			message: "Error trying to get information, try later.",
		};
	}
}

/**
 * Refresca los datos del usuario desde el backend y actualiza las cookies
 * Esto es crucial después de que PayPal actualiza el estado de la suscripción
 * 
 * Usa el endpoint /v1.0/client/{id} para obtener los datos actualizados del cliente,
 * y luego actualiza la cookie con la suscripción actualizada
 */
export async function refreshUserData() {
	const cookieStore = cookies();
	const tokenValue = cookieStore.get("token")?.value || "";
	
	if (!tokenValue) {
		return { error: true, message: "No authentication token found" };
	}

	try {
		// Obtener datos actuales de la cookie
		const currentUser: any = JSON.parse(cookieStore.get("user")?.value || "{}");
		const clientId = currentUser.client?.id;

		if (!clientId) {
			return { error: true, message: "No client ID found" };
		}

		// Obtener datos actualizados del cliente
		const resp = await fetch(process.env.BASE_PATH + "/v1.0/client/" + clientId, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store",
				Authorization: tokenValue,
			},
			cache: "no-store",
		});

		if (!resp.ok) {
			throw new Error("Failed to refresh user data");
		}

		const clientData = await resp.json();
		console.log("Client data from backend:", clientData);

		// Actualizar solo la suscripción en la cookie del usuario
		if (clientData.subscription) {
			let subscriptionValue = null;
			
			if (
				clientData.subscription.status == "APPROVAL_PENDING" ||
				clientData.subscription.status == "ACTIVE"
			) {
				subscriptionValue = clientData.subscription.paypal_subscription_id;
				currentUser.client.plan_id = clientData.subscription.paypal_plan_id;
			}
			
			currentUser.client.subscription = subscriptionValue;
		} else {
			currentUser.client.subscription = null;
		}

		// Actualizar la cookie con los datos frescos
		const sevenDays = 168 * 60 * 60 * 1000;
		cookieStore.set("user", JSON.stringify(currentUser), {
			expires: Date.now() + sevenDays,
		});

		console.log("User data refreshed successfully");
		return { success: true, user: currentUser };
	} catch (error) {
		console.error("Error refreshing user data:", error);
		return {
			error: true,
			message: "Error refreshing user data",
		};
	}
}
