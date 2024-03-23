'use client'
import Logo from "@/app/ui/svgs/logo-360-healthy-zone.svg";
import { Button } from "../button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function Navbar() {
	const router = useRouter();
	const [isLogged, setLogged] = useState(false);

	useEffect(() => {
		setLogged(Cookies.get("token") ? true : false);
	})


	return (
		<div className="w-full flex justify-center fixed z-10">
			<nav className="bg-white shadow-xl flex justify-around items-center px-2 py-2 mt-5  w-[95%] rounded-full border border-slate-200" >
				<div className="flex items-center">
					<Button className="rounded-full  md:hidden">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
						</svg>
					</Button>
					<div>
						<Logo className="text-3xl" width="none"></Logo>
					</div>
				</div>
				<ul className="md:flex gap-5 text-jungle-green-500 hidden">
					<li><Button className="uppercase">Features</Button></li>
					<li><Button className="uppercase">Pricing</Button></li>
					<li><Button className="uppercase">About us</Button></li>
				</ul>
				<div className="flex gap-2">
					{
						isLogged ?
							<>
								<Button className="rounded-full bg-jungle-green-500 hover:bg-jungle-green-300" onClick={() => router.push("/dashboard")}>Go Dashboard</Button>
							</>
							:
							<>
								<Button className="rounded-full bg-jungle-green-500 hover:bg-jungle-green-300" onClick={() => router.push("/sign-up")}>Sign up</Button>
								<Button className="rounded-full  border-android-green-500 border hover:bg-android-green-300" onClick={() => router.push("/login")}>Sign in</Button>
							</>

					}
				</div>
			</nav>
		</div>
	);
}
