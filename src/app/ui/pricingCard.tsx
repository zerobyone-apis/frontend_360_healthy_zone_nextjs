"use client"
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react'
interface Feature {
    title: string;
    description?: string;
}

type Props = {
    price: number;
    title: string;
    description: string;
    features: Feature[];
    main?: boolean
}

export function PricingCard({ price, title, description, features, main = false }: Props) {
    return (
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
                <Link href={"/signup"}><button className={clsx(" border bg-primary-600 hover:bg-primary-700 delay-75 transition-colors focus:ring-4 focus:ring-primary-200 font-bold rounded-lg text-sm px-5 py-2.5 text-center w-full",
                    main ? "text-white border-violet-600 bg-indigo-600 hover:bg-violet-500" : "text-jungle-green-500 border-jungle-green-500 hover:bg-jungle-green-500 hover:text-white bg-white")
                }>Get started</button></Link>
            </div>
        </div>
    )
}