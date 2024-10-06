import { QuestionDTO } from "@/interfaces/questions";

export default (): QuestionDTO[] => {
	return [
		{
			name: "measurements-questions",
			type: "fields",
			title: "Measurements Questions",
			subtitle: "Tap on each fields to answer",
			fields: [
				{
					id: "height",
					label: "Height",
					placeholder: "How tall are you?",
					type: "text",
					icon: "",
				},
				{
					id: "waist-circumference",
					label: "Waist circumference",
					placeholder: "Waist circumference",
					type: "text",
					icon: "",
				},
				{
					id: "current-weight",
					label: "Current weight",
					placeholder: "What is your current weight?",
					type: "text",
					icon: "",
				},
				{
					id: "highest-weight",
					label: "Highest weight",
					placeholder: "Highest weight",
					type: "text",
					icon: "",
				},
				{
					id: "lowest-weight",
					label: "Lowest weight",
					placeholder: "Lowest weight",
					type: "text",
					icon: "",
				},
			],
			img: "https://www.voxco.com/wp-content/uploads/2021/04/students-feedback-survey-cvr.jpg",
		},
	];
};
