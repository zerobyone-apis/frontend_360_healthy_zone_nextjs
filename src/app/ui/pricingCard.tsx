'use client';

import React, { useState } from 'react';
import {
  ClientSubscription,
  paypalSubscription,
} from '@/actions/paypal/subscriptions-paypal';
import clsx from 'clsx';
import Link from 'next/link';

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
  main: boolean;
};

export function PricingCard({
  price,
  title,
  description,
  features,
  plan_id,
  main = false
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
    <>
      <div className={clsx("flex flex-col mx-auto md:mx-0 max-w-lg text-center text-gray-900 rounded-lg border border-gray-100 shadow",
        main ? "bg-indigo-50 transition-all duration-500 hover:bg-indigo-100 px-6 py-9" : "bg-white p-6")}>
        {main &&
          <>
            <div className="uppercase bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl mb-4 p-3 text-center text-white">
              MOST POPULAR
            </div>
          </>}
        <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
        <p className="font-light text-gray-500 sm:text-lg ">{description}</p>
        <div className="flex justify-center items-baseline my-8">
          <span className={clsx("mr-2 text-5xl font-extrabold", main && "text-indigo-600")}>${price}</span>
          <span className="text-gray-500 ">/month</span>
        </div>
        <ul role="list" className="mb-8 space-y-4 text-left">
          {
            features.map((feature: Feature, index) =>
              <li key={index} className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-jungle-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span>{feature.title} {feature.description && <span className="font-semibold">{feature.description}</span>}</span>
              </li>)
          }
        </ul>
        <div className='w-full h-full flex items-end justify-center'>
          <button className={clsx(" border bg-primary-600 hover:bg-primary-700 delay-75 transition-colors focus:ring-4 focus:ring-primary-200 font-bold rounded-lg text-sm px-5 py-2.5 text-center w-full",
            main ? "text-white border-violet-600 bg-indigo-600 hover:bg-violet-500" : "text-jungle-green-500 border-jungle-green-500 hover:bg-jungle-green-500 hover:text-white bg-white")}
            onClick={() => handleSubscription(plan_id)}>Get started</button>
        </div>
      </div>

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
    </>
  );
}