"use server";

import { cookies } from "next/headers";

export async function approveClientProgress(progressId: number | string) {
    const cookieStore = cookies();
    const tokenValue = cookieStore.get("token")?.value || "";
    const token = tokenValue;
    const user = JSON.parse(cookieStore.get("user")?.value || "{}");
    const adminId = user.admin?.id;

    try {
        if (!progressId) {
            throw new Error("Progress ID is required");
        }
        if (!adminId) {
            throw new Error("Admin ID is required");
        }
        const resp = await fetch(
            process.env.BASE_PATH + `/v1.0/admin/approve/client/progress/by/${progressId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                    admin_id: adminId,
                },
                body: null,
                cache: "no-store",
            }
        );

        if (![200, 201, 202].includes(resp.status)) {
            const body = await resp.text();
            throw new Error(body);
        }

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
