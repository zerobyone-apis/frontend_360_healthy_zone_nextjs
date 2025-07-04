import React from "react";

type Props = {
	title: string;
	content: string | number;
	icon?: string;
};

export default function AmountCard({ title, content, icon }: Props) {
    return (
        <div className="bg-white p-5 rounded-lg shadow flex items-center gap-3 border-l-4 border-jungle-green-500">
            {icon && <i className={`${icon} text-3xl text-jungle-green-500`}></i>}
            <div>
                <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
                <p className="text-3xl font-bold text-gray-800">{content}</p>
            </div>
        </div>
    );
}
