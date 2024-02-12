import { Button } from "@/app/ui/button";
import InputField from "@/app/ui/input";

export default function Page() {
    return (
        <div>
            <div className="border border-jungle-green-200 rounded p-4 mt-10">
                <label className="-top-7 relative z-20 bg-jungle-green-200 rounded p-1 shadow"  >Basic information</label>
                <InputField placeholder="John" label="Name" name="name" />
                <InputField placeholder="Doe" label="Lastname" name="lastname" />
                <InputField placeholder="+17863036228" label="Phone number" name="phone" />
                <InputField placeholder="jhon.doe@mydomain.com" label="Email" name="email" disabled={true} />
                <div className="flex justify-end w-full">
                    <Button className="rounded bg-jungle-green-400 hover:bg-jungle-green-500 text-white"> Save Info</Button>
                </div>
            </div>
            <div className="border border-jungle-green-200 rounded p-4 mt-10">
                <label className="-top-7 relative z-20 bg-jungle-green-200 rounded p-1 shadow" >Address information</label>
                <InputField placeholder="United States" label="Country" name="country" />
                <InputField placeholder="New York" label="City" name="city" />
                <InputField placeholder="Green Av. 123" label="Address" name="address" />
                <div className="flex justify-end w-full">
                    <Button className="rounded bg-jungle-green-400 hover:bg-jungle-green-500 text-white"> Save Address</Button>
                </div>
            </div>
            <div className="border border-jungle-green-200 rounded p-4 mt-10">
                <label className="-top-7 relative z-20 bg-jungle-green-200 rounded p-1 shadow" >My Goals</label>
                <InputField placeholder="Describe your first goal here..." label="Goal 1" name="goal" />
                <InputField placeholder="Describe your second goal here..." label="Goal 2" name="goal" />
                <InputField placeholder="Describe your third goal here..." label="Goal 3" name="goal" />
                <div className="flex justify-end w-full">
                    <Button className="rounded bg-jungle-green-400 hover:bg-jungle-green-500 text-white"> Save Goals</Button>
                </div>
            </div>
        </div>
    )
}