import { Card } from "../card";


export function AboutUS() {
    return (
        <section className="h-full min-h-full w-full p-6 relative" >
            <div className="text-center">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-jungle-green-700">BENEFITS</h2>
                <p className="mb-5 font-light text-gray-500 sm:text-xl">YOUR LIFE MORE HEALTHY</p>
            </div>
            <div className="md:columns-3 sm:columns-1 gap-8 w-full justify-around p-5">
                <Card title="Meet Our Nutrition Specialists" img="/svgs/girl-2.svg" description="Our dedicated team of experienced nutritionists is here to guide you on your journey to a healthier lifestyle. They'll help you achieve your nutritional goals, one meal at a time."></Card>
                <Card title="Personalized Training Coaches" img="/svgs/girl-3.svg" description="Our certified fitness coaches are committed to tailoring workout plans to your unique needs and goals. Get ready to unlock your full potential with the support of our trainers."></Card>
                <Card title="Your Wellness Companions" img="/svgs/man-1.svg" description="We're more than just an app – we're your partners in health and fitness. Connect with our experts, and together, let's embark on a journey to a better, healthier you."></Card>
            </div>
        </section>
    )
}