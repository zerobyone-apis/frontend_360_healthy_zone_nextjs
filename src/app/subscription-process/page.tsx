/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable no-empty-pattern */
"use client"
import React, { useEffect, useState, useCallback, useRef } from 'react'
import {
    ClientSubscription,
    paypalSubscription,
} from '@/actions/paypal/subscriptions-paypal';
import Cookies from 'js-cookie';
import { User } from "@/interfaces/user";
import { Pricing } from '../ui/landing/pricing';
import { toast } from 'react-toastify';
import LoadingPage from '../ui/loading.page';
import { refreshUserData } from '@/actions/client/client-actions';
import { useRouter } from 'next/navigation';

type Props = {}

export default function Page({ }: Props) {
    const [paypalLink, setPaypalLink] = useState(null);
    const [loading, setLoading] = useState(false);
    const user: User = JSON.parse(Cookies.get("user") || "{}");
    const plan_id = Cookies.get("plan_id") || "";
    const price = Number(Cookies.get("plan_price") || "");
    const plan_type = Cookies.get("plan_type") || ""
    const router = useRouter();
    const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleSubscription = useCallback(async (planId: string, price: number, type: string) => {
        setLoading(true);
        try {
            const clientSubscriptionBody: ClientSubscription = {
                client_id: user.client.id, // todo: Aca toca ver como redireccionamos al cliente para tener el id de Cliente, para ello debe estar registrado.
                plan_id: planId,
                type,
                shiping_amount: {
                    value: price,
                    currency_code: 'USD',
                },
            };

            const respPaypalLink = await paypalSubscription(clientSubscriptionBody);

            if (!respPaypalLink) {
                toast.error("There is an error with the plan selected, retry again")
            }
            // const data = await response.json();

            // 'data.paypalLink' debe ser el enlace de PayPal devuelto por tu backend
            if (respPaypalLink) {
                setPaypalLink(respPaypalLink); // Guarda el enlace en un estado
            }
        } catch (error) {
            toast.error("There is an error with the plan selected, retry again")
            console.error(`Plan selected Error, ${error}`)
        }
        setLoading(false);
    }, [user.client.id]);

    // Polling para verificar si el pago fue completado
    useEffect(() => {
        // Solo hacer polling si hay un paypalLink activo (está esperando el pago)
        if (paypalLink) {
            pollIntervalRef.current = setInterval(async () => {
                try {
                    const result = await refreshUserData();
                    if (result.success && result.user) {
                        // Verificar si ahora tiene suscripción activa
                        if (result.user.client?.subscription) {
                            console.log("Payment completed! Subscription active");
                            toast.success("Payment completed successfully!");
                            setPaypalLink(null);
                            // Redirigir al dashboard
                            router.push("/dashboard");
                        }
                    }
                } catch (error) {
                    console.error("Error polling subscription status:", error);
                }
            }, 3000); // Poll cada 3 segundos
        }

        // Cleanup
        return () => {
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
            }
        };
    }, [paypalLink, router]);

    useEffect(() => {
        // Verificar que realmente no tenga suscripción antes de crear una nueva
        if (!user.client?.subscription && plan_id && price && plan_type && user.client?.id) {
            handleSubscription(plan_id, price, plan_type);
        }
    }, [user.client?.subscription, plan_id, price, plan_type, user.client?.id, handleSubscription])

    if (loading) {
        return <LoadingPage message='Loading plans' />
    }
    return (
        <>
            <Pricing />
            {/* Mostrar el iframe de PayPal si paypalLink está definido */}
            {paypalLink && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-11/12 md:w-2/3 lg:w-1/2">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-semibold">Complete your Payment</h2>
                            <button
                                className="text-gray-500 hover:text-gray-800"
                                onClick={() => {
                                    const confirmed = window.confirm("Are you sure you want to cancel? Your payment process will be interrupted.");
                                    if (confirmed) {
                                        setPaypalLink(null);
                                    }
                                }}
                            >
                                &times; {/* Icono de cerrar */}
                            </button>
                        </div>
                        <iframe
                            src={paypalLink}
                            className="w-full h-[600px]"
                            style={{ border: 'none' }}
                        />
                        <div className="p-4">
                            <p className="text-sm text-gray-600">
                                Please complete your payment through the PayPal interface
                                above.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}