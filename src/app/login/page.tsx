"use client";
import { login } from "@/actions/login";
import Logo from "@/app/ui/svgs/logo-360-healthy-zone.svg";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { Crypto } from "@/utils/encrypt";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
	const router = useRouter();
	const [userdata, setUserData] = useState({ email: "", password: "" });

	async function handleLoginForm() {
		let resp = await login(userdata);
		if (!resp || resp.status === 500)
			return toast.warning("Check your credentials and try again");
		if (resp.user.roles === "CLIENT") {
			if (resp.user.firstTimeLogin === true) return router.push("/custom-form");
			if (!resp.client.subscription) return router.push("/subscription-process");

			return router.push("/dashboard");
		}
		if (resp.user.roles === "COACH") return router.push("/coach/dashboard");
		if (resp.user.roles === "NUTRITIONIST")
			return router.push("/nutritionist/dashboard");
		if (resp.user.roles === "ADMIN") return router.push("/admin/dashboard");
	}

	return (
		<section className="bg-jungle-green-50">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<a
					href="#"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<Logo className="text-[4rem]" width="none"></Logo>
				</a>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
							Welcome back!
						</h1>
						<form className="space-y-4 md:space-y-6">
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-900 ">
									Your email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									value={userdata.email}
									onChange={e =>
										setUserData({ ...userdata, email: e.target.value })
									}
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
									placeholder="name@domain.com"
									required
								/>
							</div>
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-900 ">
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									value={userdata.password}
									onChange={e =>
										setUserData({ ...userdata, password: e.target.value })
									}
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
									required
								/>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="remember"
											aria-describedby="remember"
											type="checkbox"
											className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-jungle-green-300"
											required
										/>
									</div>
									<div className="ml-3 text-sm">
										<label className="text-gray-500">Remember me</label>
									</div>
								</div>
								<a
									href="#"
									className="text-sm font-medium text-jungle-green-600 hover:underline"
								>
									Forgot password?
								</a>
							</div>
							<button
								type="button"
								onClick={handleLoginForm}
								className="w-full text-white bg-jungle-green-600 hover:bg-jungle-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
							>
								Sign in
							</button>
							<p className="text-sm font-light text-gray-500 ">
								Don’t have an account yet?{" "}
								<Link
									href="/signup"
									className="font-medium text-jungle-green-600 hover:underline "
								>
									Sign up
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
			<ToastContainer />
		</section>
	);
}
