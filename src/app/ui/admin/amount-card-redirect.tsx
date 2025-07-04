import Link from "next/link";
import React from "react";

type Props = {
	title: string;
	content: string | number;
	redirectTo?: string;
};

export default function AmountCardRedirect({ title, content, redirectTo = "" }: Props) {
    return (
        <Link href={redirectTo} className="bg-white p-5 rounded-lg shadow flex justify-between items-center hover:bg-gray-50">
            <div className="flex gap-3 items-center">
                <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
                <span className="inline-flex items-center justify-center min-w-6 h-6 px-2 text-xs font-semibold text-white bg-jungle-green-500 rounded-full">
                    {content}
                </span>
            </div>
            <i className="text-xl text-gray-400 bx bx-chevron-right"></i>
        </Link>
    );
}
