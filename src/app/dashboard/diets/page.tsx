/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import DietResumeCard from "@/app/ui/dashboard/diets/diet-resume-card";
import Cookies from "js-cookie";
import { User } from "@/interfaces/user";
import { DietResponseDTO } from "@/interfaces/diets";
import DietCounterChart from "@/app/ui/dashboard/counter-chart";
import Image from "next/image";
import { getAllDietsByUser } from "@/actions/diets/get-all-diets-by-user";
import { toast } from "react-toastify";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function Page() {
	const [diets, setDiets] = useState<any[]>([]);
	const router = useRouter();

	const user: User = JSON.parse(Cookies.get("user") || "{}");
	const userId = Number(user.user?.userId);
	const dietsCompleted: number = diets.filter((diet) => diet.isCompleted === true).length || 0;

	useEffect(() => {
		async function fetchDiets() {
			try {
				const resp = await getAllDietsByUser();
				setDiets(resp);
			} catch (error) {
				toast.error("Error fetching diets, try later.");
				return (
					<div className="flex flex-col gap-2 justify-center items-center h-full">
						<h3 className="text-lg">An error occurred while fetching data</h3>
						<p className="text-sm text-gray-500">Please try again later.</p>
					</div>)
			}
		}

		fetchDiets();
	}, [userId]);


	return (
		<div className="grid grid-cols-4 gap-2">
			<div className="col-span-4 max-h-40">
				<div className="absolute w-full flex justify-center items-center h-40">
					<h3 className="text-3xl font-bold text-white">DIETS</h3>
				</div>
				<Image
					src={"/imgs/brooke-lark-jUPOXXRNdcA-unsplash.webp"}
					height={3648}
					width={5472}
					alt="Athletic man with a woman coach training"
					className="h-full object-cover rounded-xl"
				></Image>
			</div>
			{diets.length ? <>
				<div className="col-span-4 md:col-span-1 grid grid-cols-2 max-h-[100px] gap-1 md:gap-2">
					<DietCounterChart
						cols="col-span-1 md:col-span-2"
						bg="bg-jungle-green-100"
						border="border-jungle-green-500"
						title="✅ COMPLETED ✅"
						count={dietsCompleted}
					/>

					<DietCounterChart
						cols="col-span-1 md:col-span-2"
						bg="bg-yellow-green-100"
						border="border-yellow-green-500"
						title="🍏 TOTAL DIETS 🍏"
						count={diets.length}
					/>
				</div>
				<div className="flex flex-col gap-3 col-span-4 md:col-span-3 md:max-h-full md:overflow">
					{diets.length > 0 &&
						diets.map((diet: DietResponseDTO, index: number) => (
							<DietResumeCard key={diet.diet_id} diet={diet} index={index} />
						))}
				</div>
			</>
				: <div className="col-span-4 w-full flex items-center flex-col mt-2">
					<h5 className="text-xl text-grey-500 text-center">Hey there, waiting for your new journey yet!</h5>
					<Button className="bg-jungle-green-500 rounded text-white font-bold mt-3" onClick={() => router.push("/dashboard")}>
						Dashboard
					</Button>
				</div>
			}
		</div>
	);
}
