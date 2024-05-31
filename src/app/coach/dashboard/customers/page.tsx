import { getDashboardStats } from '@/actions/coach/dashboard';
import CreateTrainingModal from '@/app/ui/coach/create-training-modal';
import { UserCard } from '@/app/ui/dashboard/user-card';
import React from 'react'

type Props = {}

export default async function Page({ }: Props) {
    const stats = await getDashboardStats();
    console.log(stats);

    return (
        <>
            <div className='flex flex-col gap-2'>
                {stats.full_assignments.map((stat: any) =>
                    <UserCard user={stat.client} key={stat.id} />
                )}
            </div>
            <CreateTrainingModal />
        </>
    )
}