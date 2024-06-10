"use client"
import { getExercises } from '@/actions/trainings/get-exercises'
import { useEffect, useState } from 'react'

export default function NewTrainingDialog() {
    const [exercises, setExercises] = useState({ 
        exercises: [],
        total: 0,
        showing: 0,
        pages: 1,
        page: 1,
        limit: 10
    });
    const [page, setPage ] = useState(1);
    const [target, setTarget] = useState("")
    const [error, setError] = useState("");

    useEffect(()=>{
        getExercises({limit: 10, page }).then((res)=>{
            if(res) setExercises(res)
        }).catch((err)=> setError(err))

    },[])
    
    return (
        <dialog id="select-modal" aria-modal="true" aria-labelledby="modal-headline" className="flex bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            New Training
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="select-modal">
                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        <p className="text-gray-500 dark:text-gray-400 mb-4">Select the following exercises to train:</p>
                        <ul className="space-y-4 mb-4">
                            {exercises.exercises.map((exercise: any)=>
                            <li>
                                <input type="checkbox" id={exercise.gifId} name="job" value={exercise.gifId} className="hidden peer" />
                                <label htmlFor={exercise.gifId} className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100">
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">{exercise.name}</div>
                                        <div className="w-full text-gray-500">{exercise.target}</div>
                                    </div>
                                    <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" /></svg>
                                </label>
                            </li>)}
                        </ul>
                        <button className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Next step
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}