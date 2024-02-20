import { Button } from "../button";

export function PlanOfferCard() {
    return (
        <div className="w-full h-full text-white bg-android-green-500 rounded-3xl p-2 bg-[url('/imgs/girl-with-gym.jpeg')] bg-center bg-no-repeat bg-cover flex justify-around flex-col">
            <div className="p-3">
                <h4 className="text-xl text-jungle-green-100">Try Premium</h4>
                <h5 className="text-lg text-android-green-200">and Discover all the benefits</h5>
                <p className="text-sm text-jungle-green-100">Still healthy!</p>
            </div>
            <div className="flex justify-center">
                <Button className="bg-jungle-green-500 rounded">Try now</Button>
            </div>
        </div>
    )
}