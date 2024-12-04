import { User } from "@/interfaces";
import Cookies from "js-cookie";

export default () => {
	const user: User = JSON.parse(Cookies.get("user") || "{}");
	console.log();
};
