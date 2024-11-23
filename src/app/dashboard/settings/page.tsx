"use client";
import { useEffect, useState } from "react";
import { getProfileInfo } from "@/actions/profile/getProfileInfo";
import parseServerDate from "@/utils/parseDate";
import LoadingPage from "@/app/ui/loading.page";
import { Button } from "@/app/ui/button";
import { updateProfile } from "@/actions/profile/update-profile";
import { toast } from "react-toastify";
import { Tabs } from "flowbite-react";

export default function Page() {
	const [profile, setProfile] = useState({
		description: "", first_name: "", last_name: "", phone: "", email: "", city: "", country: "",
		address: "", updated_on: "", target_weight: "", current_weight: "", initial_weight: ""
	})
	const [loading, setLoading] = useState<boolean>(false);

	function handleOnChange(event: any) {
		const { value, name } = event.target;
		setProfile({ ...profile, [name]: value });
	}

	async function handleSave() {
		try {
			const info = {
				description: profile.description,
				first_name: profile.first_name,
				last_name: profile.last_name,
				phone: profile.phone,
				city: profile.city,
				country: profile.country,
				address: profile.address,
				target_weight: profile.target_weight,
				current_weight: Number(profile.current_weight),
				initial_weight: Number(profile.initial_weight)
			}
			await updateProfile(info);
			toast.success("Profile updated successfully");
			setTimeout(() => {
				window.location.reload();
			}, 100);
		} catch (e) {
			toast.error("Error trying to update the profile, try later.");
		}

	}

	useEffect(() => {
		async function getProfileData() {
			try {
				setLoading(true);
				const resp = await getProfileInfo();
				setProfile(resp);
				setLoading(false);
			} catch (error) {
				console.log(error);
				return (
					<div className="flex flex-col gap-2 justify-center items-center h-full">
						<h3 className="text-lg">An error occurred while fetching data</h3>
						<p className="text-sm text-gray-500">Please try again later.</p>
					</div>
				);
			}
		}
		getProfileData();
	}, []);

	const lastUpdateDate = profile ? parseServerDate(profile.updated_on) : "";

	if (loading || !profile) return <LoadingPage message={"Loading profile settings"} />;
	console.log(profile);

	return (
		<>
			<Tabs aria-label="Default tabs">
				<Tabs.Item active title="Profile">
					<section>
						<div className="inline-flex justify-between w-full mb-5 p-5">
							<div className="flex flex-col">
								<h1 className="text-xl text-jungle-green-700 font-bold">
									Settings
								</h1>
								<p className="text-sm text-gray-400 flex items-center">
									Last update: {lastUpdateDate}
								</p>
							</div>
							<div className="inline-flex gap-2">
								<Button
									type="button"
									className="px-3 py-2 text-xs font-medium text-center text-blue-500 bg-white border-blue-500 border-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors focus:ring-2 focus:outline-none focus:ring-blue-300"
								>
									Change password
								</Button>
								<Button
									onClick={handleSave}
									type="button"
									className="px-3 py-2 text-xs font-medium text-center text-white bg-jungle-green-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 flex justify-center"
								>
									Update profile
								</Button>
							</div>
						</div>
						<form id="profile-form" className="p-2">
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col gap-2 col-span-full">
									<label htmlFor="description">Description</label>
									<input
										type="description"
										id="description"
										name="description"
										value={profile.description}
										onChange={(e) => handleOnChange(e)}
										className="border border-gray-300 rounded-lg p-2"
									/>
								</div>
								<div className="flex flex-col gap-2 col-span-full md:col-span-1">
									<label htmlFor="name">Name</label>
									<input
										type="text"
										id="name"
										name="first_name"
										value={profile.first_name}
										onChange={(e) => handleOnChange(e)}
										className="border border-gray-300 rounded-lg p-2"
									/>
								</div>
								<div className="flex flex-col gap-2 col-span-full md:col-span-1">
									<label htmlFor="name">Lastname</label>
									<input
										type="text"
										id="lastname"
										name="last_name"
										value={profile.last_name}
										onChange={(e) => handleOnChange(e)}
										className="border border-gray-300 rounded-lg p-2"
									/>
								</div>
								<div className="flex flex-col gap-2 col-span-full md:col-span-1">
									<label htmlFor="name">City</label>
									<input
										type="text"
										id="city"
										name="city"
										value={profile.city}
										onChange={(e) => handleOnChange(e)}
										className="border border-gray-300 rounded-lg p-2"
									/>
								</div>
								<div className="flex flex-col gap-2 col-span-full md:col-span-1">
									<label htmlFor="name">Country</label>
									<input
										type="text"
										id="country"
										name="country"
										value={profile.country}
										onChange={(e) => handleOnChange(e)}
										className="border border-gray-300 rounded-lg p-2"
									/>
								</div>
								<div className="flex flex-col gap-2 col-span-full md:col-span-1">
									<label htmlFor="name">Address</label>
									<input
										type="text"
										id="address"
										name="address"
										value={profile.address}
										onChange={(e) => handleOnChange(e)}
										className="border border-gray-300 rounded-lg p-2"
									/>
								</div>
								<div className="flex flex-col gap-2 col-span-full md:col-span-1">
									<label htmlFor="phone">Phone</label>
									<input
										type="tel"
										id="phone"
										name="phone"
										value={profile.phone}
										onChange={(e) => handleOnChange(e)}
										className="border border-gray-300 rounded-lg p-2"
									/>
								</div>
								<div className="flex flex-col gap-2 col-span-full md:col-span-1">
									<label htmlFor="email">Email</label>
									<input
										disabled={true}
										type="email"
										id="email"
										name="email"
										value={profile.email}
										className="border border-gray-300 rounded-lg p-2"
									/>
								</div>
								<div className="flex flex-col gap-2 col-span-full md:col-span-1">
									<label htmlFor="target_weight">Target Weight</label>
									<input
										type="text"
										id="target_weight"
										name="target_weight"
										value={profile.target_weight || ""}
										onChange={(e) => handleOnChange(e)}
										className="border border-gray-300 rounded-lg p-2"
									/>
								</div>
								<div className="flex flex-col gap-2 col-span-full md:col-span-1">
									<label htmlFor="target_weight">Initial Weight</label>
									<input
										type="text"
										id="initial_weight"
										name="initial_weight"
										value={profile.initial_weight || ""}
										onChange={(e) => handleOnChange(e)}
										className="border border-gray-300 rounded-lg p-2"
									/>
								</div>
								<div className="flex flex-col gap-2 col-span-full md:col-span-1">
									<label htmlFor="target_weight">Current Weight</label>
									<input
										type="text"
										id="current_weight"
										name="current_weight"
										value={profile.current_weight || ""}
										onChange={(e) => handleOnChange(e)}
										className="border border-gray-300 rounded-lg p-2"
									/>
								</div>
							</div>
						</form>
					</section>
				</Tabs.Item>
				<Tabs.Item title="Subscription">
					<div className="flex flex-col gap-2 justify-center items-center h-full">
						<h3 className="text-lg">Working in progess on Subscription view</h3>
						<p className="text-sm text-gray-500">Please try again later.</p>
					</div>
				</Tabs.Item>
				<Tabs.Item title="Settings">
					<div className="flex flex-col gap-2 justify-center items-center h-full">
						<h3 className="text-lg">Working in progess on settings view</h3>
						<p className="text-sm text-gray-500">Please try again later.</p>
					</div>
				</Tabs.Item>
				<Tabs.Item title="Support">
					<div className="flex flex-col gap-2 justify-center items-center h-full">
						<h3 className="text-lg">Working in progess on support view</h3>
						<p className="text-sm text-gray-500">Please try again later.</p>
					</div>
				</Tabs.Item>
			</Tabs>

			{/* <ChangePasswordDialog /> */}
		</>
	);
}

function ChangePasswordDialog() {
	return (
		<dialog className="grid grid-cols-1 gap-4">
			<div className="flex flex-col gap-2">
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					className="border border-gray-300 rounded-lg p-2"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label htmlFor="confirm-password">Confirm password</label>
				<input
					type="password"
					id="confirm-password"
					name="confirm-password"
					className="border border-gray-300 rounded-lg p-2"
				/>
			</div>
		</dialog>
	);
}
