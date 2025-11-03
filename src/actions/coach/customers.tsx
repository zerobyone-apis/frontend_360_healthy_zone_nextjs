import { cookies } from "next/headers";

export async function getAllCustomers() {
    const cookieStore = cookies();
    const tokenValue = cookieStore.get("token")?.value || "";
    const token = tokenValue;
    const user = JSON.parse(
        cookieStore.get("user")?.value || "{}"
    );


    try {
        const resp = await fetch(
            process.env.BASE_PATH + "/v1.0/profile/update/" + user.user.userId,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-store",
                    Authorization: token,
                },
                body: "",
            }
        );

        const respi = await resp.text();
        return {
            error: false,
            message: "Data updated successfuly",
            response: respi,
        };
    } catch (error) {
        return {
            error: true,
            message: "Error trying to updating information, try later.",
            response: null,
        };
    }
}