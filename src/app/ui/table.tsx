"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

/**
 * @param items -- just an array of strings that contains all the values that you want
 * to display.
 * @param redirect -- consume the last column in order to redirect to an specific path, for example: "/coach/dashboard/customer/222331-23123d-3222ww-...."
 */
interface TableValues {
    items: string[];
    redirectTo: string;
}

type Props = {
    header: string[];
    values: TableValues[] | null;
    searchbox: boolean;
}

export default function Table({ header, values, searchbox }: Props) {
    const router = useRouter();
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {searchbox && <div className="pb-4 bg-white dark:bg-gray-900">
                <label className="sr-only">Search</label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text" id="table-search" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                </div>
            </div>}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-android-green-200">
                    <tr>
                        {
                            header.map((head: string, index: number) =>
                                <th scope="col" className="px-6 py-3" key={index}>
                                    {head}
                                </th>
                            )
                        }
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        values?.map((value: TableValues, valueIndex: number) =>
                            <tr onClick={() => router.push(value.redirectTo)} key={valueIndex} className="bg-white border-b hover:bg-android-green-400 hover:cursor-pointer hover:text-white ">
                                {
                                    value.items.map((item: string, itemIndex: number) => {
                                        if (itemIndex === 0) {
                                            return (
                                                <th key={itemIndex} scope="row" className="px-6 py-4 font-bold  whitespace-nowrap">
                                                    {item}
                                                </th>
                                            )
                                        }

                                        if (itemIndex === value.items.length - 1) {
                                            return (
                                                <td key={itemIndex} className="px-6 py-4">
                                                    <Link href={value.redirectTo} className="font-bold text-android-green-700 hover:underline">{item}</Link>
                                                </td>
                                            )
                                        }

                                        return (
                                            <td key={itemIndex} className="px-6 py-4">
                                                {item}
                                            </td>
                                        )

                                    })}
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>

    )
}