'use client';

import React, { useState } from 'react';
import {
  ClientSubscription,
  paypalSubscription,
} from '@/actions/paypal/subscriptions-paypal';
interface Feature {
  title: string;
  description?: string;
}

type Props = {
  price: number;
  title: string;
  description: string;
  plan_id: string;
  features: Feature[];
};

export function PricingCard({
  price,
  title,
  description,
  features,
  plan_id,
}: Props) {
  const [paypalLink, setPaypalLink] = useState(null);

  const handleSubscription = async (planId: string) => {
    try {

      console.log('-> plan_id', planId);

      const clientSubscriptionBody: ClientSubscription = {
        client_id: 9, // todo: Aca toca ver como redireccionamos al cliente para tener el id de Cliente, para ello debe estar registrado.
        plan_id: planId,
        shiping_amount: {
          value: price,
          currency_code: 'USD',
        },
      };

      const respPaypalLink = await paypalSubscription(clientSubscriptionBody);

      if (!respPaypalLink)
        console.error('Ocurrio un error con la subscripcion');
      // const data = await response.json();

      // 'data.paypalLink' debe ser el enlace de PayPal devuelto por tu backend
      if (respPaypalLink) {
        setPaypalLink(respPaypalLink); // Guarda el enlace en un estado
      }
    } catch (error) {
      console.error('Error al crear la suscripción:', error);
    }
  };

  return (
    <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
      <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
      <p className="font-light text-gray-500 sm:text-lg ">{description}</p>
      <div className="flex justify-center items-baseline my-8">
        <span className="mr-2 text-5xl font-extrabold">${price}</span>
        <span className="text-gray-500 ">/month</span>
      </div>
      <ul role="list" className="mb-8 space-y-4 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3">
            <svg
              className="flex-shrink-0 w-5 h-5 text-jungle-green-500 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>
              {feature.title}{' '}
              {feature.description && (
                <span className="font-semibold">{feature.description}</span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {/* Botón para manejar la suscripción con el planId */}
      <div className="w-full h-full flex items-end justify-center">
        <button
          className="text-jungle-green-500 border-jungle-green-500 border bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-bold rounded-lg text-sm px-5 py-2.5 text-center w-full"
          onClick={() => handleSubscription(plan_id)} // Aquí utilizamos el planId pasado como prop
        >
          Get started
        </button>

        {/* Mostrar el iframe de PayPal si paypalLink está definido */}
        {paypalLink && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-11/12 md:w-2/3 lg:w-1/2">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">Complete your Payment</h2>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setPaypalLink(null)} // Para cerrar el modal
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
      </div>
    </div>
  );
}
