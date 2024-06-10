"use client"
import { getExercises } from '@/actions/trainings/get-exercises'
import { useEffect, useState } from 'react'

export default function SelectTrainingModal() {
    const [exercises, setExercises] = useState({
        exercises: [],
        total: 0,
        showing: 0,
        pages: 1,
        page: 1,
        limit: 10
    });
    const [page, setPage] = useState(1);
    const [target, setTarget] = useState("")
    const [error, setError] = useState("");
    const [name, setName] = useState("")

    const targets = ['abs',
        'quads',
        'calves',
        'lats',
        'pectorals',
        'glutes',
        'cardiovascular system',
        'upper back',
        'triceps',
        'biceps',
        'adductors',
        'hamstrings',
        'spine',
        'serratus anterior',
        'delts',
        'forearms',
        'levator scapulae',
        'traps',
        'abductors'];


    function handleGetExercises(){
        getExercises({ limit: 10, page, name, target }).then((res) => {
            if (res) setExercises(res)
        }).catch((err) => setError(err))
    }

    useEffect(() => {
        handleGetExercises();
    }, [page])

    useEffect(() => {
        setPage(1);
        handleGetExercises();
    }, [name, target])

    const startItem = (page - 1) * 10 + 1;
    const endItem = Math.min(page * 10, exercises.total);

    if (error) {
        return <div className="text-red-500">{error}</div>
    }

    return (
        <dialog id="select-modal" aria-modal="true" aria-labelledby="modal-headline" className="flex bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow">

                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-lg font-semibold text-gray-900">
                            New Training
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="select-modal">
                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>

                    </div>
                    <form className="max-w-lg mx-auto p-2">
                        <div className="flex">
                            <select id="dropdown" data-dropdown-toggle="dropdown"
                                onChange={(e) => setTarget(e.target.value)} 
                            className="flex-shrink-0 z-10 w-2 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100">
                                <option>All targets</option>
                                {targets.map((target) => (
                                    <option key={target} value={target}>{target}</option>
                                ))}
                            </select>
                            
                            <div className="relative w-full">
                                <input type="search" name="search-exercise" 
                                onChange={(e)=> setName(e.target.value)}
                                id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search by exercise name"/>
                                <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="p-4 md:p-5">
                        <p className="text-gray-500 mb-4">Select the following exercises to train:</p>
                        <ul className="space-y-4 mb-4">
                            {exercises.exercises.map((exercise: any) =>
                                <li>
                                    <input type="checkbox" id={exercise.gifId} name="job" value={exercise.gifId} className="hidden peer" />
                                    <label htmlFor={exercise.gifId} className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100">
                                        <div className="block">
                                            <div className="w-full text-lg font-semibold">{exercise.name}</div>
                                            <div className="w-full text-gray-500">{exercise.target}</div>
                                        </div>
                                        <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" /></svg>
                                    </label>
                                </li>)}
                        </ul>

                        <div className="flex flex-col items-center">

                            <span className="text-sm text-gray-700">
                                Showing <span className="font-semibold text-gray-900">{startItem}</span> to <span className="font-semibold text-gray-900">{endItem}</span> of <span className="font-semibold text-gray-900">{exercises.total}</span> Entries
                            </span>

                            <div className="inline-flex mt-2 xs:mt-0">
                                <button 
                                onClick={()=> setPage(page - 1)}
                                disabled={page === 1}
                                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-90">
                                    Prev
                                </button>
                                <button 
                                onClick={()=> setPage(page + 1)}
                                disabled= {exercises.page === exercises.pages}
                                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    )
}