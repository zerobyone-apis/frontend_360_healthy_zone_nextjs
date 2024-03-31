import { cookies } from "next/headers";
import { User } from '@/interfaces/user';
import CounterChart from '@/app/ui/dashboard/counter-chart';
import { getTrainingsByUserID } from '@/actions/trainings/training-actions';
import TrainingResumeCard from '@/app/ui/dashboard/trainings/training-resume-card';

export default async function Page() {

    const cookieStore = cookies();
    const user: User = JSON.parse(cookieStore.get('user')?.value || '{}');
    const userId = Number(user.user?.userId);
    const trainings: any | null = await getTrainingsByUserID(userId);


    return (
        <div className='grid grid-cols-4 gap-2'>
            <div className='col-span-4 md:col-span-1 grid grid-cols-2 max-h-[100px] gap-1 md:gap-2'>
                <CounterChart cols="col-span-1 md:col-span-2" bg="bg-jungle-green-100"
                    border="border-jungle-green-500" title='✅ COMPLETED ✅' count={trainings.filter.length} />

                <CounterChart cols="col-span-1 md:col-span-2" bg="bg-yellow-green-100"
                    border="border-yellow-green-500" title='🍏 TOTAL TRAININGS 🍏' count={trainings.length} />
            </div>
            <div className="flex flex-col gap-3 col-span-4 md:col-span-3 md:max-h-full md:overflow">
                {
                    trainings.length > 0 &&
                    trainings.map((training: any) => <TrainingResumeCard key={training.training_id} training={training} />)
                }
            </div>
        </div>
    );
}