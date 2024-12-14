"use client"
import { getNotificationsByUser } from '@/actions/users/get-notifications-by-user';
import { markAllNotificationsById } from '@/actions/users/mark-all-notifications-by-id';
import NotificationCard from '@/app/ui/notification-card'
import { Button, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

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

    const markAllNotifications = async () => {
        setLoading(true);
        try {
            await markAllNotificationsById();
            // await fetchNotificationsSummary()
            toast.success("All notifications has been read");
        } catch (e) {
            console.log(e);
            toast.error("Something went wrong");
        }

        setLoading(false);
    }

    if (error) {
        return (<div>
            Error..
        </div>)
    }
    return (
        <>

            <div className="inline-flex items-center justify-between w-full">
                <h3 className="font-bold text-xl sm:text-2xl text-gray-800 dark:text-white">Global Notifications</h3>
                <Button color="blue" onClick={markAllNotifications} isProcessing={loading} disabled={loading}>
                    Clean all
                </Button>
            </div>
            <p className="mt-8 font-medium text-gray-500 text-sm sm:text-base dark:text-white">All</p>
            {loading ? <div className='w-full h-full flex justify-center items-center'>
                <Spinner className="mr-2" /><p> Loading ...</p>
            </div> :
                notifications.map((notification, index: number) => <NotificationCard key={index} message={notification.message}
                    date={notification.created_on} title={notification.typeEvent}
                    emitted_by={notification.emitted_by}
                />)
            }
        </>
    )
}

