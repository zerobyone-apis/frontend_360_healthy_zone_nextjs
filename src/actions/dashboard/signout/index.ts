"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signout() {
	console.log("ingreso en cookie");
	const cookieStore = cookies();
	cookieStore.delete("user");
	cookieStore.delete("token");
	console.log("Elimino token y user");
	redirect("/login");
}
