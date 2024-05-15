import clsx from 'clsx';
import React from 'react'

type Props = {
    count: number;
    title?: string;
    bg: string;
    border: string;
    cols: string;
}

export default function CounterChart({ count, title, bg, border, cols }: Props) {
    return (
        <div className={clsx("w-full p-4 rounded border-l-8 flex items-center flex-col gap-2", border, bg, cols)}>
            <h5 className='text-sm'>{title}</h5>
            <h3 className='font-bold text-xl'>{count}</h3>
        </div>
    )
}