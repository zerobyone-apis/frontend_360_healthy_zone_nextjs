"use client";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CustomerCard = ({ client }: any) => {
	const router = useRouter();
	const handleNewTrainingClick = () => {
		// Handle the new training click event here
		router.push("?new-training=true&client_id=" + client.id);
	};

	return (
		<>
			<div className="flex-col flex p-4 border border-gray-200 rounded-lg bg-white m-2">
				<div className="inline-flex justify-between">
					<div className="flex items-center">
						<div className="ml-4">
							<h3 className="text-lg font-medium text-gray-900">
								{client.edited_name}
							</h3>
							<p className="text-sm text-gray-500">{client.country}</p>
						</div>
					</div>
					<div className="flex items-center">
						<div className="mr-2 p-1 bg-jungle-green-500 rounded-full text-white text-xs font-medium">
							Active
						</div>
					</div>
				</div>
				<div
					className="inline-flex rounded-md justify-end w-full p-2"
					role="group"
				>
					<Link
						href={`/coach/dashboard/goals?details=true&goal_id=${""}`}
						type="button"
						className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
					>
						<i className="bx bx-detail"></i>
						Details
					</Link>
					<Link
						href={`/coach/dashboard/goals?edit=true&goal_id=${""}`}
						type="button"
						className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-jungle-green-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
					>
						<i className="bx bxs-edit"></i>
						Edit
					</Link>
					<Link
						href={`/coach/dashboard/goals?confirm-delete=true&goal_id=${""}`}
						type="button"
						className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
					>
						<i className="bx bx-trash"></i>
						Delete
					</Link>
				</div>
			</div>
		</>
	);
};

export default CustomerCard;
