/* eslint-disable react/react-in-jsx-scope */
import { PricingCard } from "../pricingCard";

interface Card {
    price: number;
    title: string;
    description: string;
    plan_id: string;
    features: Feature[];
    main?: boolean;
}

interface Feature {
    title: string;
    description?: string;
}

export function Pricing() {

    const pricingCardList: Card[] = [
        {
            title: "Basic Plan",
            price: 45,
            plan_id: "P-3NV09174PT820634WM2UXFRQ",
            description: "Your starting point for a healthier life",
            features: [
                {
                    title: "24/7 platform access",
                },
                {
                    title: "Customized plan",
                },
                {
                    title: "Expert advice",
                },
                {
                    title: "Limited communication",
                },
                {
                    title: "Monthly adjustments",
                }
            ],
        },
        {
            title: "Standard plan",
            price: 78,
            plan_id: "P-3Y5450704F819784LM34N5OQ",
            description: "For those looking for a comprehensive approach and constant follow-up",
            main: true,
            features: [
                {
                    title: "All benefits of the Basic Plan"
                },
                {
                    title: "Combined diet and training plans:",
                    description: "Receive a comprehensive plan that combines both nutrition and physical training adapted to your specific goals."
                },
                {
                    title: "Access to visual resources"
                },
                {
                    title: "Continuous follow-up",
                },
                {
                    title: "Bi-weekly adjustments"
                },
            ]
        },
        {
            title: "Premium Plan",
            price: 99,
            plan_id: "P-26B69100AR840883XM35QS5I",
            description: "The ultimate health and well-being experience",
            features: [
                {
                    title: "All benefits of the Standard Plan",
                },
                {
                    title: "Real-time support",
                },
                {
                    title: "Exclusive access",
                },
                {
                    title: "Holistic wellness plans",
                    description: " (tips on sleep, stress management, and healthy habits, etc..)"
                },
                {
                    title: "Adjustment every 10 days",
                },
            ]
        }
    ]

    return (
        <section className="bg-white dark:bg-gray-900 h-full relative" id="pricing">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Plans</h2>
                    <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Choose a plan thats right far your fitness life. Simple pricing & No hidden charges.</p>
                </div>

                <div className="space-y-9 lg:grid lg:grid-cols-3 sm:gap-6 md:gap-0  md:space-y-0 md:items-center">
                    {pricingCardList.map((card, index) =>
                        <div key={index}>
                            <PricingCard title={card.title} description={card.description} price={card.price} features={card.features} main={card.main || false} plan_id={card.plan_id} />
                        </div>
                    )}

                </div>
            </div>
        </section>
    )
}