import clsx from "clsx";

export function ExerciseListSkeleton() {
	return (
		<li
			role="status"
			className="max-w-sm animate-pulse"
			aria-disabled={true}
			aria-checked={false}
		>
			<label
				className={clsx(
					"inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-jungle-green-600 peer-checked:text-jungle-green-600 hover:text-gray-900 hover:bg-gray-100"
				)}
			>
				<div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded">
					<svg
						className="w-10 h-10 text-gray-200 dark:text-gray-600"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 18"
					>
						<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
					</svg>
				</div>
				<div className="block">
					<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
					<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[100px]"></div>
				</div>
				<svg
					className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 10"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M1 5h12m0 0L9 1m4 4L9 9"
					/>
				</svg>
			</label>
		</li>
	);
}
