import { QuestionDTO } from "@/interfaces/questions";

export default (): QuestionDTO[] => {
	return [
		{
			name: "general-questions",
			type: "fields",
			title: "General Questions",
			subtitle: "Tap on each fields to answer",
			fields: [
				{
					id: "sleep-average-per-night",
					label: "Sleeping hours",
					placeholder: "How many hours do you sleep on average per night?",
					options: ["Less than 5", "5-7", "7-9", "More than 9"],
					type: "radio",
					icon: "",
				},
				{
					id: "sleep-quality",
					label: "Sleep Quality",
					placeholder: "Would you rate your sleep as good quality?",
					type: "radio",
					options: ["Always", "About always", "Sometimes", "Rarely", "Never"],
					icon: "bx bx-alarm",
				},
				{
					id: "dietary_preference",
					placeholder: "Do you have any dietary preferences or restrictions?",
					type: "radio-and-other",
					label: "Dietary Preference",
					options: [
						"Vegetarian",
						"Vegan",
						"Gluten free",
						"Lactose free",
						"Other, please specify",
					],
					icon: "bx bx-bowl-hot",
				},
			],
			img: "https://www.voxco.com/wp-content/uploads/2021/04/students-feedback-survey-cvr.jpg",
		},
	];
};
