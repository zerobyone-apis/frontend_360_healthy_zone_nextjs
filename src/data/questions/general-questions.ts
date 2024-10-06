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
					id: "stress_level",
					placeholder:
						"On a scale of 1 to 10, how would you rate your daily stress level?",
					type: "radio-and-other",
					label: "Stress level",
					options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
					icon: "bx bx-bowl-hot",
				},
				{
					id: "alcohol_and_tobacco_consume",
					placeholder: "Do you smoke or consume alcohol?",
					type: "radio-and-other",
					label: "Alcohol and tobacco consume",
					options: ["No", "Yes, occasionally", "Yes, regularly"],
					icon: "bx bx-bowl-hot",
				},
			],
			img: "https://www.voxco.com/wp-content/uploads/2021/04/students-feedback-survey-cvr.jpg",
		},
	];
};
