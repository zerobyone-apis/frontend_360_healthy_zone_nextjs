import { Button } from "@/app/ui/button";
import DefaultCard from "@/app/ui/dashboard/default-card";
import HorizontalTimeline from "@/app/ui/dashboard/horizontal-timeline";
import { DietResumeCardStyles } from "@/use-cases/diets-styles";
import clsx from "clsx";

export default async function Loading() {

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="text-center animate-pulse">
                    <div className="h-8 bg-gray-200 rounded-full w-[250px] mb-4"></div>
                    <div className="h-5 bg-gray-200 rounded-full w-full mb-4"></div>
                    <span className="sr-only">Loading...</span>
                </div>
                <label className={clsx("p-1 rounded ", DietResumeCardStyles["IN PROGRESS"].label)}>
                    <div className="h-3 bg-gray-200 rounded-full  w-[100px] mb-4"></div>
                </label>
                <div className="mt-4 ml-6">
                    <HorizontalTimeline
                        init_on={<div className="h-3 bg-gray-200 rounded-full  w-[25px] mb-4"></div>}
                        end_on={<div className="h-3 bg-gray-200 rounded-full  w-[25px] mb-4"></div>} />
                </div>
                <div className="grid grid-cols-2 w-full p-4 gap-2">
                    <DefaultCard classes="col-span-2 md:col-span-2"
                        titleClasses="text-jungle-green-700 mb-2 text-2xl font-bold tracking-tight"
                        title="Recipes"
                        body={<div className="h-2 bg-gray-200 rounded-full w-full mb-4 max-w-50"></div>} />
                    <DefaultCard classes="col-span-2 md:col-span-1"
                        titleClasses="text-jungle-green-700 mb-2 text-2xl font-bold tracking-tight"
                        title="Shopping list"
                        body={<div className="h-2 bg-gray-200 rounded-full w-full mb-4"></div>} />
                    <DefaultCard classes="col-span-2 md:col-span-1"
                        titleClasses="text-jungle-green-700 mb-2 text-2xl font-bold tracking-tight"
                        title="Portion size guide"
                        body={<div className="h-2 bg-gray-200 rounded-full w-full mb-4"></div>} />
                    <DefaultCard classes="col-span-2 md:col-span-1"
                        titleClasses="text-jungle-green-700 mb-2 text-2xl font-bold tracking-tight"
                        title="Balanced Meal Plan"
                        body={<div className="h-2 bg-gray-200 rounded-full w-full mb-4"></div>} />
                    <DefaultCard classes="col-span-2 md:col-span-1"
                        titleClasses="text-jungle-green-700 mb-2 text-2xl font-bold tracking-tight"
                        title="Hydratation"
                        body={<div className="h-2 bg-gray-200 rounded-full w-full mb-4"></div>} />
                    <DefaultCard
                        classes="col-span-2 md:col-span-2 border-blue-300 border-5 bg-blue-100 border-l-8"
                        titleClasses="text-blue-800 mb-2 text-2xl font-bold tracking-tight"
                        bodyClasses="text-blue-900 whitespace-pre-line"
                        title="Tips!"
                        body={<div className="h-2 bg-gray-200 rounded-full w-full mb-4"></div>} />
                    <DefaultCard
                        classes="col-span-2 md:col-span-2 border-violet-300 border-5 bg-violet-100 border-l-8"
                        titleClasses="text-violet-800 mb-2 text-2xl font-bold tracking-tight"
                        bodyClasses="text-violet-900 whitespace-pre-line" title="Food Education"
                        body={<div className="h-2 bg-gray-200 rounded-full w-full mb-4"></div>} />
                    <DefaultCard classes="col-span-2 md:col-span-2 border-teal-300 border-5 bg-teal-100 border-l-8"
                        titleClasses="text-teal-800 mb-2 text-2xl font-bold tracking-tight"
                        bodyClasses="text-teal-900 whitespace-pre-line" title="Nutrition information"
                        body={<div className="h-2 bg-gray-200 rounded-full w-full mb-4"></div>} />
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