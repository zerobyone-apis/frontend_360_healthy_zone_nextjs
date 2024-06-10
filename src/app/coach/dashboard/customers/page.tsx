import { getDashboardStats } from '@/actions/coach/dashboard';
import CustomerCard from '@/app/ui/coach/customer-card';
import React from 'react'

type Props = {}

export default async function Page({ }: Props) {
    const stats = await getDashboardStats();
    console.log(stats);

    if (!stats) return null;
    return (
        <div className="gap-3">
            {stats.full_assignments.map((assigned: any) => {
                return (<CustomerCard key={assigned.id} client={assigned.client}/>)
            })}
        </div>
    )
}