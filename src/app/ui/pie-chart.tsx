"use client"
import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation';
import ApexCharts from "apexcharts";

type Props = {
    stats: {
        series: number[],
        colors: string[],
        labels: string[]
    };
    title: string;
    redirect?: string;
}

/**
 * 
 * REVISAR COMPONENTE YA QUE SE ESTA RE-RENDERIZANDO VARIAS VECES
 */
export default function PieChart({ stats, title, redirect }: Props) {
    const chartDiv = useRef(null);
    const router = useRouter();
    const getChartOptions = () => {
        return {
            series: stats.series,
            colors: stats.colors,
            chart: {
                height: 200,
                width: "100%",
                type: "pie",
            },
            stroke: {
                colors: ["white"],
                lineCap: "",
            },
            plotOptions: {
                pie: {
                    labels: {
                        show: true,
                    },
                    size: "100%",
                    dataLabels: {
                        offset: -25
                    }
                },
            },
            labels: stats.labels,
            dataLabels: {
                enabled: true,
                style: {
                    fontFamily: "Inter, sans-serif",
                },
            },
            legend: {
                position: "bottom",
                fontFamily: "Inter, sans-serif",
            },
            yaxis: {
                labels: {
                    formatter: function (value: any) {
                        return value + "%"
                    },
                },
            },
            xaxis: {
                labels: {
                    formatter: function (value: any) {
                        return value + "%"
                    },
                },
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
            },
        }
    }

    useEffect(() => {
        if (typeof window != "undefined" && chartDiv != null) {
            const chart = new ApexCharts(chartDiv.current, getChartOptions());
            chart.render();
        }
    }, [chartDiv]);


    return (
        <div className="max-w-sm w-full bg-white rounded-xl shadow dark:bg-gray-800 p-4 md:p-6">
            <div className="flex justify-between items-start w-full">
                <div className="flex-col items-center text-center">
                    <div className="flex items-center mb-1">
                        <h5 className="text-xl font-bold leading-none text-gray-900  me-1">{title}</h5>
                    </div>
                </div>
                {redirect && <div className="flex justify-end items-center">
                    <button onClick={() => router.push(redirect)} className="inline-flex items-center justify-center text-gray-500 w-8 h-8 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200rounded-lg text-sm">
                        <i className='bx bxs-chevron-right text-3xl'></i>
                    </button>
                </div>}
            </div>
            <div className="py-6" ref={chartDiv}></div>
        </div>

    )
}