import { useState } from 'react';

export type SurveyResponse = {
    name: string;
    answers: { [key: string]: string[] };
};

type UseSurveyComponentReturn = {
    responses: SurveyResponse[];
    updateResponse: (name: string, answers: { [key: string]: string[] }) => void;
    clearResponses: () => void;
};

const useSurveyComponent = (initialResponses: SurveyResponse[] = []): UseSurveyComponentReturn => {
    const [responses, setResponses] = useState<SurveyResponse[]>(initialResponses);

    const updateResponse = (name: string, answers: { [key: string]: string[] }) => {
        setResponses(prevResponses => {
            const existingIndex = prevResponses.findIndex(response => response.name === name);
            if (existingIndex !== -1) {
                // Si ya existe una respuesta con el mismo nombre, actualiza sus respuestas
                const newResponses = [...prevResponses];
                newResponses[existingIndex] = { name, answers };
                return newResponses;
            } else {
                // Si no existe una respuesta con el mismo nombre, añade una nueva respuesta
                return [...prevResponses, { name, answers }];
            }
        });
    };

    const clearResponses = () => {
        setResponses([])
    }

    return { responses, updateResponse, clearResponses };
};


export default useSurveyComponent;