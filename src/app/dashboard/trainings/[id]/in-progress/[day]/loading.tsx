import React from 'react'
import Logo from "@/app/ui/svgs/logo-360-healthy-zone-white.svg"
import { Button } from '@/app/ui/button';

type Props = {}

export default function Loading({ }: Props) {
    return (
        <div className="fixed top-0 left-0 z-50 h-full p-4 w-full max-w-full bg-jungle-green-500">
            <div className="flex justify-center items-center h-full w-full flex-col">
                <Logo width="none" className="text-6xl animate-bounce"></Logo>
                <span className='text-xl text-white font-sans font-semibold'>Loading training...</span>
            </div>
        </div>
    )
}