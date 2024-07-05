"use server"
import { Training } from "@/interfaces/trainings";
import { cookies } from "next/headers";

export async function createTraining({clientID, training}: {clientID: string, training: Training}) {
    const cookieStore = cookies();
    const tokenValue = cookieStore.get("token")?.value || "";
    const token = tokenValue;
    const user = JSON.parse(
        cookieStore.get("user")?.value || "{}"
    );
    const coach_id = user.coach.id;

    //formatting the training object
    training.coach_id = coach_id;
    training.coach_plans = training.coach_plans.replaceAll(" ", "_");
    training.type = training.type.replaceAll(" ", "_");

    try {
        const resp = await fetch(process.env.BASE_PATH + "/v1.0/training/create/client/" + clientID , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(training),
            cache: "no-store",
        });
        let body = await resp.json();
        console.log(resp.status);
        if(resp.status !== 201) {
            throw new Error(body.message);
        }
        
        console.log("Training results")
        console.log(body);

        return body;
    } catch (error) {
        console.log(error);
        return false;
    }
}