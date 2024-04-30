import React, { useEffect, useState } from 'react';
import { Stepper, Step, StepLabel, Button } from '@mui/material';
import { SURVEY_PAGE_TYPES, SurveyPageType } from './survey-page';
import { SurveyPage } from './survey-page';
import useSurvey from '../hooks/useSurvey';
import { QuestionCardType } from '../question-card/question-card';

interface SurveyComponentProps {
    pages: SurveyPageType[];
}

const SurveyComponent: React.FC<SurveyComponentProps> = ({ pages }) => {
    const [activeStep, setActiveStep] = useState(0);
    const { responses, updateResponse } = useSurvey();
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

    useEffect(() => {
        const currentPage = pages[activeStep];
        if (currentPage.type === SURVEY_PAGE_TYPES.INFO) {
            setIsNextButtonDisabled(false);
            return;
        }

        const allQuestionsAnswered = currentPage.questions.every((question: QuestionCardType) => {
            if (question.optional) {
                return true;
            }
            return responses.some(response => response.name === currentPage.name && response.answers[question.value]);
        });
        setIsNextButtonDisabled(!allQuestionsAnswered);
    }, [activeStep, pages, responses]);

    const handleNext = () => {
        if (activeStep < pages.length - 1) {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleSubmit = () => {
        console.log('Respuestas:', responses);
    };

    const handlePageChange = (newStep: number) => {
        setActiveStep(newStep);
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
            <div className='absolute bottom-[260px] left-0 right-0 flex justify-center mb-8'>
                <Button disabled={activeStep === 0} onClick={handleBack} className='mr-4'>Atrás</Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    style={{ backgroundColor: "#1AAB8C" }}
                    disabled={isNextButtonDisabled}
                    className='mr-4'
                >
                    {activeStep === pages.length - 1 ? 'Finalizar' : 'Siguiente'}
                </Button>
                {activeStep === pages.length && (
                    <Button onClick={handleSubmit}>Enviar respuestas</Button>
                )}
            </div>
            <div className='w-fit mx-auto mb-[180px]'>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {pages.map((page, index) => (
                        <Step key={index}>
                            <StepLabel style={{ marginTop: '10px', }}>{page.title}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
        </div>
    );
};

export default SurveyComponent;