import { Button } from "../button";
import Logo from "@/ui/svgs/logo-360-healthy-zone.svg"

export function Hero() {
    return (
        <section className='h-screen max-h-full w-full relative'>
            <video
                muted
                loop
                autoPlay
                className="absolute -top-2 left-0 min-w-full min-h-full -z-50 object-cover"
            >
                <source src='/videos/hero_video.webm' type="video/webm" />
            </video>

            <div className="w-full py-10 px-0 flex flex-col justify-center h-full items-center">

                <div className="w-[90%] m-auto flex flex-col items-center gap-10">
                    <div>
                        <Logo width="none" className="text-6xl"></Logo>
                    </div>
                    <h1 className="text-center sm:text-start text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-loose mb-4 tracking-tight font-extrabold text-jungle-green-400">
                        Unlock Your Path to Wellness
                    </h1>
                    <p className="text-android-green-50 text-xl font-light">Connect with Expert Nutritionists and Trainers through Our Web Application for a Healthier, Balanced Life.</p>
                    <Button className="bg-jungle-green-500 rounded uppercase">Registration here</Button>
                </div>
            </div>
        </section>
    )
}