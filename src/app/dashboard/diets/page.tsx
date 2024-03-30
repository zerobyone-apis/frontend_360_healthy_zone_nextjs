"use client"
import React, { useEffect, useState } from 'react';
import DietResumeCard from '@/app/ui/dashboard/diets/diet-resume-card';
import { getAllDietsByUserID } from '@/actions/diets/diet-actions';
import Cookies from "js-cookie";
import { User } from '@/interfaces/user';
import { DietResponseDTO } from '@/interfaces/diets';
import DietCounterChart from '@/app/ui/dashboard/counter-chart';

export default function Page() {
  const [diets, setDiets] = useState<DietResponseDTO[]>([]);

  const user: User = JSON.parse(Cookies.get('user') || '{}');
  const userId = Number(user.user?.userId);

  useEffect(() => {
    async function fetchDiets() {
      try {
        const resp = await getAllDietsByUserID(userId);
        setDiets(resp);
      } catch (error) {
        console.error('Error fetching diets:', error);
      }
    }

    fetchDiets();
  }, [userId]);

  return (
    <div className='grid grid-cols-4 gap-2'>
      <div className='col-span-4 md:col-span-1 grid grid-cols-2 max-h-[100px] gap-1 md:gap-2'>
        <DietCounterChart cols="col-span-1 md:col-span-2" bg="bg-jungle-green-100"
          border="border-jungle-green-500" title='✅ COMPLETED ✅' count={diets.filter.length} />

        <DietCounterChart cols="col-span-1 md:col-span-2" bg="bg-yellow-green-100"
          border="border-yellow-green-500" title='🍏 TOTAL DIETS 🍏' count={diets.length} />
      </div>
      <div className="flex flex-col gap-3 col-span-4 md:col-span-3 md:max-h-full md:overflow">
        {diets.length > 0 &&
          diets.map((diet: DietResponseDTO) => <DietResumeCard key={diet.diet_id} diet={diet} />)}
      </div>
    </div>
  );
}