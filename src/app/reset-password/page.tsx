/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable no-empty-pattern */
"use client";
import React, { useState } from 'react'
import Logo from "@/app/ui/svgs/logo-360-healthy-zone.svg";
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { confirmResetPassword } from '@/actions/users/confirm-reset-password';
import { useSearchParams } from 'next/navigation';
import "react-toastify/dist/ReactToastify.css";
type Props = {}

export default function Page({ }: Props) {
    const params = useSearchParams();
    const [password, setPassword] = useState<string>("");
    const [repassword, setRePassword] = useState<string>("");

    const handleChangePassword = async () => {
        if (!password || !repassword) {
            return toast.warning("No password");
        }

        if (password !== repassword) {
            return toast.warning("Passwords doesnt match");
        }

        try {
            console.log(params.get("token"));
            await confirmResetPassword(params.get("token") || "", password);
            toast.success("Password was changed successfully")
        } catch (e) {
            toast.error("Something went wrong")
        }
    }

    return (
        <section className="bg-jungle-green-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    <Logo className="text-[4rem]" width="none"></Logo>
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Reset pasword!
                        </h1>
                        <form className="space-y-4 md:space-y-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                    Your new password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={e =>
                                        setPassword(e.target.value)
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                    placeholder="********"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                    Your new password again
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={repassword}
                                    onChange={e =>
                                        setRePassword(e.target.value)
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                    placeholder="********"
                                    required
                                />
                            </div>

                            <button
                                type="button"
                                onClick={handleChangePassword}
                                className="w-full text-white bg-jungle-green-600 hover:bg-jungle-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Set new password
                            </button>
                            <p className="text-sm font-light text-gray-500 ">
                                <Link
                                    href="/login"
                                    className="font-medium text-jungle-green-600 hover:underline "
                                >
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}