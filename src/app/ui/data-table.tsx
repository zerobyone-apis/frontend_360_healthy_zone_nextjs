"use client";
import clsx from "clsx";
import { title } from "process";
import React, { useEffect, useState } from "react";


type Headings = {
    key: string;
    text: string;
}

type Data = {
    value: string | number | null;
    key: string;
    type?: "default" | "badge" | "button",
    onClick?: (object: Data[]) => void;
    class?: string;
}

type ExtraAction = {
    title: string;
    onClick: (row: Data[]) => void;
    color?: string;
};

type Props = {
    title?: string;
    headings: Headings[];
    data: Data[][];
    actionTitle?: string;
    actionFunction?: (row: Data[]) => void;
    actionColor?: string;
    extraActions?: ExtraAction[];
};


export default function DataTable({ headings, data, actionTitle, actionFunction, actionColor = "text-blue-600", title, extraActions = [] }: Props) {

    const [filter, setFilter] = useState<string>("");
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        if (filter) {
            const filtered = data.filter((row) => {
                return row.some((cell) => {
                    return cell.value?.toString().toLowerCase().includes(filter.toLowerCase()) || "";
                });
            });
            setFilteredData(filtered);
        }
    }, [filter]);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900 p-2">
                <h5 className="text-lg font-semibold">{title}</h5>
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text" id="table-search" onChange={(e) => setFilter(e.target.value)}
                        className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {headings.map((heading, index) => (
                            <th key={index} scope="col" className="px-6 py-3">
                                {heading.text}
                            </th>
                        ))}
                        {(actionTitle || extraActions.length) && (
                            <th scope="col" className="px-6 py-3">Actions</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            {row.map((cell, index) => (
                                <td key={index} className="px-6 py-4">
                                    {cell && cell.type === "badge" ? <span className={clsx("px-2 py-1 font-semibold rounded-full", cell.class)}>{cell.value}</span> : cell && cell.type === "button" ? <button className={clsx("font-medium bg-transparent hover:underline", cell.class)}>{cell.value}</button> : cell && cell.value}
                                </td>
                            ))}
                            {(actionTitle || extraActions.length) && (
                                <td className="px-6 py-4 space-x-2">
                                    {actionTitle && actionFunction && (
                                        <button onClick={() => actionFunction(row)} className={clsx("font-medium bg-transparent hover:underline", actionColor)}>
                                            {actionTitle}
                                        </button>
                                    )}
                                    {extraActions.map((action, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => action.onClick(row)}
                                            className={clsx("font-medium bg-transparent hover:underline", action.color ?? "text-blue-600")}
                                        >
                                            {action.title}
                                        </button>
                                    ))}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


    );
}
