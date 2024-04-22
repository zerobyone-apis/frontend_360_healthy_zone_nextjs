"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../../button";
import { useSound } from "use-sound";

type Props = {
    exercise: any;
    setCurrentIndex: React.SetStateAction<any>;
}

export default function TrainingView({ setCurrentIndex, exercise }: Props) {
    let timer = 0;
    const router = useRouter();
    const [halfTimeSound] = useSound("/audios/training/half_time_keep_working.mp3");
    const [timeLeft, setTimeLeft] = useState(exercise.duration_in_seconds || 0);

    useEffect(() => {
        let timerout: any = null;
        if (exercise.duration_in_seconds) {
            timerout = setTimeout(() => {
                if (timeLeft <= 0) {
                    clearTimeout(timer);
                    console.log("Finish timer")
                    setCurrentIndex((state: any) => state + 1);
                }
                setTimeLeft(timeLeft - 1);
            }, 1000);
        }
        return () => {
            if (timerout) clearTimeout(timerout);
        }
    }, [timeLeft])

    useEffect(() => {
        //ejecuto audio inicial;
        setTimeout(() => { halfTimeSound() }, exercise.duration_in_seconds * 1000 / 2 || 0)
    }, [])

    return (
        <div className="h-full p-4 rounded w-full flex justify-center flex-col items-center gap-3 overflow-auto" aria-labelledby="drawer-label">
            <h1 className="text-2xl font-bold text-gray-900 text-center capitalize">{exercise.name}</h1>
            <h5 className="text-3xl text-jungle-green-500 font-bold">{exercise.duration_in_seconds ? exercise.duration_in_seconds + " seconds" : exercise.repetitions + " reps, " + exercise.series + " sets"}</h5>
            <Image src={exercise.gifUrl || ""} alt={''} width={318} height={159} className="rounded border border-jungle-green-500"></Image>
            {timeLeft ?
                <h2 className="text-gray-900 text-3xl font-bold">Time left: <span className="text-jungle-green-500">{timeLeft}</span></h2>
                :
                <h2 className="text-gray-900 text-xl font-bold text-center">Finish all the sets and press done</h2>}
            <div className="flex gap-3">
                <Button onClick={() => router.push("/dashboard/trainings")} className="text-gray-900 border border-jungle-green-500 rounded">Need a break</Button>
                <Button onClick={() => setCurrentIndex((state: number) => state + 1)} className="text-white bg-jungle-green-500 rounded">READY</Button>
            </div>
        </div>
    )
}