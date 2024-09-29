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
import FieldsCard from '../ui/custom-form/fields-card';
import { Button } from 'flowbite-react';
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import { createCustomForm } from '@/actions/customForm/create-custom-form';
import { toast } from 'react-toastify';

import { customFormStore } from '@/stores/customForm.store';
import { markFirstLogin } from '@/actions/users/mark-first-login';


type Props = {}

export default function Page({ }: Props) {
    const router = useRouter();
    const questions: QuestionDTO[] = [...DemographicQuestions(), ...NutritionistQuestions()];
    const customForm = customFormStore((state: any) => state.form);

    const handleComplete = async () => {
        //mocked firstTimeLogin tu false...
        let user = JSON.parse(Cookies.get("user") || "{}");
        user.user.firstTimeLogin = false;
        Cookies.set("user", JSON.stringify(user));

        //calling the real api to firsttimelogin to false
        try {
            await createCustomForm({ formData: customForm });
            // Api esta rota.
            // await markFirstLogin();
            router.push("/dashboard")
        } catch (e) {
            toast.error("Something went wrong")
        }

    }

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
                <SwiperSlide>
                    <div className='h-full flex flex-col p-10 w-full'>
                        <div className='top-0 text-center h-full p-5'>
                            {/* <Image src={question.img || ""} alt={question.name} width={0} height={0}></Image> */}
                            <h3 className='font-semibold text-2xl text-jungle-green-500'>Thanks for complete this form!</h3>
                            <h5 className='text-lg text-gray-700'>Now you can continue</h5>
                        </div>
                        <div className='justify-center items-center w-full flex'>
                            <Button className='bg-jungle-green-500 text-white hover:bg-jungle-green-600' onClick={handleComplete}>Go to Dashboard</Button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}