import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";

interface CardProps {
    title: string;
    description: string;
    img?: string;
    alt?: string;
}
export function Card({ title, description, img = "", alt = "Image description" }: CardProps) {
    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow p-5 h-full">
            {img && <Image className="rounded-t-lg" src={img} alt={alt} width={50} height={50} />}
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-jungle-green-500">{title}</h5>
                <p className="mb-3 font-normal text-android-green-700 ">{description}</p>
                <Link href={"/signup"}>
                    <Button className="inline-flex items-center text-sm font-medium text-center text-white  rounded-lg bg-jungle-green-500 hover:bg-jungle-green-300">
                        Subscribe now
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Button>
                </Link>
            </div>
        </div>
    );
}