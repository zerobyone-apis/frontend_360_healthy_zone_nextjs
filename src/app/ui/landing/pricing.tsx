import { PricingCard } from "../pricingCard";

interface Card {
    price: number;
    title: string;
    description: string;
    features: Feature[];
}

interface Feature {
    title: string;
    description?: string;
}

export function Pricing() {

    const pricingCardList: Card[] = [
        {
            title: "Basic Plan",
            description: "Nutrition or Coach Access Only",
            price: 20,
            features: [
                {
                    title: "Monthly session with a nutritionist or coach ",
                    description: "(choose one)"
                },
                {
                    title: "Customized meal or workout plan",
                },
                {
                    title: "Weekly progress tracking via app",
                },
                {
                    title: "Exclusive nutrition or fitness tips and articles",
                }
            ]
        },
        {
            title: "Standard plan",
            description: "Access to Both Nutrition and Coach",
            price: 35,
            features: [
                {
                    title: "All benefits of the Basic Plan"
                },
                {
                    title: "Monthly sessions with both a nutritionist and a coach",
                },
                {
                    title: "Combined customized meal and workout plans "
                },
                {
                    title: "Access to online support groups and community",
                },
                {
                    title: "Monthly progress analysis with personalized reports"
                }
            ]
        },
        {
            title: "Premium Plan",
            description: "Full Access + Exclusive Benefits",
            price: 20,
            features: [
                {
                    title: "All benefits of the Standard Plan",
                },
                {
                    title: "Bi-monthly sessions with nutritionists and coaches",
                },
                {
                    title: "Access to exclusive webinars and workshops",
                },
                {
                    title: "Special programs ",
                    description: "(weight loss, muscle building, etc.)"
                },
                {
                    title: "Discounts on associated products and additional services",
                },
                {
                    title: "Priority support and long-term goal planning"
                }
            ]
        }
    ]

    return (
        <section className="bg-white dark:bg-gray-900 h-full relative" id="pricing">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Choose the best plans</h2>
                    <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Choose a plan thats right far your fitness life. Simple pricing & No hidden charges.</p>
                </div>
                <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">

                    {pricingCardList.map((card, index) => <PricingCard key={index} title={card.title} description={card.description} price={card.price} features={card.features} />)}

                </div>
            </div>
        </section>
    )
}