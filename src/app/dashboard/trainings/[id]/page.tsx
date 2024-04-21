"use client"
import { getTrainingsID } from "@/actions/trainings";
import { Button } from "@/app/ui/button";
import ExercisesTimeline from "@/app/ui/dashboard/trainings/exercises-timeline";
import TimeLineDays from "@/app/ui/dashboard/trainings/timeline-days";
import TrainingDifficultyCard from "@/app/ui/dashboard/trainings/training-difficulty-card";
import { DayExercisesStatus } from "@/interfaces/trainings";
import { trainings } from "@/actions/trainings/mockup";

export default async function Page({ params }: { params: { id: string } }) {
    const training = await getTrainingsID(Number(params.id));
    return (
        <>
            <div className="grid grid-cols-4 gap-3">
                <div className="col-span-4">
                    <TimeLineDays exercises={[
                        { number_of_day: 1, status: DayExercisesStatus.READY },
                        { number_of_day: 2, status: DayExercisesStatus.READY },
                        { number_of_day: 3, status: DayExercisesStatus.READY },
                        { number_of_day: 4, status: DayExercisesStatus.OMMITED },
                        { number_of_day: 5, status: DayExercisesStatus.IN_PROGRESS },
                        { number_of_day: 6, status: DayExercisesStatus.PENDING },
                        { number_of_day: 7, status: DayExercisesStatus.PENDING },
                        { number_of_day: 8, status: DayExercisesStatus.PENDING },
                    ]} />
                </div>
                <div className="col-span-4">
                    <h3 className="font-sans font-bold text-center text-xl">
                        {training?.type}
                    </h3>
                    <h5 className="font-sans font-thin text-center">
                        {training?.description_training}
                    </h5>
                </div>
                <div className="col-span-4 md:col-span-1">
                    <TrainingDifficultyCard days_remaining={20} difficulty={3} />
                </div>
                <div className="col-span-4 md:col-span-3">
                    <ExercisesTimeline exercises={trainings} />
                </div>

            </div>
            <div className="w-full flex justify-center">
                <Button className="bg-teal-500 rounded text-white hover:bg-jungle-green-400 fixed md:bottom-4 bottom-20 font-sans font-bold gap-1">
                    <i className='bx bx-play text-2xl'></i>START TRAINING
                </Button>
            </div>
        </>
    )
}