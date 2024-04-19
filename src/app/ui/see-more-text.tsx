'use client'
import clsx from 'clsx';
import React, { useState } from 'react'

interface TextProps {
    children: string;
    seeMoreColor?: string;
    classes?: string;
    textClasses?: string;
}

export function SeeMoreText({ children, seeMoreColor, classes, textClasses }: TextProps) {
    const [seeMore, setSeeMore] = useState(false);
    return (
        <div className={clsx(classes)}>
            <p className={clsx(textClasses)}>{seeMore ? children : `${children.substring(0, 80)}...`}</p>
            <button className={clsx(seeMoreColor ? seeMoreColor : "text-teal-500", "hover:text-teal-400")}
                onClick={() => setSeeMore(!seeMore)}> {seeMore ? "See less..." : "See more..."}
            </button>
        </div >
    )
}