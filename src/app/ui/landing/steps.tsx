
"use client";

import { Button, Timeline } from "flowbite-react";
import { useRouter } from "next/navigation";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";
import { HiUserPlus, HiQueueList } from "react-icons/hi2";


export function Steps() {
    const router = useRouter();

    const handleSignup = () => {
        router.push("/signup")
    }

    const handlePlans = () => {
        router.push("#pricing")
    }

    return (
        <section className="min-h-full h-screen w-full p-6 relative flex items-center flex-col justify-center gap-2" id="about-us">
            <h2 className="mb-10 text-4xl tracking-tight font-extrabold text-jungle-green-700">Three Simple Steps</h2>
            <Timeline>
                <Timeline.Item>
                    <Timeline.Point icon={HiUserPlus} />
                    <Timeline.Content>
                        <Timeline.Title>Sign up</Timeline.Title>
                        <Timeline.Body>
                            Create your account and access our platform.
                        </Timeline.Body>
                        <Button color="gray" onClick={handleSignup}>
                            Registration
                            <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                        </Button>
                    </Timeline.Content>
                </Timeline.Item>
                <Timeline.Item>
                    <Timeline.Point icon={HiQueueList} />
                    <Timeline.Content>
                        <Timeline.Title>Select your plan</Timeline.Title>
                        <Timeline.Body>
                            Select a plan that best fits your goals.
                        </Timeline.Body>
                        <Button color="gray" onClick={handlePlans}>
                            See Plans
                            <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                        </Button>
                    </Timeline.Content>
                </Timeline.Item>
                <Timeline.Item>
                    <Timeline.Point
                        icon={HiCalendar}
                    />
                    <Timeline.Content>
                        <Timeline.Title>Get Connected and Get Started</Timeline.Title>
                        <Timeline.Body>
                            Receive your personalized plan and start your transformation to a healthy life.
                        </Timeline.Body>
                    </Timeline.Content>
                </Timeline.Item>
            </Timeline>
        </section>
    );
}
