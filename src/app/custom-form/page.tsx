"use client";
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import NutritionistQuestions from "@/data/questions/nutritionist-questions";
import DemographicQuestions from "@/data/questions/demographic-questions"

import "swiper"
import 'swiper/css/navigation';
import "./swipper.css";
import { QuestionDTO } from '@/interfaces/questions';
import TextCard from '../ui/custom-form/text-card';
import FieldsCard from '../ui/custom-form/fields-card';

type Props = {}

export default function Page({ }: Props) {

    const questions: QuestionDTO[] = [...DemographicQuestions(), ...NutritionistQuestions()];

    return (
        <div className='relative h-screen flex flex-col justify-between'>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
                navigation={true}
                watchSlidesProgress={true}
            >
                {questions.map((question) =>
                    <SwiperSlide key={question.name}>
                        <div className='h-full flex flex-col p-10 w-full'>
                            <div className='top-0 text-center h-full p-5'>
                                {/* <Image src={question.img || ""} alt={question.name} width={0} height={0}></Image> */}
                                <h3 className='font-semibold text-2xl text-jungle-green-500'> {question.title} </h3>
                                <h5 className='text-lg text-gray-700'> {question.subtitle} </h5>
                            </div>
                            <div>
                                {question.type === "fields" && <FieldsCard question={question} />}
                            </div>
                        </div>
                    </SwiperSlide>)}
            </Swiper>
        </div>
    )
}