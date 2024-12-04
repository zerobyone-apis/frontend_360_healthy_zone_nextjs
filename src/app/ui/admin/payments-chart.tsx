"use client";
import "flowbite";
import { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { UserMetrics } from "@/interfaces/summary_admin";
import Link from "next/link";

type Props = {
	title: string;
	metrics: UserMetrics[];
	byStatus?: string;
	buttonText?: string;
	buttonLink?: string;
};

export default function GraphicChart({
	title,
	metrics,
	buttonText,
	buttonLink,
}: Props) {
	const areaChart = useRef(null);

	const totalAmount = metrics.reduce((acc, metric) => acc + metric.amount, 0);
	const amounts: number[] = [];
	const dates: string[] = [];
	metrics.forEach(metric => {
		amounts.push(metric.amount);
		dates.push(`${metric.day} ${metric.month}`);
	});

	const getOptions = () => ({
		chart: {
			height: "100%",
			maxWidth: "100%",
			type: "area",
			fontFamily: "Inter, sans-serif",
			dropShadow: {
				enabled: false,
			},
			toolbar: {
				show: false,
			},
		},
		tooltip: {
			enabled: true,
			x: {
				show: true,
			},
		},
		fill: {
			type: "gradient",
			gradient: {
				opacityFrom: 0.55,
				opacityTo: 0,
				shade: "#1C64F2",
				gradientToColors: ["#1C64F2"],
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			width: 6,
		},
		grid: {
			show: false,
			strokeDashArray: 4,
			padding: {
				left: 2,
				right: 2,
				top: 0,
			},
		},
		series: [
			{
				name: "New users",
				data: amounts,
				color: "#1A56DB",
			},
		],
		xaxis: {
			categories: dates,
			labels: {
				show: true,
			},
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
		},
		yaxis: {
			show: false,
		},
	});

	useEffect(() => {
		if (areaChart != null) {
			const chart = new ApexCharts(areaChart.current, getOptions());
			chart.render();
		}
	}, []);

	return (
		<div className=" w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
			<div className="flex justify-between">
				<div>
					<h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
						{totalAmount}
					</h5>
					<p className="text-base font-normal text-gray-500 dark:text-gray-400">
						{title}
					</p>
				</div>
				<div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">

				</div>
			</div>
			<div ref={areaChart}></div>
			<div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
				<div className="flex justify-end items-center pt-5">

					{buttonText && buttonLink && (
						<Link
							href={buttonLink}
							className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
						>
							{buttonText}
							<svg
								className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 6 10"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 9 4-4-4-4"
								/>
							</svg>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}
