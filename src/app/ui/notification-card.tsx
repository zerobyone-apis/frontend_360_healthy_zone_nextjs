"use client"
import parseServerDate from '@/utils/parseDate'
import React from 'react'

type Props = {
    message: string,
    date: string,
    title: string,
    emitted_by: {
        email: string;
        first_name: string;
        last_name: string;
        user_id: string;
        username: string;
    }
}

export default function NotificationCard({ message, date, title, emitted_by }: Props) {
    return (
        <div className="mt-2 px-6 py-4 bg-white rounded-lg shadow w-full">
            <div className=" inline-flex items-center justify-between w-full">
                <div className="inline-flex items-center">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/763/763812.png"
                        alt="Training Icon" className="w-6 h-6 mr-3" />
                    <h3 className="font-bold text-base text-gray-800">{title}</h3>
                </div>
                <p className="text-xs text-gray-500">
                    {parseServerDate(date) || "0"} ago
                </p>
            </div>
            <p className="mt-1 text-sm">
                {message}
            </p>
            <p className="mt-1 text-xs">
                {emitted_by.first_name} {emitted_by.last_name}
            </p>
        </div>
    )
}