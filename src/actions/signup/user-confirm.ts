"use server"

export async function userConfirm(token: string) {
  
    try {
        const resp = await fetch(process.env.BASE_PATH + "/v1.0/user/confirm/" + token, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: /* body here if required */ null,
            cache: "no-store",
        });
        const body = await resp.json();

        if(!resp.ok) {
            throw new Error(body.message);
        }

        return body;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
}