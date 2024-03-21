'use client'
import { saveBasicInfo } from "@/actions/dashboard/settings/settings-actions";
import { Button } from "@/ui/button";
import InputField from "@/ui/input";
import Cookies from "js-cookie";
import { useFormState } from "react-dom";
import { Crypto } from "@/utils/encrypt";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getProfile } from "@/actions/client/client-actions";

export default function Page() {
    const cookie = Cookies;
    // const userInfo = JSON.parse(Crypto.decrypt(cookie.get('user') || "") || "{}");
    const [userInfo, setUserInfo] = useState({ first_name: "", last_name: "", phone: "", email: "" });
    const [stateBasicInfo, formActionBasicInfo] = useFormState(saveBasicInfo, { message: "", error: false, response: null })
    const [error, setError] = useState(false);
    useEffect(() => {
        getProfile().then((resp) => {
            console.log(resp)
            if (resp.error) setError(true);
            else setUserInfo(resp);
        })
    }, []);


    //Cambiar por handler de next js

    if (error) return <>
        <h1>Error</h1>
    </>;

    return (
        <div>
            <form className="border border-jungle-green-200 rounded p-4 mt-10" action={formActionBasicInfo}>
                {/**
                 * Agregar h5 para describir que se agregara aqui...
                 */}
                <label className="-top-7 relative z-20 bg-jungle-green-200 rounded p-1 shadow"  >Basic information</label>
                <InputField placeholder="John" label="Name" name="first_name" defaultValue={userInfo.first_name} />
                <InputField placeholder="Doe" label="Lastname" name="last_name" defaultValue={userInfo.last_name} />
                <InputField placeholder="+17863036228" label="Phone number" name="phone" defaultValue={userInfo.phone} />
                <InputField placeholder="jhon.doe@mydomain.com" label="Email" name="email" defaultValue={userInfo.email} />
                {/* {stateBasicInfo.message && <div className={clsx("p-2 w-full rounded mb-3", stateBasicInfo.error ? "bg-red-500" : "bg-jungle-green-400")}><p className={clsx("font-sm text-white")}>
                    <i className={clsx('bx font-bold', stateBasicInfo.error ? "bx-error" : "bx-check")}></i> {stateBasicInfo.message}
                </p></div>} */}
                <div className="flex justify-end w-full">
                    <Button type="submit" className="rounded bg-jungle-green-400 hover:bg-jungle-green-500 text-white"> Save Info</Button>
                </div>
            </form>
            <form className="border border-jungle-green-200 rounded p-4 mt-10">
                <label className="-top-7 relative z-20 bg-jungle-green-200 rounded p-1 shadow" >Address information</label>
                <InputField placeholder="United States" label="Country" name="country" />
                <InputField placeholder="New York" label="City" name="city" />
                <InputField placeholder="Green Av. 123" label="Address" name="address" />
                <div className="flex justify-end w-full">
                    <Button type="submit" className="rounded bg-jungle-green-400 hover:bg-jungle-green-500 text-white"> Save Address</Button>
                </div>
            </form>
            <form className="border border-jungle-green-200 rounded p-4 mt-10">
                <label className="-top-7 relative z-20 bg-jungle-green-200 rounded p-1 shadow" >My Goals</label>
                <InputField placeholder="Describe your first goal here..." label="Goal 1" name="goal" />
                <InputField placeholder="Describe your second goal here..." label="Goal 2" name="goal" />
                <InputField placeholder="Describe your third goal here..." label="Goal 3" name="goal" />
                <div className="flex justify-end w-full">
                    <Button type="submit" className="rounded bg-jungle-green-400 hover:bg-jungle-green-500 text-white"> Save Goals</Button>
                </div>
            </form>
        </div>
    )
}