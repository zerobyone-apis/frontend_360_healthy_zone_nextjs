"use client"
import { getAdminActionsSummary } from '@/actions/admin/dashboard/get-actions-summary';
import NotificationCard from '@/app/ui/notification-card'
import { AdminActionsSummary } from '@/interfaces';
import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'

type Props = {}

export default function Page({ }: Props) {
    const [actions, setActions] = useState<AdminActionsSummary>();
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchActionsSummary = async () => {
        setLoading(true)
        getAdminActionsSummary().then((data) => {
            setActions(data);
            console.log(data)
        }).catch((e) => {
            setError(true);
        }).finally(() => {
            setLoading(false)
        });
    }
    useEffect(() => {
        fetchActionsSummary();
    }, []);

    const notifications = actions?.to_approval_notifications || [];

    return (
        <>

            <div className="inline-flex items-center justify-between w-full">
                <h3 className="font-bold text-xl sm:text-2xl text-gray-800 dark:text-white">Global Notifications</h3>
                {/* <Button color="blue">
                    Clean all
                </Button> */}
            </div>
            <p className="mt-8 font-medium text-gray-500 text-sm sm:text-base dark:text-white">All</p>
            {notifications.map((notification, index: number) => <NotificationCard key={index} message={notification.message}
                date={notification.created_on} title={notification.typeEvent}
                emitted_by={notification.emitted_by}
            />)}

        </>
    )
}

