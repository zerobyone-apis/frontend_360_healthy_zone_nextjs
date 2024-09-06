"use client";
import clsx from "clsx";
import { Dropdown } from "flowbite-react";
import { redirect, useRouter } from "next/navigation";
import { ReactNode } from "react";

type List = {
	label: string;
	redirect: string;
}

type Props = {
	client: any;
	list: List[];
}
export default function CustomerCard({ client, list }: Props) {
	const router = useRouter();

	return (
		<>
			<div className="flex-col flex p-4 border border-gray-200 rounded-lg bg-white m-2">
				<div className="inline-flex justify-between">
					<div className="flex items-center">
						<div className="ml-4">
							<h3 className="text-lg font-medium text-gray-900">
								{client.edited_name} <div className={clsx("inline-flex items-center text-base font-semibold text-gray-900 dark:text-white", client.isActive ? "text-jungle-green-500" : "text-red-500")}>
									{client.isActive ? "Active" : "Not active"}
								</div>
							</h3>
							<p className="text-sm text-gray-500">{client.country}{client.city ? `, ${client.city}.` : ""}</p>
							<p className="text-sm text-gray-500">{client.description}</p>
						</div>
					</div>
					<div className="flex items-center p-2">
						<Dropdown label={<ThreeDots />} size="sm" arrowIcon={false} inline>
							{list.map((item, index) => <Dropdown.Item key={index} onClick={() => router.push(item.redirect)}>{item.label}</Dropdown.Item>)}
						</Dropdown>
					</div>
				</div>
			</div>
		</>
	);
};

const ThreeDots = () => {
	return (<svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
		<path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
	</svg>)
}