"use client";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { getNotificationsByUser } from "@/actions/users/get-notifications-by-user";
import { NotificationDto, ROLES, User } from "@/interfaces";
import { calculateDaysDifference } from "@/utils/daysDifference";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import Link from "next/link";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

type Props = {};

export function NotificationBell({ }: Props) {

	const user: User = JSON.parse(Cookies.get("user") || "{}");
	const token: string = Cookies.get("token") || "";
	const userId = user.user?.userId || "";
	const userEmail = user.user?.email || "";

	const [toggle, setToggle] = useState(false);
	const [notifications, setNotifications] = useState<NotificationDto[]>();
	const ref = React.useRef(null);
	useOnClickOutside(ref, () => setToggle(false));


	function wsConnect() {

		const socketUrl: string = process.env.NEXT_PUBLIC_BASE_PATH + "/ws-conn"
		var socket = new SockJS(socketUrl);
		const stompClient = Stomp.over(socket);

		var header = {
			"Access-Control-Allow-Origin": "*",
			"X-User": userId,
			"X-Email": userEmail,
			"jwt-token": token
		}

		stompClient.connect(header, (frame: any) => {
			console.log('Connected: ' + frame);

			if (user.admin == null) {
				stompClient.subscribe('/notifications/messages', function (message) { //  para todos..
					console.log(message);
					toast(message.body)
				});
			}


			stompClient.subscribe('/user/notifications/user-message',  // este de aca es por USER ID
				function (message) {
					toast.success(message.body);
				});


			stompClient.subscribe('/notifications/notif', function (message) {
				console.log(message);
			});


			stompClient.subscribe('/user/notifications/user-notif', function (message) {
				console.log(message);
			});
		});
	}


	useEffect(() => {

		// WEBSOCKET CONNECTION
		wsConnect();

		getNotificationsByUser().then((notifications) => {
			setNotifications(notifications);
		}).catch((e) => {
			setNotifications([]);
		});

	}, []);
	return (
		<>
			<button
				id="dropdownNotificationButton"
				onClick={() => setToggle(state => !state)}
				className="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
				type="button"
			>
				<svg
					className="w-5 h-5"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 14 20"
				>
					<path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
				</svg>

				<div className="absolute block w-5 h-5 bg-red-500 rounded-full top-0.5 start-2.5 dark:border-gray-900 text-xs text-center font-bold text-white ">
					{notifications?.length}
				</div>
			</button>

			<div
				ref={ref}
				id="dropdownNotification"
				className={clsx(
					!toggle && "hidden",
					"z-[200] fixed top-10 right-20 w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
				)}
			>
				<div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
					Notifications
				</div>
				<div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-[300px] overflow-auto">
					{notifications?.map((notification) => {

						const date1 = notification.datetime_sent;
						const date2 = new Date().toISOString();
						const days = calculateDaysDifference(date1, date2);

						return (<Link
							key={notification.id}
							href=""
							className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-ellipsis overflow-hidden"
						>
							<div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
								<span className="font-medium text-gray-600 dark:text-gray-300">{/**Agregar inicial o imagen, hay que pensarlo */}</span>
							</div>
							<div className="w-full ps-3">
								<div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
									<span className="capitalize font-semibold text-gray-900 dark:text-white">{notification.typeEvent.toLowerCase().replaceAll("_", " ")}: {" "}</span>
									<span className="max-w-full text-ellipsis overflow-hidden">
										{notification.message}
									</span>

								</div>
								<div className="text-xs text-blue-600 dark:text-blue-500">
									{days} days ago
								</div>
							</div>
						</Link>)
					}
					)}
				</div>
				<a
					href="#"
					className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
				>
					<div className="inline-flex items-center ">
						<svg
							className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 20 14"
						>
							<path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
						</svg>
						View all
					</div>
				</a>
			</div>
		</>
	);
}
