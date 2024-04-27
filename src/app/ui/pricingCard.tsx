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
}

export function PricingCard({ price, title, description, features }: Props) {
    return (
        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
            <p className="font-light text-gray-500 sm:text-lg ">{description}</p>
            <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">${price}</span>
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
                <Link href={"/signup"}><button className="text-jungle-green-500 border-jungle-green-500 border bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-bold rounded-lg text-sm px-5 py-2.5 text-center w-full">Get started</button></Link>
            </div>
        </div>
    )
}