import clsx from "clsx";
import { useState, useEffect } from "react";

export function SelectExerciseModal() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | undefined>();
    const [exercises, setExercises] = useState<any>({ data: [], currentPage: 1, totalItems: 0, totalPages: 0 });
    const [selected, setSelected] = useState<any[]>([]);

    // Pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentTarget, setCurrentTarget] = useState<string>("");
    const [currentSearch, setCurrentSearch] = useState<string>("");

    async function fetchExercises() {
        setIsLoading(true);

        // Reset currentPage if the state is changed from other states
        if (currentPage === exercises.currentPage) setCurrentPage(1);
        try {
            const url = `/api/exercises?limit=10&page=${currentPage}${currentTarget ? "&target=" + currentTarget : ""}${currentSearch ? "&name=" + currentSearch : ""}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch exercises!");
            }
            const exercisesData = await response.json();
            setExercises(exercisesData);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchExercises();
    }, [currentPage, currentTarget, currentSearch]);

    const handleSelect = (exercise: any) => {
        if (selected.some((s) => s.gifId === exercise.gifId)) {
            return setSelected((prevSelected) => prevSelected.filter((s) => s.gifId !== exercise.gifId));
        }

        setSelected((prevSelected) => [...prevSelected, exercise]);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage === exercises.totalPages) return null;
        setCurrentPage(currentPage + 1);
    };

    const startItem = (currentPage - 1) * 10 + 1;
    const endItem = Math.min(currentPage * 10, exercises.totalItems);

    const handleClose = () => {
        console.log("Close....");
    };

    const targets = [
        'abs', 'quads', 'calves', 'lats', 'pectorals', 'glutes', 'cardiovascular system',
        'upper back', 'triceps', 'biceps', 'adductors', 'hamstrings', 'spine',
        'serratus anterior', 'delts', 'forearms', 'levator scapulae', 'traps', 'abductors'
    ];

    const renderSkeleton = () => {
        const skeletonItems = [];
        for (let i = 0; i < 10; i++) {
            skeletonItems.push(
                <li className='bg-white border border-gray-200 rounded-lg p-5' key={i}>
                    <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                        <div className="flex items-center justify-center w-10 h-full bg-gray-300 rounded">
                            <svg className="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                            </svg>
                        </div>
                        <div className="w-full">
                            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                            <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                </li>
            );
        }
        return skeletonItems;
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <dialog id="select-modal" className="overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 fixed top-0 left-0 z-[55] justify-center flex items-center w-full h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-lg font-semibold text-jungle-green-900">
                            Exercises selection
                        </h3>
                        <button type="button" onClick={handleClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="select-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        <form className="max-w-lg mx-auto" onSubmit={(e) => { e.preventDefault(); fetchExercises(); }}>
                            <div className="flex">
                                <select
                                    onChange={(e) => setCurrentTarget(e.target.value)}
                                    value={currentTarget}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-s-lg focus:ring-blue-500 focus:border-blue-500 w-10 p-2.5">
                                    <option value={""}>All targets</option>
                                    {targets.map((target, index: number) => <option value={target} key={index} className="capitalize">{target}</option>)}
                                </select>
                                <div className="relative w-full">
                                    <input
                                        type="search"
                                        id="search-dropdown"
                                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Search by name"
                                        value={currentSearch}
                                        onChange={(e) => setCurrentSearch(e.target.value)}
                                    />
                                    <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                        <span className="sr-only">Search</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <p className="text-gray-400 mb-4">The order is defined by the selected items</p>
                        <ul className="space-y-4 mb-4">
                            {!isLoading ? exercises.data.map((exercise: any, index: number) => {
                                const checked = selected.some((s) => s.gifId === exercise.gifId);
                                return (
                                    <li key={exercise.gifId}>
                                        <label htmlFor={"exercise-" + index} className={clsx("inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-jungle-green-600 peer-checked:text-jungle-green-600 hover:text-gray-900 hover:bg-gray-100", checked && "border-jungle-green-600 text-jungle-green-600")}>
                                            <input type="checkbox" id={"exercise-" + index} name="exercise" value={"exercise-" + index} className="hidden peer" checked={checked} readOnly onChange={() => handleSelect(exercise)} />
                                            <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded">
                                                <svg className="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                                </svg>
                                            </div>
                                            <div className="block">
                                                <div className="w-full text-lg font-semibold">{exercise.name}</div>
                                                <div className="w-full text-gray-500">{exercise.target}</div>
                                            </div>
                                            <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </svg>
                                        </label>
                                    </li>
                                );
                            })
                                :
                                renderSkeleton()
                            }
                        </ul>
                        <div className="flex flex-col items-center">
                            <span className="text-sm text-gray-700">
                                Showing <span className="font-semibold text-gray-900">{startItem}</span> to <span className="font-semibold text-gray-900">{endItem}</span> of <span className="font-semibold text-gray-900">{exercises.totalItems}</span> Entries
                            </span>
                            <div className="inline-flex mt-2 xs:mt-0">
                                <button onClick={handlePrevPage} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900" disabled={currentPage == 1}>
                                    Prev
                                </button>
                                <button onClick={handleNextPage} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    );
}
