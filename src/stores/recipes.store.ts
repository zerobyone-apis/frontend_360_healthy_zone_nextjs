import { create } from "zustand";

export const recipesStore = create((set, get) => ({
	favorites: [],

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
