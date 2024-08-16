import { getProfileInfo } from "@/actions/profile/getProfileInfo";
import parseServerDate from "@/utils/parseDate";
import Link from "next/link";

export default async function Page() {
	let profile;

	try {
		profile = await getProfileInfo();
	} catch (error) {
		console.log(error);
		return (
			<div className="flex flex-col gap-2 justify-center items-center h-full">
				<h3 className="text-lg">An error occurred while fetching data</h3>
				<p className="text-sm text-gray-500">Please try again later.</p>
			</div>
		);
	}

	const lastUpdateDate = parseServerDate(profile.updated_on);
	return (
		<>
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
						<Link
							href="?change-password=true"
							type="button"
							className="px-3 py-2 text-xs font-medium text-center text-blue-500 bg-white border-blue-500 border-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors focus:ring-2 focus:outline-none focus:ring-blue-300"
						>
							Change password
						</Link>
						<Link
							href="?save-settings=true"
							type="button"
							className="px-3 py-2 text-xs font-medium text-center text-white bg-jungle-green-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300"
						>
							Save settings
						</Link>
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
								defaultValue={profile.description}
								className="border border-gray-300 rounded-lg p-2"
							/>
						</div>
						<div className="flex flex-col gap-2 col-span-full md:col-span-1">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								id="name"
								name="name"
								defaultValue={profile.first_name}
								className="border border-gray-300 rounded-lg p-2"
							/>
						</div>
						<div className="flex flex-col gap-2 col-span-full md:col-span-1">
							<label htmlFor="name">Lastname</label>
							<input
								type="text"
								id="lastname"
								name="lastname"
								defaultValue={profile.last_name}
								className="border border-gray-300 rounded-lg p-2"
							/>
						</div>
						<div className="flex flex-col gap-2 col-span-full md:col-span-1">
							<label htmlFor="name">City</label>
							<input
								type="text"
								id="city"
								name="city"
								defaultValue={profile.city}
								className="border border-gray-300 rounded-lg p-2"
							/>
						</div>
						<div className="flex flex-col gap-2 col-span-full md:col-span-1">
							<label htmlFor="name">Country</label>
							<input
								type="text"
								id="country"
								name="country"
								defaultValue={profile.country}
								className="border border-gray-300 rounded-lg p-2"
							/>
						</div>
						<div className="flex flex-col gap-2 col-span-full md:col-span-1">
							<label htmlFor="name">Address</label>
							<input
								type="text"
								id="address"
								name="address"
								defaultValue={profile.address}
								className="border border-gray-300 rounded-lg p-2"
							/>
						</div>
						<div className="flex flex-col gap-2 col-span-full md:col-span-1">
							<label htmlFor="phone">Phone</label>
							<input
								type="tel"
								id="phone"
								name="phone"
								defaultValue={profile.phone}
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
								defaultValue={profile.email}
								className="border border-gray-300 rounded-lg p-2"
							/>
						</div>
					</div>
				</form>
			</section>
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
