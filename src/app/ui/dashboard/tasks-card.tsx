"use client"
import NotificationCard from "../notification-card";
import { TasksList } from "./tasks-list"

type Props = {
    notifications: any[];
}

export function TasksCard({ notifications = [] }: Props) {
    console.log("notifications: ", notifications);

    return (
        <div className="w-full  bg-jungle-green-500 flex flex-col justify-center p-4 rounded-3xl shadow gap-2 max-h-48">
            <div className="w-full p-2 flex justify-between">
                <p className="font-light text-white">Pending notifications: <span className="font-bold">{notifications.length}</span></p>
            </div>
            <div className="w-[90%] h-full overflow-auto">
                {notifications.map((notification, index: number) => <NotificationCard key={index} message={notification.message}
                    date={notification.created_on} title={notification.typeEvent}
                    emitted_by={notification.emitted_by}
                />)}
            </div>
        </div>
    )
}

