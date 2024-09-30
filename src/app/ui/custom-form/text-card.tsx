"use client"
import React from 'react'
import { QuestionDTO } from '@/interfaces/questions'
import { Label, TextInput } from 'flowbite-react';

type Props = {
    question: QuestionDTO;
}

export default function TextCard({ question }: Props) {

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor={question.name} value={question.label} />
                </div>
                <TextInput id={question.name} type="text" sizing="md" placeholder={question.placeholder} />
            </div>
        </div>
    )
}