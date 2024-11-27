"use client"
import { getDietByID } from "@/actions/diets/get-diet-bt-id";
import { Button } from "@/app/ui/button";
import DefaultCard from "@/app/ui/dashboard/default-card";
import HorizontalTimeline from "@/app/ui/dashboard/horizontal-timeline";
import { DietResponseDTO } from "@/interfaces/diets";
import { DietResumeCardStyles } from "@/use-cases/diets-styles";
import clsx from "clsx";
import { Timeline } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiCalendar, HiFlag } from "react-icons/hi2";
import { toast } from "react-toastify";

export default async function Page({ params }: { params: { id: string } }) {
    const [diet, setDiet] = useState<DietResponseDTO>();
    useEffect(() => {
        getDietByID(params.id).then((data) => {
            setDiet(data)
        }).catch(() => {
            toast.error("Something went wrong loading the data");
        })
    }, [])

    const status = diet?.diet_status === "CREATED" ? "WAITING FOR START" : diet?.diet_status || "NOT APPLY";
    return (
        <>
            <div className="flex flex-col items-center">
                <div className="text-center">
                    <h4 className="text-3xl font-bold text-gray-700 font-sans">{diet?.type.replaceAll("_", " ")}</h4>
                    <h5 className="text-lg text-gray-600 font-sans max-w-[790px]">{diet?.description_diet}</h5>
                </div>
                <label className={clsx("p-1 rounded ", DietResumeCardStyles[diet?.diet_status || "NOT APPLY"].label)}>
                    <p className={clsx('font-bold', DietResumeCardStyles[diet?.diet_status || "NOT APPLY"].labelText)}>{status}</p>
                </label>
                <div className="mt-4 ml-6 w-full justify-center flex">
                    <Timeline horizontal>
                        <Timeline.Item>
                            <Timeline.Point icon={HiCalendar} />
                            <Timeline.Content>
                                <Timeline.Time>{diet?.init_on.split(" ")[0]}</Timeline.Time>
                                <Timeline.Title>Start diet</Timeline.Title>
                            </Timeline.Content>
                        </Timeline.Item>
                        <Timeline.Item>
                            <Timeline.Point icon={HiFlag} />
                            <Timeline.Content>
                                <Timeline.Time>{diet?.end_on.split(" ")[0]}</Timeline.Time>
                                <Timeline.Title>Finish diet</Timeline.Title>
                            </Timeline.Content>
                        </Timeline.Item>
                    </Timeline>
                </div>
                <div className="grid grid-cols-2 w-full p-4 gap-2">
                    <DefaultCard classes="col-span-2 md:col-span-2" titleClasses="text-jungle-green-700 mb-2 text-2xl font-bold tracking-tight" title="Recipes" body={diet?.healthy_recipes || "No content"} />
                    <DefaultCard classes="col-span-2 md:col-span-1" titleClasses="text-jungle-green-700 mb-2 text-2xl font-bold tracking-tight" title="Shopping list" body={diet?.healthy_shopping_list || "No content"} />
                    <DefaultCard classes="col-span-2 md:col-span-1" titleClasses="text-jungle-green-700 mb-2 text-2xl font-bold tracking-tight" title="Portion size guide" body={diet?.portion_size_guide || "No content"} />
                    <DefaultCard classes="col-span-2 md:col-span-1" titleClasses="text-jungle-green-700 mb-2 text-2xl font-bold tracking-tight" title="Balanced Meal Plan" body={diet?.balanced_meal_plan || "No content"} />
                    <DefaultCard classes="col-span-2 md:col-span-1" titleClasses="text-jungle-green-700 mb-2 text-2xl font-bold tracking-tight" title="Hydratation" body={diet?.hydratation || "No content"} />
                    <DefaultCard
                        classes="col-span-2 md:col-span-2 border-blue-300 border-5 bg-blue-100 border-l-8"
                        titleClasses="text-blue-800 mb-2 text-2xl font-bold tracking-tight"
                        bodyClasses="text-blue-900 whitespace-pre-line"
                        title="Tips!"
                        body={diet?.tips_for_change_eating_habits || "No content"} />
                    <DefaultCard
                        classes="col-span-2 md:col-span-2 border-violet-300 border-5 bg-violet-100 border-l-8"
                        titleClasses="text-violet-800 mb-2 text-2xl font-bold tracking-tight"
                        bodyClasses="text-violet-900 whitespace-pre-line" title="Food Education" body={diet?.food_education || "No content"} />
                    <DefaultCard classes="col-span-2 md:col-span-2 border-teal-300 border-5 bg-teal-100 border-l-8"
                        titleClasses="text-teal-800 mb-2 text-2xl font-bold tracking-tight"
                        bodyClasses="text-teal-900 whitespace-pre-line" title="Nutrition information" body={diet?.nutrition_information || "No content"} />
                </div>
            </div>
            <div className="w-full flex justify-center">
                <Button className="bg-jungle-green-500 rounded text-white hover:bg-jungle-green-400 fixed md:bottom-4 bottom-20 font-sans font-bold gap-1">
                    <i className='bx bxs-flag-checkered text-2xl'></i>MARK AS COMPLETED
                </Button>
            </div>
        </>
    )
}