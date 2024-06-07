"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { clsx } from "clsx";
import { SetStateAction, useEffect, useState } from "react";
import { Button } from "../button";
import ExercisesTimeline from "../dashboard/trainings/exercises-timeline";
import { getExerciseDay } from "@/actions/trainings";
import { TrainingGeneratorSection } from "./training-generator-section";

export default function CreateTrainingModal() {
    const searchParams = useSearchParams();
    const modal = searchParams.get("new-training");
    const pathname = usePathname();
    const [step, setStep] = useState(1);
    const [amountDays, setAmountDays] = useState(1);
    const [descriptionObj, setDescriptionObj] = useState({
        description_training: "",
        type: "",
        coach_plan: ""
    });
    const [training, setTraining] = useState(null)
    // button next disabled here:
    const [disabled, setDisabled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (modal) setStep(1);
    }, [modal]);


    //step checker 
    useEffect(() => {
        if (step === 2 && (!descriptionObj.coach_plan || !descriptionObj.description_training || !descriptionObj.type)) {
            //disabled button temporaly until the training data will ok
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [step, descriptionObj])

    function handleNext() {
        if (step === 3) {
            //fetch save
            return router.push(pathname);
        }

        setStep((state) => ++state);

    }

    function handlePrevious() {
        setStep((state) => --state);
    }

    function handleDayChange(day: number) {
        setAmountDays(day);
    }



    if (!modal) return null;
    return (
        <>
            <dialog
                className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
                <div className="bg-white m-auto p-8 rounded">
                    <div className="flex flex-col items-center h-full">
                        <Stepper step={step} />
                        <section className="h-full h-max-screen overflow-auto w-full">
                            {step == 1 && <SelectDays handleDay={handleDayChange} />}

                            {/* 
                            {
                    //DEFINIR ESTOS DATOS PARA CADA EJERCICIO
                    "name": "Pecho inclinado con mancuernas",
                    "type": "PECHO",
                    "url_image": "....",
                    "description": "Al realizar este ejercicio vamos a trabajar los pectorales",
                    "series": 3,
                    "repetitions": 15,
                    "duration_in_seconds": 120,
                    "rest_in_seconds": 30,
                    "difficulty": 1,
                    "is_completed": false,
                    "created_on": null,
                    "updated_on": null
                }
                 */}
                            {step == 2 && <DescriptionTrainingSection setDescriptionObj={setDescriptionObj} descriptionObj={descriptionObj} />}
                            {step == 3 && <TrainingGeneratorSection
                                amount_days={amountDays}
                                training_description={descriptionObj}
                                setter={setTraining}
                                global_state={training}
                            />}
                        </section>
                        <div className="flex gap-2">
                            <Link href={pathname} >
                                <Button className="border border-red-360-500 text-red-360-500 p-2 rounded">Cancel</Button>
                            </Link>
                            {step > 1 &&
                                <Button onClick={handlePrevious} className="border border-android-green-500 p-2 rounded text-android-green-500">
                                    <i className='bx bxs-left-arrow'></i> Previous
                                </Button>}
                            <Button onClick={handleNext} className="bg-jungle-green-500 p-2 rounded text-white" disabled={disabled}>
                                {step !== 3 ? "Next" : <><i className='bx bxs-check-circle pr-1'></i> Create</>}
                            </Button>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}

function Stepper({ step }: { step: number; }) {
    const steps = [{ id: 1, title: "Amount of days" }, { id: 2, title: "Description" }, { id: 3, title: "Set training" }]
    return (
        <ol className="flex items-center justify-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">
            {steps.map((s, index) => {
                return (
                    <li key={s.id} className={clsx("flex items-center", s.id === step && "text-blue-600 ")}>
                        <span className={clsx("flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0", s.id === step && "border-blue-600")}>
                            {s.id}
                        </span>
                        {s.title}
                        {index !== steps.length - 1 &&
                            <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                            </svg>
                        }
                    </li>
                )
            })}
        </ol>
    )
}

function SelectDays({ limit = 30, handleDay }: { limit?: number, handleDay: any }) {
    const [day, setDay] = useState(1);

    useEffect(() => {
        handleDay(day);
    }, [day]);

    const handleIncrement = () => {
        if (day == 30) return null;
        setDay((state) => ++state)
    }

    const handleDecrement = () => {
        if (day == 1) return null;
        setDay((state) => --state)
    }
    return (
        <form className="max-w-xs mx-auto flex justify-center flex-col items-center p-5">
            {/* 
           - AGREGAR FREQUENCY (input string); placeholder >> 3 by week 
            - INIT ON (input date); value today, required; 
            */}
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose days amount:</label>
            <div className="relative flex items-center max-w-[8rem]">
                <button onClick={handleDecrement} type="button" data-input-counter-decrement="quantity-input" className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none" disabled={day === 1}>
                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                    </svg>
                </button>
                <input type="text" value={day}
                    disabled
                    className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 "
                    placeholder="15" required />
                <button onClick={handleIncrement} type="button" data-input-counter-increment="quantity-input" className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none" disabled={day === limit}>
                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                    </svg>
                </button>
            </div>
            <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Days amount between 1 and {limit}</p>
        </form>
    )
}

function DescriptionTrainingSection({ setDescriptionObj, descriptionObj }: {
    setDescriptionObj: SetStateAction<any>, descriptionObj: {
        description_training: string;
        type: string;
        coach_plan: string;
    }
}) {

    return (
        <section className="w-full p-5 h-full overflow-auto">
            <form className="gap-5 flex flex-col">
                <div >
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*Select a plan</label>
                    <select required value={descriptionObj.coach_plan} onChange={(e) => setDescriptionObj({ ...descriptionObj, coach_plan: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value={""}>Select a coach plan</option>
                        <option value={"MUSCLE"}>Muscle</option>
                        <option value={"RITMIA"}>Ritmia</option>
                        <option value={"HIPERTROFIA"}>Hipertrofia</option>
                        <option value={"NOT_APPLY"}>Not apply</option>
                    </select>
                </div>
                <div >
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*Select a type</label>
                    <select required value={descriptionObj.type} onChange={(e) => setDescriptionObj({ ...descriptionObj, type: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value={""}>Select a training type</option>
                        <option value={"LOSE_WEIGHT"}>Lose weight</option>
                        <option value={"INCREASE_MASS_MUSCLE"}>Increse mass muscle</option>
                        <option value={"LOSE_WEIGHT_HEALTHY_HABITS"}>Lose weight (healthy habits)</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*Training Description</label>
                    <textarea onInput={(e) => setDescriptionObj({ ...descriptionObj, description_training: e.target.value })} id="description" rows={4} value={descriptionObj.description_training}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your training description here..."></textarea>
                </div>
            </form>
        </section >
    )
}