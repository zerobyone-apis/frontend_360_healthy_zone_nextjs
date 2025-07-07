"use client"
import Link from "next/link";
import Confetti from "react-confetti"
import useWindowSize from "react-use/lib/useWindowSize";
import Cookies from 'js-cookie';
import { User } from "@/interfaces";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
    const { width, height } = useWindowSize();
    const router = useRouter();
    useEffect(() => {
        Cookies.set("user", "");
        Cookies.set("token", "");
        setTimeout(() => {
            router.push("/login")
        }, 2500);
    });

    return (
        <main className="h-full flex flex-col items-center">
            <Confetti width={width} height={height} recycle={false} />
            <div className="bg-white p-6 flex flex-col justify-center items-center h-full">
                <svg
                    viewBox="0 0 24 24"
                    className="text-jungle-green-500 w-16 h-16 mx-auto my-6"
                >
                    <path
                        fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                    ></path>
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        Payment completed!
                    </h3>
                    <p className="text-gray-600 my-2">
                        Thank you for completing your payment
                    </p>
                    <p> You can login now, by the way, we will redirect to in a few seconds. </p>
                    <div className="py-10 text-center">
                        <Link
                            href="/dashboard"
                            className="px-12 border-jungle-green-600 hover:bg-jungle-green-500 text-jungle-green-600 font-semibold py-3 rounded"
                        >
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
