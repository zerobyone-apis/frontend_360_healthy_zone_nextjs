import React from "react";

type Props = {
	title: string;
	content: string | number;
	icon?: string;
};

export default function AmountCard({ title, content, icon }: Props) {
	return (
		<div className="bg-white p-5 rounded shadow">
			<h3 className="text-sm font-semibold">{title}</h3>
			<p className="text-4xl font-semibold">{content}</p>
		</div>
	);
}
