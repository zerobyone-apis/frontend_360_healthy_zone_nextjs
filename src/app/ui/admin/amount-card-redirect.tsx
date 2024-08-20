import Link from "next/link";
import React from "react";

type Props = {
	title: string;
	content: string | number;
	redirectTo?: string;
};

export default function AmountCardRedirect({
	title,
	content,
	redirectTo = "",
}: Props) {
	return (
		<div className="bg-white p-5 rounded shadow inline-flex justify-between w-full items-center">
			<div className="inline-flex gap-4">
				<h3 className="text-sm font-semibold">{title}</h3>
				<span className="inline-flex items-center justify-center w-6 h-6 text-xs font-semibold text-jungle-green-800 bg-jungle-green-200 p-2 rounded-full">
					{content}
				</span>
			</div>
			<Link href={redirectTo}>
				<i className="text-2xl text-gray-400 bx bx-chevron-right"></i>
			</Link>
		</div>
	);
}
