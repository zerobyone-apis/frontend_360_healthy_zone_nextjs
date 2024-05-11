"use server"
import { cookies } from "next/headers";

export async function getDashboardStats() {
    console.log(process.env.BASE_PATH)
    const cookieStore = cookies();
    const tokenValue = cookieStore.get("token")?.value || "";
    const token = tokenValue;
    const user = JSON.parse(
        cookieStore.get("user")?.value || "{}"
    );
    try {
        const resp = await fetch(process.env.BASE_PATH + "/v1.0/coach/summary/by/" + user.coach.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: null,
            cache: "no-store",
        });
        let body = await resp.json();
        body.custom = {
            customers: body.remaining_clients.split("/")[0].slice(),
            customers_limit: body.remaining_clients.split("/")[1].slice(),
            customers_percent: Number(body.remaining_clients.split("/")[0].slice()) * 100 / Number(body.remaining_clients.split("/")[1].slice())
        };
        console.log(body.full_assignments)
        return body;
    } catch (error) {
        console.log(error);
        return false;
    }
}