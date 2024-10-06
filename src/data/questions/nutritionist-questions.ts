import { QuestionDTO } from "@/interfaces/questions";

export default (): QuestionDTO[] => {
	return [
		{
			name: "diet_and_nutrition",
			type: "fields",
			title: "Diet and nutrition history",
			subtitle: "Tap on each fields to answer",
			fields: [
				{
					id: "dont_eat",
					label: "Not Consume",
					placeholder: "What type of food do you not consume?",
					type: "text",
					icon: "bx bx-x",
				},
				{
					id: "how_often_eat",
					label: "Eat Frecuency",
					placeholder: "How often do you eat a day?",
					type: "radio",
					options: ["1-2", "3-4", "5-6", "More than 6"],
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
				{
					id: "frequency_of_eating_out",
					label: "Frequency of eating out or ordering food from home",
					placeholder: "How often do you eat out or order food from home?",
					type: "radio",
					options: ["Never", "Occasionally", "Frequently", "Very often"],
					icon: "bx bx-alarm",
				},
				{
					id: "availability",
					label: "Availability",
					placeholder: "What are your available times for consultations?",
					type: "text",
					icon: "",
				},
			],
			img: "https://www.voxco.com/wp-content/uploads/2021/04/students-feedback-survey-cvr.jpg",
		},
	];
};
