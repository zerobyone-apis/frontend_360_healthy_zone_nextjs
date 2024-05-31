import { NextResponse } from "next/server";
import { getExercises } from "../../../actions/trainings/get_exercises";

export async function GET(request: { url: string | URL }) {
	const { searchParams } = new URL(request.url);
	const name = searchParams.get("name") || "";
	const target = searchParams.get("target") || "";
	const limit = searchParams.get("limit") || "";
	const page = searchParams.get("page") || "";

	const exercises = await getExercises({
		name,
		target,
		limit,
		page,
	});

	return NextResponse.json(exercises);
}
