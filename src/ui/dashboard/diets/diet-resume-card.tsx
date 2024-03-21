import Link from 'next/link'
import React from 'react'


export default function DietResumeCard() {
    return (
        <Link href="/diets/2"
            className="bg-gray-100 flex-grow text-black border-l-8 border-jungle-green-500 rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12">
            Computer Science Engineering

            <div className="text-gray-500 font-thin text-sm pt-1">
                <span>Topics: 63</span>
                <span>MCQs: 20697</span>
            </div>
        </Link>
    )
}