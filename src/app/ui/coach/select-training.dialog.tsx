"use client"
import { getExercises } from '@/actions/trainings/get-exercises'
import clsx from 'clsx';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

export default function SelectTrainingModal() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [exercises, setExercises] = useState({
        exercises: [],
        total: 0,
        showing: 0,
        pages: 1,
        page: 1,
        limit: 10
    });
    const [page, setPage] = useState(1);
    const [target, setTarget] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [selected, setSelected] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSelect = (exercise: any) => {
        setSelected((prevSelected: any) => {
            if (prevSelected.some((s: any) => s.gifId === exercise.gifId)) {
                return prevSelected.filter((s: any) => s.gifId !== exercise.gifId);
            } else {
                return [...prevSelected, exercise];
            }
        });
    };

    const bucket = process.env.NEXT_PUBLIC_BASE_BUCKET_URL || "";
    const folder = process.env.NEXT_PUBLIC_BUCKET_FOLDER_GIFS || "";

    const targets = [
        'abs',
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
        'abductors'
    ];

    function handleGetExercises() {
        setIsLoading(true);
        getExercises({ limit: 10, page, name, target }).then((res) => {
            if (res) setExercises(res)
        }).catch((err) => setError(err))
            .finally(() => setIsLoading(false))
    }

    function handleClose() {
        const url = new URL(window.location.href);
        url.searchParams.delete('select-exercises');
        router.replace(url.toString(), { shallow: true });
    }

    useEffect(() => {
        handleGetExercises();
    }, [page]);

    useEffect(() => {
        setPage(1);
        handleGetExercises();
    }, [name, target]);

    const startItem = (page - 1) * 10 + 1;
    const endItem = Math.min(page * 10, exercises.total);

    if (error) {
        return <div className="text-red-500">{error}</div>
    }

    if (!searchParams.get('select-exercises')) return null;

    return (
        <dialog id="select-modal" aria-modal="true" aria-labelledby="modal-headline" className="flex bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-screen h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-lg font-semibold text-gray-900">
                            New Training
                        </h3>
                        <button type="button"
                            onClick={handleClose}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="select-modal">
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
                                    onChange={(e) => setName(e.target.value)}
                                    id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search by exercise name" />
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
                        {exercises.total !== 0 && <p className="text-gray-500 mb-4 text-sm">The order is defined by the selected items</p>}
                        <ul className="space-y-4 mb-4">
                            {isLoading &&
                                <>
                                    <SkeletonListExercises />
                                    <SkeletonListExercises />
                                    <SkeletonListExercises />
                                    <SkeletonListExercises />
                                    <SkeletonListExercises />
                                    <SkeletonListExercises />
                                </>
                            }
                            {exercises.exercises.map((exercise: any) => {
                                const checked = selected.some((s: any) => s.gifId === exercise.gifId);
                                return (
                                    <li key={exercise.gifId} role="checkbox" className="peer" onClick={() => handleSelect(exercise)} aria-checked={checked} >
                                        <label htmlFor={exercise.gifId} className={clsx("inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-jungle-green-600 peer-checked:text-jungle-green-600 hover:text-gray-900 hover:bg-gray-100", checked && "border-jungle-green-600 text-jungle-green-600")}>
                                            <img className='w-12 h-12 cover' src={`${bucket}${folder}/${exercise.gifId}.gif`} alt={exercise.name} />
                                            <div className="block text-left">
                                                <div className="w-full text-left text-lg font-semibold">{exercise.name}</div>
                                                <div className="w-full text-gray-500">{exercise.target}</div>
                                            </div>
                                            <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" /></svg>
                                        </label>
                                    </li>)
                            })}
                            {exercises.total === 0 && <h3 className='text-center text-jungle-green-500 font-bold text-xl'>No exercises found...</h3>}
                        </ul>

                        <div className="flex flex-col items-center">

                            <span className="text-sm text-gray-700">
                                Showing <span className="font-semibold text-gray-900">{startItem}</span> to <span className="font-semibold text-gray-900">{endItem}</span> of <span className="font-semibold text-gray-900">{exercises.total}</span> Entries
                            </span>
                            <div className="inline-flex mt-2 xs:mt-0">
                                <button onClick={() => setPage(page - 1)} disabled={page === 1} className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12.293 14.707a1 1 0 0 0 1.414-1.414L9.414 9l4.293-4.293A1 1 0 0 0 12.293 3.293l-5 5a1 1 0 0 0 0 1.414l5 5Z" clipRule="evenodd" />
                                    </svg>
                                    Prev
                                </button>
                                <button onClick={() => setPage(page + 1)} disabled={page === exercises.pages} className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    Next
                                    <svg className="w-5 h-5 ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.707 14.707a1 1 0 0 1-1.414-1.414L10.586 9 6.293 4.707A1 1 0 0 1 7.707 3.293l5 5a1 1 0 0 1 0 1.414l-5 5Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

function SkeletonListExercises() {
    return (
        <li role="status" className="max-w-sm animate-pulse" aria-disabled={true} aria-checked={false}>
            <label className={clsx("inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-jungle-green-600 peer-checked:text-jungle-green-600 hover:text-gray-900 hover:bg-gray-100")}>
                <div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded">
                    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                </div>
                <div className="block">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[100px]"></div>
                </div>
                <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" /></svg>
            </label>
        </li>
    )
}