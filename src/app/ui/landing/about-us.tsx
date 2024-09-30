"use client"
import { Button } from 'flowbite-react'
import React from 'react'
import Image from 'next/image'


export default function AboutUs() {
    return (
        <section className="h-full md:h-screen min-h-full w-full p-10 relative grid grid-cols-3 items-center gap-12 justify-center m-0" id="about-us">
            <div className="col-span-full md:col-span-1 w-full flex justify-center">
                <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
                    <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                    <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                    <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                    <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                    <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
                        <Image src="/imgs/mockup-dashboard-1.png" className="block w-[272px] h-[572px]" width={275} height={572} alt="" />
                    </div>
                </div>
            </div>
            <div className="text-center w-full items-center flex flex-col col-span-full md:col-span-2">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-jungle-green-700">ABOUT US</h2>
                <p className="mb-5 font-light text-gray-500 sm:text-xl max-w-screen-lg">
                    We are a company that facilitates the path to a healthier lifestyle. Through our
                    our platform, we connect people who want to improve their wellness with experts in fitness and nutrition, providing the
                    fitness and nutrition experts, providing the necessary tools to achieve concrete goals.</p>
                <p>  If you want to learn more about our history and values, we invite you to explore the complete section.</p>
                <Button className='mt-5'>More information</Button>
            </div>
        </section>
    )
}