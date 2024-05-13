"use client"
import React from 'react'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'
import Link from 'next/link'
import { Button } from '../../button'
import { TrainingResponseDto } from '@/interfaces/trainings'
import { TrainingResumeCardStyles } from '@/use-cases/trainings-styles'


export default function TrainingResumeCard({ training }: { training: TrainingResponseDto }) {
    const trainingObjectStyles = TrainingResumeCardStyles;
    return (
        <Link href={{
            pathname: "/dashboard/trainings/" + training.training_id
        }}
            className={twMerge(clsx("flex-grow border-l-8 rounded-md px-3 py-2 w-full bg-slate-50",
                trainingObjectStyles[training.training_status].card,
            ))}>
            {training.type}
            <div className=" pt-1 flex flex-col items-start gap-2">
                <span className='font-thin text-sm'>{training.description_training}</span>
                <div className='flex justify-between w-full'>
                    <label className={twMerge(clsx("p-1 rounded ", training.training_status && trainingObjectStyles[training.training_status].label))}>
                        <p className={twMerge(clsx('font-bold', training.training_status && trainingObjectStyles[training.training_status].labelText))}>{training.training_status}</p>
                    </label>
                    <Button className={clsx('p-2 border-2 rounded font-bold', trainingObjectStyles[training.training_status].label)} >DETAILS </Button>
                </div>
            </div>

        </Link>
    )
}