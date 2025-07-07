'use client'

import { professionalRegistration } from "@/actions/signup";
import Logo from "@/app/ui/svgs/logo-360-healthy-zone.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RadioCard from "../ui/radio-card";

export default function Page() {

    const [userdata, setUserData] = useState({ user: "", password: "", repass: "", first_name: "", last_name: "", phone: "", role: "" });
    const router = useRouter();

    async function handleSignupForm() {
        let resp = await professionalRegistration(userdata);
        if (resp.username) router.push("/success-registration");
        else toast.error("There was an internal error")
    }

    return (
        <section className="bg-gray-50 h-full ">
            < Link href="/" className="hidden md:flex items-center mt-2 mb-6 text-2xl font-semibold text-gray-900 " >
                <Logo className="text-[4rem]" width="none"></Logo>
            </Link >

            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full sm:h-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                            Be part of our team!
                        </h1>
                        <form className="space-y-4 md:space-y-6 grid grid-cols-2 gap-2">
                            <div className="col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                                <input type="name" name="name" id="name"
                                    value={userdata.first_name} onChange={(e) => setUserData({ ...userdata, first_name: e.target.value })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="John" required />
                            </div>
                            <div className="col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Lastname</label>
                                <input type="lastname" name="lastname" id="lastname"
                                    value={userdata.last_name} onChange={(e) => setUserData({ ...userdata, last_name: e.target.value })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Doe" required />
                            </div>
                            <div className="col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Phone</label>
                                <input type="phone" name="phone" id="phone"
                                    value={userdata.phone} onChange={(e) => setUserData({ ...userdata, phone: e.target.value })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="+17863036229" required />
                            </div>
                            <div className="col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Your best email</label>
                                <input type="email" name="email" id="email"
                                    value={userdata.user} onChange={(e) => setUserData({ ...userdata, user: e.target.value })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@domain.com" required />
                            </div>
                            <div className="col-span-1">
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••"
                                    value={userdata.password} onChange={(e) => setUserData({ ...userdata, password: e.target.value })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required />
                            </div>
                            <div className="col-span-1">
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Re-Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••"
                                    value={userdata.repass} onChange={(e) => setUserData({ ...userdata, repass: e.target.value })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required />
                            </div>
                            <div className="col-span-2">
                                <RadioCard
                                    id="professionals"
                                    options={[
                                        { icon: "bx bx-run", title: "Coach", subtitle: "Trainings and rutines", value: "coach" },
                                        { icon: "bx bxs-pear", title: "Nutritionist", subtitle: "Healthy food and diets", value: "nutritionist" }]}
                                    onChange={(value: string) => setUserData({ ...userdata, role: value })} />
                            </div>
                            <div className="col-span-2 flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="agree" aria-describedby="agree" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-jungle-green-300" required />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label className="text-gray-500">Agree with the <Link href={"/terms"} className="font-medium text-jungle-green-600 hover:underline">terms</Link></label>
                                    </div>
                                </div>
                            </div>
                            <button type="button" onClick={handleSignupForm} className="col-span-2 w-full text-white bg-jungle-green-600 hover:bg-jungle-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign up</button>
                            <p className="text-sm font-light text-gray-500 ">
                                Have an account already? <Link href={"/login"} className="font-medium text-jungle-green-600 hover:underline">Sign in</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section >
    )
}