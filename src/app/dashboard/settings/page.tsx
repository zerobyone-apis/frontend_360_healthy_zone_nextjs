'use client'
import { saveBasicInfo } from "@/actions/dashboard/settings/settingsActions";
import { Button } from "@/app/ui/button";
import InputField from "@/app/ui/input";
import Cookies from "js-cookie";
import { useFormState } from "react-dom";

export default function Page() {
    const cookie = Cookies
    const userInfo = JSON.parse(cookie.get('user') || "{}");
    console.log(userInfo);
    // const [stateBasicInfo, formActionBasicInfo] = useFormState(saveBasicInfo, { message: null })

    return (
        <div>
            <form className="border border-jungle-green-200 rounded p-4 mt-10" >
                {/**
                 * Agregar h5 para describir que se agregara aqui...
                 */}
                <label className="-top-7 relative z-20 bg-jungle-green-200 rounded p-1 shadow"  >Basic information</label>
                <InputField placeholder="John" label="Name" name="first_name" value={userInfo.client.first_name} />
                <InputField placeholder="Doe" label="Lastname" name="last_name" value={userInfo.client.last_name} />
                <InputField placeholder="+17863036228" label="Phone number" name="phone" value={userInfo.client.phone} />
                <InputField placeholder="jhon.doe@mydomain.com" label="Email" name="email" value={userInfo.client.email} />
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