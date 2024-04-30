import { useState } from 'react';

type SurveyResponse = {
    name: string;
    answers: { [key: string]: string[] };
};

type UseSurveyComponentReturn = {
    responses: SurveyResponse[];
    updateResponse: (name: string, answers: { [key: string]: string[] }) => void;
};

const useSurveyComponent = (initialResponses: SurveyResponse[] = []): UseSurveyComponentReturn => {
    const [responses, setResponses] = useState<SurveyResponse[]>(initialResponses);

    const updateResponse = (name: string, answers: { [key: string]: string[] }) => {
        const index = responses.findIndex(response => response.name === name);
        if (index !== -1) {
            setResponses(prevResponses => {
                const newResponses = [...prevResponses];
                newResponses[index] = { name, answers };
                return newResponses;
            });
        } else {
            setResponses(prevResponses => [...prevResponses, { name, answers }]);
        }
    };

    return { responses, updateResponse };
};

export default useSurveyComponent;