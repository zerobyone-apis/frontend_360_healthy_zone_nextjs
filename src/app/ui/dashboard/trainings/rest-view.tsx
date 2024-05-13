"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../../button";
import { useSound } from "use-sound";

type Props = {
    restInSeconds: number;
    setCurrentIndex: React.SetStateAction<any>;
    nextExercise: any;
}

export default function RestView({ restInSeconds, setCurrentIndex, nextExercise }: Props) {
    let timer = 0;
    // const [nextExerciseAudio] = useSound("/audios/training/next_exercise_will_start.mp3");
    const nextExerciseAudio = new Audio("/audios/training/next_exercise_will_start.mp3");
    const [timeLeft, setTimeLeft] = useState(Number(restInSeconds));

    useEffect(() => {

        let timerout = setTimeout(() => {
            if (timeLeft <= 0) {
                clearTimeout(timer);
                setCurrentIndex((state: any) => state + 1);
            }
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => {
            clearTimeout(timerout)
            nextExerciseAudio.pause()
        }
    }, [timeLeft])

    useEffect(() => {
        //ejecuto audio inicial;
        setTimeout(() => { nextExerciseAudio.play() }, 2000);
        return () => {
            nextExerciseAudio.pause()
        }
    }, []);

    function handleGoAhead() {
        setCurrentIndex((state: number) => state + 1);
        nextExerciseAudio.pause();
    }

    function handleAddSeconds() {
        setTimeLeft((state: number) => state + 15);
    }

    return (
        <div className="h-full p-4 rounded w-full bg-jungle-green-500 flex justify-center flex-col items-center gap-3 overflow-auto" aria-labelledby="drawer-label">
            <h1 className="text-4xl font-bold text-white text-center capitalize">{nextExercise.name}</h1>
            <h5 className="text-xl text-white">{nextExercise.duration_in_seconds ? nextExercise.duration_in_seconds + " seconds" : nextExercise.repetitions + " reps, " + nextExercise.series + " sets"}</h5>
            <Image src={nextExercise.gifUrl || ""} alt={''} width={318} height={159} className="rounded"></Image>
            <h2 className="text-white text-3xl font-bold">Starts on {timeLeft}</h2>
            <div className="flex gap-3">
                <Button onClick={handleAddSeconds} className="text-white border border-white rounded">+15 Seconds</Button>
                <Button onClick={handleGoAhead} className="text-jungle-green-500 bg-white rounded">Go ahead!</Button>
            </div>
        </div>
    )
}