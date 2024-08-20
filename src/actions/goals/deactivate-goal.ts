"use server";
import { cookies } from "next/headers";

export async function deactivateGoal(
	goalID: number
): Promise<boolean | string> {
	const cookieStore = cookies();
	const tokenValue = cookieStore.get("token")?.value || "";
	const token = tokenValue;

	try {
		const resp = await fetch(
			process.env.BASE_PATH + "/v1.0/professional/goal/deactivate/" + goalID,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
				body: null,
				cache: "no-store",
			}
		);
		console.log("deactivateGoal response:", resp);
		return true;
	} catch (error) {
		console.log(error);
		throw Error("Error deactivating goal");
	}
}
