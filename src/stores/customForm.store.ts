import { create } from "zustand";

export const customFormStore = create((set, get) => ({
	form: {
		dont_eat: "",
		how_often_eat: "",
		dietary_preference: "",
		age: "",
		gender: "",
		ocuppation: "",
		address: "",
	},
	setAnswer: (prop: object) =>
		set((state: any) => ({
			form: { ...state.form, ...prop },
		})),
}));
