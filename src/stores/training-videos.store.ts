import { create } from "zustand";

export const trainingVideosStore = create((set, get) => ({
	favorites: [],
	trainings: [
		{
			id: 1,
			title: "Abs Workout Challenge",
			video: "https://www.youtube.com/embed/2pLT-olgUJs",
			type: "ABS",
		},
		{
			id: 2,
			title: "Full Body 5x Per Week",
			video: "https://www.youtube.com/embed/eTxO5ZMxcsc",
			type: "Full body",
		},
		{
			id: 3,
			title: "How I Transformed My Body in 90 Days",
			video: "https://www.youtube.com/embed/ISDgxO2AM6E",
			type: "Full body",
		},
		{
			id: 4,
			title: "The Best Workout Split for MAXIMUM Muscle Gains",
			video: "https://www.youtube.com/embed/RDWyqnGhmWY",
			type: "Full body",
		},
	],

	setFavorite: (prop: object) =>
		set((state: any) => ({
			favorites: [...state.favorites, prop],
		})),

	removeFavorite: (id: number | string) =>
		set((state: any) => ({
			favorites: [
				...state.favorites.filter((favorite: any) => favorite.id != id),
			],
		})),
}));
