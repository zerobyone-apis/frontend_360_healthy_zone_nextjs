"use client"
import React, { useState } from 'react';

type Props = {};

export default function MiniCalendar({ }: Props) {
    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

    const generateDates = () => {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const dates = [];

        for (let i = 1; i <= totalDaysInMonth; i++) {
            dates.push(i);
        }

        return { firstDayOfMonth, dates };
    };

    const { firstDayOfMonth, dates } = generateDates();

    const handlePrevMonth = () => {
        setCurrentMonth(prevMonth => prevMonth - 1);
        if (currentMonth === 0) {
            setCurrentYear(prevYear => prevYear - 1);
        }
    };

    const handleNextMonth = () => {
        setCurrentMonth(prevMonth => prevMonth + 1);
        if (currentMonth === 11) {
            setCurrentYear(prevYear => prevYear + 1);
        }
    };

    return (
        <div className="flex items-center justify-center py-8 px-4">
            <div className="max-w-sm w-full shadow-lg">
                <div className="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t">
                    <div className="px-4 flex items-center justify-between">
                        <span className="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800">
                            {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                        <div className="flex items-center">
                            <button aria-label="calendar backward" className="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100" onClick={handlePrevMonth}>
                                {/* Insert your backward icon here */}
                            </button>
                            <button aria-label="calendar forward" className="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100" onClick={handleNextMonth}>
                                {/* Insert your forward icon here */}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-12 overflow-x-auto">
                        <table className="w-full">
                            {/* Table header */}
                            <tbody>
                                <tr>
                                    {/* Render dates dynamically */}
                                    {dates.map((date, index) => (
                                        <td key={index} className={`${index < firstDayOfMonth ? 'text-gray-300' : ''}`}>
                                            <div className={`px-2 py-2 cursor-pointer flex w-full justify-center ${index < firstDayOfMonth ? 'pointer-events-none' : ''}`}>
                                                <p className={`text-base ${index < firstDayOfMonth ? 'text-gray-500' : 'text-gray-800'} dark:text-gray-100 ${index >= firstDayOfMonth ? 'font-medium' : ''}`}>{date}</p>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className=" md:py-8 py-2 md:px-2 px-4 bg-gray-50 rounded-b">
                    <div className="px-1">
                        <div className="border-b pb-4 border-gray-400 border-dashed">
                            <p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">9:00 AM</p>
                            <a className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">Zoom call with design team</a>
                            <p className="text-sm pt-2 md:leading-4 leading-none text-gray-600 dark:text-gray-300">Discussion on UX sprint and Wireframe review</p>
                        </div>
                        <div className="border-b pb-4 border-gray-400 border-dashed pt-5">
                            <p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">10:00 AM</p>
                            <a className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">Orientation session with new hires</a>
                        </div>
                        <div className="border-b pb-4 border-gray-400 border-dashed pt-5">
                            <p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">9:00 AM</p>
                            <a className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">Zoom call with design team</a>
                            <p className="text-sm pt-2 md:leading-4 leading-none text-gray-600 dark:text-gray-300">Discussion on UX sprint and Wireframe review</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
