// app/actions/getExercises.js

import fs from "fs";
import path from "path";

type Params = {
	name?: string;
	target?: string;
	limit?: string;
	page?: string;
};

export async function getExercises({ name, target, limit, page }: Params) {
	const filePath = path.resolve("./public/data", "exercises.json");
	const fileContents = fs.readFileSync(filePath, "utf8");
	const exercises = JSON.parse(fileContents);

	let filteredExercises = exercises;

	// Filter by name (case-insensitive contains match)
	if (name) {
		filteredExercises = filteredExercises.filter((exercise: any) =>
			exercise.name.toLowerCase().includes(name.toLowerCase())
		);
	}

	// Filter by target
	if (target) {
		filteredExercises = filteredExercises.filter(
			(exercise: any) => exercise.target.toLowerCase() === target.toLowerCase()
		);
	}

	// Pagination
	const itemsPerPage = limit ? parseInt(limit, 10) : filteredExercises.length;
	const currentPage = page ? parseInt(page, 10) : 1;
	const totalItems = filteredExercises.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const paginatedExercises = filteredExercises.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	return {
		data: paginatedExercises,
		totalItems,
		totalPages,
		currentPage,
	};
}
