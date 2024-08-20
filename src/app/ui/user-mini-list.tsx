import { UserBody } from '@/interfaces/user'
import Link from 'next/link';
import React from 'react'

type Props = {
    users: any[];
    redirect: string;
}

export default function UserMiniList({ users, redirect }: Props) {
    return (
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">My Clients</h5>
                <Link href={redirect} className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                    View all
                </Link>
            </div>
            <div className="flow-root max-h-[300px] overflow-auto">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700  ">
                    {users.map((user: any) => {
                        const client = user.client;
                        const subtitle = client.city && client.country ? `${client.city}, ${client.country}` : client.country

                        return (
                            <li className="py-3 sm:py-4" key={client.id}>
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src={"/imgs/placeholder_not_found.png"} alt={`${client.edited_name} image`} />
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {client.edited_name}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {subtitle}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        {client.isActive ? "Active" : "Not active"}
                                    </div>
                                </div>
                            </li>)
                    })}
                </ul>
            </div>
        </div>
    )
}