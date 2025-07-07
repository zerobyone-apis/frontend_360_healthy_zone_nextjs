"use client";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

export async function CreateClientProgress(data: any, photos: File[]) {
	const cookie = Cookies;
	const tokenValue = cookie.get("token") || "";
	const token = tokenValue;

	const user = JSON.parse(cookie.get("user") || "{}");
	const clientID = user.client.id;

	const formdata = new FormData();

	photos.forEach((photo: File) => {
		formdata.append("files", photo, uuidv4());
	});

	formdata.append("client_id", String(clientID));
	formdata.append("goal_id", data.goal_id);
	formdata.append("description_advance", data.description_advance);
	formdata.append("initial_weight", String(data.initial_weight));
	formdata.append("initial_height", String(data.initial_height));
	formdata.append("initial_body_fat_percentage", "0");
	formdata.append("current_weight", String(data.current_weight));
	formdata.append(
		"current_body_fat_percentage",
		String(data.current_body_fat_percentage)
	);
	formdata.append("target_weight", String(data.target_weight));
	formdata.append(
		"target_body_fat_percentage",
		String(data.target_body_fat_percentage)
	);
	formdata.append("selected_type", data.selected_type);
	data?.training_id &&
		formdata.append("training_id", String(data?.training_id));
	data?.diet_id && formdata.append("diet_id", String(data?.diet_id));

	const requestOptions: RequestInit = {
		method: "POST",
		body: formdata,
		mode: "no-cors",
		headers: {
			"Cache-Control": "no-store",
			Authorization: token,
			Accept: "*/*",
			"Accept-Encoding": "gzip, deflate, br",
			"Access-Control-Allow-Origin": "*",
		},
	};

	try {
		let resp = await fetch(
			process.env.NEXT_PUBLIC_BASE_PATH + "/v1.0/progress/trains/create",
			requestOptions
		);

		console.log("Progress submited", resp);
		return resp;
	} catch (e) {
		console.log(e);
		throw new Error("Error trying to submit the progress");
	}
}
