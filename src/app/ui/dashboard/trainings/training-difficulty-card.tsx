import React, { ReactNode } from 'react'

type Props = {
    difficulty: number;
    days_remaining: number;
}

export default function TrainingDifficultyCard({ difficulty, days_remaining }: Props) {

    let stars: ReactNode[] = [];
    for (let i = 0; i < 5; i++) {
        if (difficulty - 1 >= i) stars.push(<i className='bx bxs-star text-yellow-200' ></i>);
        else stars.push(<i className='bx bx-star text-yellow-100' ></i>)
    }

    return (
        <div className='w-full bg-teal-500 rounded-xl p-5 items-center flex flex-col'>
            <div className='flex gap-1'><p className='font-sans font-normal mr-2 text-white'>DIFFICULTY</p> <>{stars.map((star, index) => <div key={index}>{star}</div>)}</></div>
            <div className='flex gap-2 text-center items-center'><i className='bx bx-time-five text-white'></i><p className='font-sans font-normal mr-2 text-white'>{days_remaining} Days remaining</p></div>
        </div>
    )
}