/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import QuestionCard, { QuestionCardType } from '../question-card/question-card';

export const SURVEY_PAGE_TYPES = {
    INFO: "info",
    QUESTION: "question",
};

export type SurveyPageType = {
    id: number,
    name: string,
    title: string,
    subtitle?: string,
    img?: string,
    type: string,
    questions: QuestionCardType[],
};

type SurveyPageProps = {
    data: SurveyPageType;
    visible: boolean;
    updateResponse: (name: string, answers: any) => void;
};
export const SurveyPage = ({
    data,
    updateResponse,
    visible
}: SurveyPageProps) => {
    const [answers, setAnswers] = useState<{ [key: string]: string[] }>({});

    useEffect(() => {
        if (data.questions.length) {
            updateResponse(data.name, answers);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [answers])

    const getAnswers = (name: string, value: string[]) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [name]: value
        }));
    };

    return (
        <section className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg xl:p-8 dark:bg-gray-800 dark:text-white" >
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 className="mb-4 text-2xl tracking-tight font-extrabold text-[#137360] dark:text-white select-none">{data.title}</h2>

                    <>
                        {data?.subtitle && <p className="mb-5 font-light text-[#5A6823] sm:text-xl dark:text-gray-400">{data?.subtitle}</p>}
                        {data?.img && (
                            <img
                                src={data?.img}
                                alt="Información"
                                className="w-full max-w-md mx-auto mb-8 rounded-3xl"
                            />
                        )}
                    </>

                    <div className=''>
                        {data.questions && data.questions.map((question, index) =>
                            <QuestionCard data={question} key={index} onSubmitOptions={getAnswers} />
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SurveyPage;