"use client"
import { getAdminActionsSummary } from '@/actions/admin/dashboard/get-actions-summary';
import { getNotificationsByUser } from '@/actions/users/get-notifications-by-user';
import NotificationCard from '@/app/ui/notification-card'
import { AdminActionsSummary } from '@/interfaces';
import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'

type Props = {}

export default function Page({ }: Props) {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchNotificationsSummary = async () => {
        setLoading(true);

        getNotificationsByUser().then((data) => {
            setNotifications(data);
        }).catch(() => {
            setError(true);
        }).then(() => {
            setLoading(false);
        })
    }
    useEffect(() => {
        fetchNotificationsSummary();
    }, []);


    if (error) {

    }
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

