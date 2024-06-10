"use server"
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'public', 'data', 'exercises.json');
type Params = {
    limit?: number;
    page?: number;
    target?: string;
    name?: string;
}
export async function getExercises({ limit = 10, page = 1, target = "", name = "" }: Params) {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        const exercises = JSON.parse(data);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        let filteredExercises = exercises;

        if (target) {
            filteredExercises = filteredExercises.filter((exercise: any) => exercise.target === target);
        }

        if (name) {
            filteredExercises = filteredExercises.filter((exercise: any) =>
                exercise.name.toLowerCase().includes(name.toLowerCase())
            );
        }

        const paginatedExercises = filteredExercises.slice(startIndex, endIndex);

        return {
            exercises: paginatedExercises,
            total: filteredExercises.length,
            showing: paginatedExercises.length,
            pages: Math.ceil(filteredExercises.length / limit),
            page: page,
            limit: limit
        };
    } catch (error) {
        console.error('Error reading exercises file:', error);
        return null;
    }
}

