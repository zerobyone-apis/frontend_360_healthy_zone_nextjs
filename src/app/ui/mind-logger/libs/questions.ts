import { OPTION_TYPES } from "../option-card";
import { SURVEY_STEP_TYPES, SurveyStepType } from "../survey/survey-step";

export const SURVEY_PAGES: SurveyStepType[] = [
	{
		id: 0,
		name: "intro",
		type: SURVEY_STEP_TYPES.INFO,
		title: "Bienvenido a la encuenta",
		subtitle:
			"Por favor complete esta simple encuesta para que podamos mejorar su estudio",
		img: "https://www.voxco.com/wp-content/uploads/2021/04/students-feedback-survey-cvr.jpg",
		questions: [],
	},
	{
		id: 1,
		name: "demographicInformation",
		type: SURVEY_STEP_TYPES.QUESTION,
		title: "Información demográfica",
		img: "https://www.auladelafarmacia.com/wp-content/uploads/2021/04/ejercicio.jpg",
		questions: [
			{
				title: "¿Cuál es tu género?",
				value: "gender",
				type: OPTION_TYPES.CHECK,
				multiple: false,
				options: [
					{ title: "Femenino" },
					{ title: "Masculino" },
					{ title: "Otro" },
					{ title: "Prefiero no decirlo" },
				],
			},
		],
	},
	{
		id: 2,
		name: "otherQuestion",
		title: "Otra pregunta",
		img: "https://intef.es/wp-content/uploads/2021/12/32_RED_RRSS_D%C3%ADa-Mundial-de-la-Salud.jpg",
		type: SURVEY_STEP_TYPES.QUESTION,
		questions: [
			{
				title: "¿Tienes alguna condición médica que debamos conocer 2?",
				value: "medicalConditions2",
				type: OPTION_TYPES.INPUT,
				multiple: true,
				options: [
					{ title: "Ninguna" },
					{ title: "Diabetes" },
					{ title: "Hipertensión" },
					{ title: "Enfermedad del corazón" },
					{ title: "Alergias alimentarias" },
					{ title: "Otra" },
				],
			},
		],
	},
	{
		id: 3,
		name: "done",
		type: SURVEY_STEP_TYPES.INFO,
		title: "Todo Listo!",
		subtitle:
			"Ya podemos comenzar! Presion Finalizar para salir de la encuesta",
		img: "https://www.voxco.com/wp-content/uploads/2021/04/students-feedback-survey-cvr.jpg",
		questions: [],
	},
];
