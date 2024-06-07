"use client"
import clsx from 'clsx';
import React, { SetStateAction, useEffect, useState } from 'react'
import { Button } from '../button';
import { SelectExerciseModal } from './select-exercise-modal';

type Props = {
  amount_days: number;
  training_description: {
    description_training: string;
    type: string;
    coach_plan: string;
  };
  setter: SetStateAction<any>,
  global_state: any,
}

export function TrainingGeneratorSection({ amount_days, training_description, setter, global_state }: Props) {
  const [exercises, setExercises] = useState([]);
  const [currentDay, setCurrentDay] = useState(0);

  const renderOptions = () => {
    const options = [];
    for (let i = 0; i < amount_days; i++) {
      options.push(
        <option key={i} value={i}>
          Day {i + 1}
        </option>
      );
    }
    return options;
  };

  return (
    <>
      <section className='p-3 grid grid-cols-3'>
        <div className='flex flex-col gap-1 col-span-2'>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 ">Total Training Days: <strong>{amount_days}</strong></time>
          {/* {exercises.map((exercise, index) => <div key={index}>{exercise}</div>)} */}
          <span className='mb-1 text-md font-normal leading-none text-gray-400'>{training_description.description_training}</span>
        </div>
        <form className='p-2 col-span-1'>
          <select
            id="days"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={currentDay}
            onChange={(e) => setCurrentDay(Number(e.target.value))}
          >
            {renderOptions()}
          </select>
        </form>
        <div className='w-full flex justify-center col-span-3'>
          {/**
             * Training setter preview...
             */}
          <Button className='bg-jungle-green-500 text-white rounded'>+ Add exercise</Button>
        </div>
      </section>
      <SelectExerciseModal />
    </>
  )
}
