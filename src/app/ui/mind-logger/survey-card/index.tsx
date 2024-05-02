import React, { useEffect, useState } from 'react';
import { MobileStepper, Button } from '@mui/material';
import { SURVEY_PAGE_TYPES, SurveyPageType } from './survey-page';
import { SurveyPage } from './survey-page';
import useSurvey, { SurveyResponse } from '../hooks/useSurvey';
import { QuestionCardType } from '../question-card/question-card';

interface SurveyProps {
    pages: SurveyPageType[];
    onSubmit: (responses: SurveyResponse[]) => void;
}

export const Survey = ({ pages, onSubmit }: SurveyProps) => {
    const [activeStep, setActiveStep] = useState(0);
    const { responses, updateResponse, clearResponses } = useSurvey();
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

    useEffect(() => {
        if (!pages || pages.length === 0 || activeStep < 0 || activeStep >= pages.length) {
            // There are no pages or activeStep is out of valid range
            return;
        }

        const currentPage = pages[activeStep];

        // If the current page is of type "info", allow advancing the stepper without restrictions
        if (currentPage.type === SURVEY_PAGE_TYPES.INFO) {
            setIsNextButtonDisabled(false);
            return;
        }

        // Find the response corresponding to the current page in the responses array
        const currentPageResponse = responses.find(response => response.name === currentPage.name);

        // Check if the current page has responses
        const pageHasResponses = currentPageResponse && Object.keys(currentPageResponse.answers).length > 0;

        // Check if all questions on the current page have responses
        const allQuestionsAnswered = (currentPage.questions || []).every((question: QuestionCardType) => {
            // If the question is optional, it does not need to be answered
            if (question.optional) {
                return true;
            }
            // Check if there are responses for this question in the current page's responses
            return currentPageResponse && currentPageResponse.answers.hasOwnProperty(question.value) && currentPageResponse.answers[question.value].length > 0;
        });

        // Disable the button if there are no responses for all mandatory questions
        setIsNextButtonDisabled(!pageHasResponses || !allQuestionsAnswered);
    }, [activeStep, pages, responses]);


    const handleNext = () => {
        if (activeStep < pages.length - 1) {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        } else {
            onSubmit(responses);
        }
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    return (
        <div className='relative h-screen flex flex-col justify-between'>
            <div className='mb-8 overflow-y-auto'>
                {pages.map((page, index) => (
                    <div key={index} className={activeStep === index ? 'block' : 'hidden'}>
                        <SurveyPage
                            data={page}
                            visible={true}
                            updateResponse={updateResponse}
                        />
                    </div>
                ))}
            </div>
            <div className='mx-auto mb-[250px] w-[400px]'>
                <MobileStepper
                    variant="dots"
                    steps={pages.length}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            onClick={handleNext}
                            style={{ backgroundColor: (isNextButtonDisabled ? "#CCCCCC" : "#1AAB8C"), color: "#fff" }}
                            disabled={isNextButtonDisabled}
                        >
                            {activeStep === pages.length - 1 ? 'Finalizar' : 'Siguiente'}
                        </Button>
                    }
                    backButton={
                        <Button
                            style={{ backgroundColor: (activeStep === 0 ? "#fff" : "#1AAB8C"), color: "#fff" }}
                            onClick={handleBack}
                            disabled={activeStep === 0}>Atrás</Button>
                    }
                />
            </div>
        </div>
    );
};
