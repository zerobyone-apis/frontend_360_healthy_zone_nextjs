import { OPTION_TYPES } from "../option-card"
import { SURVEY_PAGE_TYPES } from "../survey-card/survey-page"

export const SURVEY_PAGES = [
    {
        id: 0,
        name: "intro",
        type: SURVEY_PAGE_TYPES.INFO,
        title: "Bienvenido a la encuenta",
        subtitle: "Por favor complete esta simple encuesta para que podamos mejorar su estudio",
        img: "https://www.voxco.com/wp-content/uploads/2021/04/students-feedback-survey-cvr.jpg",
    },
    {
        id: 1,
        name: "demographicInformation",
        type: SURVEY_PAGE_TYPES.QUESTION,
        title: "Información demográfica",
        img: "https://www.voxco.com/wp-content/uploads/2021/04/students-feedback-survey-cvr.jpg",
        questions: [
            // {
            //     title: "¿Cuál es tu fecha de nacimiento?",
            //     value: "age",
            //     type: OPTION_TYPES.DATE,
            //     options: [],
            // },

            // { "title": "¿Cuál es tu género?", "value": "Género (Masculino/Femenino/Otro/Prefiero no decirlo)" },

            {
                title: "¿Cuál es tu género?",
                value: "gender",
                type: OPTION_TYPES.CHECK,
                options: [
                    { title: "Femenino" },
                    { title: "Masculino" },
                    { title: "Otro" },
                    { title: "Prefiero no decirlo" },
                ],
            },
            // { "title": "¿Cuál es tu ocupación?", "value": "Ocupación" },

            // {
            //     title: "¿Cuál es tu ocupación?",
            //     value: "charge",
            //     type: OPTION_TYPES.INPUT,
            //     options: [],
            // },
            // { "title": "¿Dónde resides?", "value": "Residencia" }
            // {
            //     title: "¿Tienes alguna condición médica que debamos conocer?",
            //     value: "medicalConditions",
            //     type: OPTION_TYPES.CHECK,
            //     multiple: true,
            //     options: [
            //         { title: "Ninguna" },
            //         { title: "Diabetes" },
            //         { title: "Hipertensión" },
            //         { title: "Enfermedad del corazón" },
            //         { title: "Alergias alimentarias" },
            //         { title: "Otra" },
            //     ],
            // },
            // {
            //     "id": 4,
            //     "name": "levelsOfPhysicalActivity",
            //     "value": "Niveles de actividad física",
            //     "options": [
            //         { "title": "¿Qué tipo de ejercicio haces, cuánto tiempo y con qué frecuencia?", "value": "Tipo, duración y frecuencia del ejercicio (Ninguno/1-2 veces por semana/3-4 veces por semana/5 o más veces por semana)" }
            //     ]
            // },

            // {
            //     title: "¿Qué tipo de ejercicio haces, cuánto tiempo y con qué frecuencia?",
            //     value: "levelsOfPhysicalActivity",
            //     type: OPTION_TYPES.SLIDER,
            //     options: ["si", "no"],
            // },
        ]
    },
    {
        "id": 2,
        "name": "otherQuestion",
        title: "Otra pregunta",
        questions: [
            // {
            //     title: "¿Cuál es tu fecha de nacimiento?",
            //     value: "age",
            //     type: OPTION_TYPES.DATE,
            //     options: [],
            // },

            // { "title": "¿Cuál es tu género?", "value": "Género (Masculino/Femenino/Otro/Prefiero no decirlo)" },

            // {
            //     title: "¿Cuál es tu género 2?",
            //     value: "gender2",
            //     type: OPTION_TYPES.CHECK,
            //     options: [
            //         { title: "Femenino2" },
            //         { title: "Masculino2" },
            //     ],
            // },
            // { "title": "¿Cuál es tu ocupación?", "value": "Ocupación" },

            // {
            //     title: "¿Cuál es tu ocupación?",
            //     value: "charge",
            //     type: OPTION_TYPES.INPUT,
            //     options: [],
            // },
            // { "title": "¿Dónde resides?", "value": "Residencia" }
            {
                title: "¿Tienes alguna condición médica que debamos conocer 2?",
                value: "medicalConditions2",
                type: OPTION_TYPES.CHECK,
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
            // {
            //     "id": 4,
            //     "name": "levelsOfPhysicalActivity",
            //     "value": "Niveles de actividad física",
            //     "options": [
            //         { "title": "¿Qué tipo de ejercicio haces, cuánto tiempo y con qué frecuencia?", "value": "Tipo, duración y frecuencia del ejercicio (Ninguno/1-2 veces por semana/3-4 veces por semana/5 o más veces por semana)" }
            //     ]
            // },

            // {
            //     title: "¿Qué tipo de ejercicio haces, cuánto tiempo y con qué frecuencia?",
            //     value: "levelsOfPhysicalActivity",
            //     type: OPTION_TYPES.SLIDER,
            //     options: ["si", "no"],
            // },
        ]
    },












































    // {
    //     "id": 2,
    //     "name": "medicalHistory",
    //     "value": "Historial médico",
    //     "options": [
    //         { "title": "¿Tienes alguna condición médica que debamos conocer?", "value": "Condiciones médicas (Ninguna/Diabetes/Hipertensión/Enfermedad del corazón/Alergias alimentarias/Otra, especificar)" }
    //     ]
    // },
    // {
    //     "id": 3,
    //     "name": "dietAndNutritionHistory",
    //     "value": "Historial de dieta y alimentación",
    //     "options": [
    //         { "title": "¿Qué tipo de alimentos no consumes?", "value": "Tipos de alimentos no consumidos" },
    //         { "title": "¿Cuántas veces al día comes?", "value": "Número de comidas al día (1-2/3-4/5-6/Más de 6)" },
    //         { "title": "¿Tienes alguna preferencia o restricción alimentaria?", "value": "Preferencias o restricciones alimentarias (Vegetariano/Vegano/Sin gluten/Sin lactosa/Otro)" }
    //     ]
    // },
    // {
    //     "id": 4,
    //     "name": "levelsOfPhysicalActivity",
    //     "value": "Niveles de actividad física",
    //     "options": [
    //         { "title": "¿Qué tipo de ejercicio haces, cuánto tiempo y con qué frecuencia?", "value": "Tipo, duración y frecuencia del ejercicio (Ninguno/1-2 veces por semana/3-4 veces por semana/5 o más veces por semana)" }
    //     ]
    // },
    // {
    //     "id": 5,
    //     "name": "healthGoals",
    //     "value": "Objetivos de salud",
    //     "options": [
    //         { "title": "¿Cuál es tu objetivo principal de salud o nutrición?", "value": "Objetivo principal de salud o nutrición (Perder peso/Ganar masa muscular/Manejar una enfermedad/Mantener mi peso actual/Otro)" }
    //     ]
    // },
    // {
    //     "id": 6,
    //     "name": "medicationsAndSupplements",
    //     "value": "Medicamentos y suplementos",
    //     "options": [
    //         { "title": "¿Estás tomando algún medicamento o suplemento?", "value": "Medicamentos o suplementos (No/Sí, especificar)" }
    //     ]
    // },
    // {
    //     "id": 7,
    //     "name": "recentLaboratoryTests",
    //     "value": "Pruebas de laboratorio recientes",
    //     "options": [
    //         { "title": "¿Has realizado pruebas de laboratorio recientemente, como niveles de colesterol o glucosa en sangre?", "value": "Pruebas de laboratorio recientes, como niveles de colesterol o glucosa en sangre (No/Sí, y puedo proporcionar los resultados)" }
    //     ]
    // },
    // {
    //     "id": 8,
    //     "name": "weightHistory",
    //     "value": "Historial de peso",
    //     "options": [
    //         { "title": "¿Cuál es tu peso actual, tu peso más alto y tu peso más bajo?", "value": "Peso actual, peso más alto y peso más bajo" }
    //     ]
    // },
    // {
    //     "id": 9,
    //     "name": "sleepHabits",
    //     "value": "Hábitos de sueño",
    //     "options": [
    //         { "title": "¿Cuántas horas duermes en promedio por noche?", "value": "Horas promedio de sueño por noche (Menos de 5/5-7/7-9/Más de 9)" },
    //         { "title": "¿Calificarías tu sueño como de buena calidad?", "value": "Calidad del sueño (Siempre/Casi siempre/A veces/Rara vez/Nunca)" }
    //     ]
    // },
    // {
    //     "id": 10,
    //     "name": "familyHistoryOfDiseases",
    //     "value": "Historia familiar de enfermedades",
    //     "options": [
    //         { "title": "¿Existe algún antecedente familiar de enfermedades crónicas?", "value": "Antecedentes familiares de enfermedades crónicas (No/Sí, especificar)" }
    //     ]
    // },
    // {
    //     "id": 11,
    //     "name": "stressLevel",
    //     "value": "Nivel de estrés",
    //     "options": [
    //         { "title": "En una escala del 1 al 10, ¿cómo calificarías tu nivel de estrés diario?", "value": "Nivel de estrés diario (1-10)" }
    //     ]
    // },
    // {
    //     "id": 12,
    //     "name": "alcoholAndTobaccoConsumption",
    //     "value": "Consumo de alcohol y tabaco",
    //     "options": [
    //         { "title": "¿Fumas o consumes alcohol?", "value": "Consumo de tabaco o alcohol (No/Sí, ocasionalmente/Sí, regularmente)" }
    //     ]
    // },
    // {
    //     "id": 13,
    //     "name": "bodyMeasurements",
    //     "value": "Medidas corporales",
    //     "options": [
    //         { "title": "¿Cuál es tu altura y circunferencia de la cintura?", "value": "Altura y circunferencia de la cintura" }
    //     ]
    // },
    // {
    //     "id": 14,
    //     "name": "eatingOutOrFoodDeliveryFrequency",
    //     "value": "Frecuencia de comer fuera o pedir comida a domicilio",
    //     "options": [
    //         { "title": "¿Con qué frecuencia comes fuera de casa o pides comida a domicilio?", "value": "Frecuencia de comer fuera de casa o pedir comida a domicilio (Nunca/Ocasionalmente/Frecuentemente/Muy frecuentemente)" }
    //     ]
    // },
    // {
    //     "id": 15,
    //     "name": "contactInformation",
    //     "value": "Información de contacto",
    //     "options": [
    //         { "title": "¿Cuál es tu número de teléfono y dirección de correo electrónico?", "value": "Número de teléfono y dirección de correo electrónico" }
    //     ]
    // },
    // {
    //     "id": 16,
    //     "name": "privacyConsent",
    //     "value": "Consentimiento de privacidad",
    //     "options": [
    //         { "title": "¿Das tu consentimiento para que manejes tu información privada de acuerdo con nuestras políticas de privacidad?", "value": "Consentimiento de privacidad (Sí/No)" }
    //     ]
    // },
    // {
    //     "id": 17,
    //     "name": "availability",
    //     "value": "Disponibilidad",
    //     "options": [
    //         { "title": "¿Cuáles son tus horarios disponibles para consultas?", "value": "Horarios disponibles para consultas" }
    //     ]
    // }
]