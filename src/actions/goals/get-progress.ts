"use server";
import { ProgressResponseDTO } from "@/interfaces/progress";

export async function getProgressByClientID(
	clientID: string | number
): Promise<ProgressResponseDTO[] | null> {
	if (!clientID) throw new Error("Client ID is required");
	try {
		const resp = await fetch(
			process.env.BASE_PATH + "/v1.0/progress/all/by/client/" + clientID,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				body: null,
				cache: "no-store",
			}
		);
		if (!resp.ok) {
			return [];
		}
		const body = await resp.json();
		return body;
	} catch (error) {
		console.log(error);
		return null;
	}
}
