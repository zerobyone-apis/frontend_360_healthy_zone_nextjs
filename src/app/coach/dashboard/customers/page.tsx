import { getDashboardStats } from '@/actions/coach/dashboard';
import React from 'react'

type Props = {}

export default async function Page({ }: Props) {
    const stats = await getDashboardStats();

    return (
        <div>
            {JSON.stringify(stats.full_assignments)}
        </div>
    )
}