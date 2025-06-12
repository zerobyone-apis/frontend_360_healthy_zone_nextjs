"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './preview-section.css';

type Props = {}

export default function PreviewSection({ }: Props) {
    return (
        <section className="h-screen min-h-full w-full p-6 relative" id="preview">
            <div className='text-center mb-5'>
                <h1 className='text-3xl text-jungle-green-500 font-semibold'>Discover our plataform</h1>
                <h3 className='text-xl text-gray-400 font-bold'>Explore how our platform works here...</h3>
            </div>
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[454px] max-w-[341px] md:h-[682px] md:max-w-[512px]">
                <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                <div className="rounded-[2rem] overflow-hidden h-[426px] md:h-[654px] bg-white dark:bg-gray-800">
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={false}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <img src="/imgs/preview/preview-1.png" className="dark:hidden h-[426px] md:h-[654px]" alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/imgs/preview/preview-2.png" className="dark:hidden h-[426px] md:h-[654px]" alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/imgs/preview/preview-3.png" className="dark:hidden h-[426px] md:h-[654px]" alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/imgs/preview/preview-4.png" className="dark:hidden h-[426px] md:h-[654px]" alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/imgs/preview/preview-5.png" className="dark:hidden h-[426px] md:h-[654px]" alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/imgs/preview/preview-6.png" className="dark:hidden h-[426px] md:h-[654px]" alt="" />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>

        </section>
    )
}