import { QuestionDTO } from "@/interfaces/questions";

export default (): QuestionDTO[] => {
	return [
		{
			name: "about_you",
			type: "fields",
			title: "About you",
			subtitle: "This info will help us to understand how can we help you",
			img: "/imgs/custom-form/casual-life-3d-young-woman-does-yoga.png",
			fields: [
				{
					id: "age",
					label: "Age",
					placeholder: "How old are you?",
					type: "numeric",
					icon: "bx bx-x",
				},
				{
					id: "gender",
					label: "Gender",
					type: "radio",
					placeholder: "What is your gender?",
					options: [
						"💁‍♂️ Male",
						"🙋‍♀️ Female",
						"🤫 I prefer not to say it",
						"Other",
					],
					icon: "",
				},

				{
					id: "ocuppation",
					type: "text",
					placeholder: "What is your occupation?",
					label: "Ocuppation",
					icon: "",
				},
				{
					id: "address",
					type: "text",
					placeholder: "Where are you located?",
					label: "Address",
					icon: "",
				},
			],
		},
	];
};
