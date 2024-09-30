export interface QuestionDTO {
	name: string;
	type: string;
	title: string;
	subtitle: string | null;
	img: string | null;
	options?: string[];
	fields?: Fields[];
	placeholder?: string;
	label?: string;
}

export interface Fields {
	id: string;
	label?: string;
	placeholder: string;
	type: "radio-and-other" | "radio" | "text" | string;
	options?: string[];
	icon: string;
}
