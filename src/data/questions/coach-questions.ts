import { QuestionDTO } from "@/interfaces/questions";

export default (): QuestionDTO[] => {
	return [
		{
			name: "coach_history",
			type: "fields",
			subtitle: "Current physical activity levels and more",
			title: "Coach questions",
			img: "/imgs/custom-form/casual-life-3d-young-woman-does-yoga.png",
			fields: [
				{
					id: "exercises-type",
					label: "Exercises type",
					type: "radio-and-other",
					placeholder: "What type of exercise do you currently do?",
					options: [
						"Gym",
						"Calisthenics",
						"Home exercises",
						"Other, please specify",
					],
					icon: "",
				},
				{
					id: "how-much-time-spend-in-training",
					label: "How much time",
					type: "text",
					placeholder: "How much time do you spend training?",
					icon: "",
				},
				{
					id: "frequency",
					label: "How often do you train?",
					type: "radio",
					options: [
						"None",
						"1 per week",
						"2 times per week",
						"3 times per week",
						"4 times per week",
						"5 times per week",
						"6 times per week",
						"All in a row",
					],
					placeholder: "How often do you train?",
					icon: "",
				},
				{
					id: "main-fitness-goal",
					label: "Main fitness goal",
					placeholder: "What is your main fitness goal?",
					type: "radio-and-other",
					options: [
						"Lose weight",
						"Gain muscle mass,",
						"Improve endurance",
						"Other, please specify",
					],
					icon: "",
				},
				{
					id: "exercise-restrictions",
					label: "Exercise restrictions",
					placeholder:
						"Is there any type of exercise that you cannot or prefer not to do?",
					type: "text",
					icon: "",
				},
				{
					id: "training-preferences",
					label: "Training preferences",
					placeholder: "Do you prefer to train in...",
					type: "radio-and-other",
					options: [
						"...A gym",
						"...outdoors",
						"...at home",
						"Other, please specify",
					],
					icon: "",
				},
			],
		},
	];
};
