import { QuestionDTO } from "@/interfaces/questions";

export default (): QuestionDTO[] => {
	return [
		{
			name: "medical_history",
			type: "fields",
			title: "Medical history",
			subtitle: "",
			img: "/imgs/custom-form/casual-life-3d-young-woman-does-yoga.png",
			fields: [
				{
					id: "medical-conditions",
					label: "Conditions",
					type: "radio-and-other",
					placeholder:
						"Do you have any medical conditions we should be aware of?",
					options: [
						"None",
						"Diabetes",
						"Hypertension",
						"Heart Disease",
						"Food Allergies",
						"Other, please specify",
					],
					icon: "",
				},
				{
					id: "history-family",
					label: "Family conditions",
					type: "radio-and-other",
					placeholder: "Is there any family history of chronic disease?",
					options: ["No", "Yes, please specify"],
					icon: "",
				},
				{
					id: "medications-and-supplements",
					label: "Medications and Supplements",
					type: "radio-and-other",
					placeholder: "Are you taking any medications or supplements?",
					options: ["No", "Yes, please specify"],
					icon: "",
				},
				{
					id: "injury-history",
					label: "Injury History",
					type: "radio-and-other",
					placeholder:
						"Have you suffered any injuries that may affect your ability to exercise?",
					options: ["No", "Yes, please specify"],
					icon: "",
				},
			],
		},
	];
};
