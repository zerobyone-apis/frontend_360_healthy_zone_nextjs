import React, { ReactNode } from 'react'

type Props = {
    init_on: string | ReactNode;
    end_on: string | ReactNode;
}

export default function HorizontalTimeline({ init_on, end_on }: Props) {
    return (

        <ol className="items-center flex">
            <li className="relative mb-0 mr-2">
                <div className="flex items-center">
                    <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-300 rounded-full ring-blue-200 ring-8 shrink-0">
                        <svg className="w-2.5 h-2.5 text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                    </div>
                    <div className="flex w-full bg-gray-200 h-0.5"></div>
                </div>
                <div className="mt-4 pe-8">
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400">{init_on}</time>
                </div>
            </li>
            <li className="relative mb-0 mr-3">
                <div className="flex items-center">
                    <div className="z-10 flex items-center justify-center w-6 h-6 bg-jungle-green-300 rounded-full  ring-jungle-green-200 ring-8 shrink-0">
                        <i className='bx bxs-flag-checkered text-l text-white'></i>
                    </div>

                </div>
                <div className="mt-4 pe-8">
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400">{end_on}</time>
                </div>
            </li>
        </ol>
    )
}