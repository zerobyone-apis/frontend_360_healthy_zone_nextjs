import clsx from 'clsx';
import React, { ReactNode } from 'react'

type Props = {
    title: string;
    body: string | ReactNode;
    classes?: string;
    titleClasses?: string;
    bodyClasses?: string;
}

export default function DefaultCard({ title, body, classes = "", titleClasses, bodyClasses }: Props) {
    return (
        <div className={clsx(classes ? classes : "bg-white border border-gray-200", "rounded-lg border block w-full p-6 shadow")}>
            <h5 className={clsx(titleClasses ? titleClasses : "mb-2 text-2xl font-bold tracking-tight text-gray-900")}>{title}</h5>
            <p className={clsx(bodyClasses ? bodyClasses : "whitespace-pre-line text-gray-700")}>{body}</p>
        </div>
    )
}