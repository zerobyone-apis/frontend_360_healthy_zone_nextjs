import { QuestionDTO } from "@/interfaces/questions";

export default (): QuestionDTO[] => {
	return [
		{
			name: "terms-and-conditions",
			type: "fields",
			title: "Privacy and policy",
			subtitle: "Tap on each fields to answer",
			fields: [
				{
					id: "privacy-policy",
					label: "Privacy Policy",
					placeholder:
						"Do you consent to the handling of your private information in accordance with our privacy policies?",
					type: "radio",
					options: ["Yes", "No"],
					icon: "bx bx-x",
				},
				{
					id: "privacy-policy-coach",
					label: "Coach Privacy Policy",
					placeholder:
						"Do you give your consent for us to share your profile and information with the coach?",
					type: "radio",
					options: ["Yes", "No"],
					icon: "bx bx-x",
				},
			],
			img: "https://www.voxco.com/wp-content/uploads/2021/04/students-feedback-survey-cvr.jpg",
		},
	];
};
