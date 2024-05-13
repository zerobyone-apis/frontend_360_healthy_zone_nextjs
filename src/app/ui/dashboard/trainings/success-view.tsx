"use client"
import React, { useEffect } from 'react'
import { useRouter } from "next/navigation";
import { Button } from '../../button'
import Confetti from "react-confetti"
import useWindowSize from "react-use/lib/useWindowSize";

type Props = {}

export default function SuccessView() {
    const { width, height } = useWindowSize();
    const router = useRouter();
    const congratsSoundEffect = new Audio("/audios/training/congrats_music.mp3")
    useEffect(() => {
        congratsSoundEffect.play();
        return () => {
            congratsSoundEffect.pause();
        }
    });

    return (
        <div className="h-full p-4 rounded bg-jungle-green-500 w-full flex justify-center flex-col items-center gap-3 overflow-auto" aria-labelledby="drawer-label">
            <Confetti width={width} height={height} recycle={false} />
            <h1 className='text-3xl text-white font-bold animate-bounce'>WELL DONE!</h1>
            <h2 className='text-xl text-white font-thin'>Training completed successfuly</h2>
            <h5 className='text-lg text-white font-bold'>Continue tomorrow for more exercises</h5>
            <div className="flex gap-3">
                <Button onClick={() => router.push("/dashboard/trainings")} className="text-jungle-green-500 bg-white rounded gap-2 font-bold">
                    <i className='bx bxs-left-arrow' />
                    <span className='font-bold'>Trainings</span>
                </Button>
            </div>
        </div>
    )
}