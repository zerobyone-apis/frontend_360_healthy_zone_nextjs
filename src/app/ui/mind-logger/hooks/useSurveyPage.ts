import { useState } from 'react';

type Question = {
    name: string;
    response: string[];
};

type UseSurveyPageReturn = {
    questions: Question[];
    updateResponse: (name: string, response: string[]) => void;
};

const useSurveyPage = (initialQuestions: Question[] = []): UseSurveyPageReturn => {
    const [questions, setQuestions] = useState<Question[]>(initialQuestions);

    const updateResponse = (name: string, response: string[]) => {
        // Verificar si ya existe una pregunta con el mismo nombre
        const index = questions.findIndex(question => question.name === name);
        if (index !== -1) {
            // Si la pregunta ya existe, actualizamos su respuesta
            setQuestions(prevQuestions => {
                const newQuestions = [...prevQuestions];
                newQuestions[index] = { ...newQuestions[index], response };
                return newQuestions;
            });
        } else {
            // Si la pregunta no existe, la agregamos al array de preguntas
            setQuestions(prevQuestions => [...prevQuestions, { name, response }]);
        }
    };

    return { questions, updateResponse };
};

export default useSurveyPage;