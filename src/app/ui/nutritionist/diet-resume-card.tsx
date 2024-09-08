"use client";
import { DietResponseDTO } from "@/interfaces/diets";
import { DietResumeCardStyles } from "@/use-cases/diets-styles";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { Button, Dropdown } from "flowbite-react";
import { useRouter } from "next/navigation";

type List = {
    label: string;
    redirect: string;
}

interface ClientInfo {
    client_info: any
}

interface NewDietResponse extends DietResponseDTO, ClientInfo { };

export default function DietResumeCard({
    diet,
    index,
    list
}: {
    diet: NewDietResponse;
    index: number;
    list: List[];
}) {

    const router = useRouter();
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.1,
                ease: [0, 0.71, 0.2, 1.01],
            }}
            className={twMerge(
                clsx(
                    "flex-grow border-l-8 rounded-md px-3 py-2 w-full bg-white"
                )
            )}
        >
            <div className="flex-col flex p-4">
                <div className="inline-flex justify-between">
                    <div className="flex items-center">
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">
                                {diet.type.replaceAll("_", " ")} - {diet.client_info.edited_name}, {diet.client_info.country} <div className={clsx("inline-flex items-center text-base font-semibold text-gray-900 dark:text-white", diet.isActive ? "text-jungle-green-500" : "text-red-500")}>
                                    {diet.isActive ? "Active" : "Not active"}
                                </div>
                            </h3>
                            <p className="text-sm text-gray-500">{diet.description_diet}</p>
                        </div>
                    </div>
                    <div className="flex items-center p-2">
                        <Dropdown label={<ThreeDots />} size="sm" arrowIcon={false} inline>
                            {list.map((item, index) => <Dropdown.Item key={index} onClick={() => router.push(item.redirect)}>{item.label}</Dropdown.Item>)}
                        </Dropdown>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}





const ThreeDots = () => {
    return (<svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
    </svg>)
}