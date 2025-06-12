"use client"
import { getAdminActionsSummary } from '@/actions/admin/dashboard/get-actions-summary';
import AssignUsersView from '@/app/ui/admin/assign-users-view';
import ProgressViewTab from '@/app/ui/admin/progress-view-tab';
import { AdminActionsSummary, ProgressResponseDTO } from '@/interfaces';
import { Spinner, Tabs } from 'flowbite-react'
import React, { useEffect, useState } from 'react'

type Props = {}

export default function Page({ }: Props) {

    const [actions, setActions] = useState<AdminActionsSummary>();
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchActionsSummary = async () => {
        setLoading(true)
        getAdminActionsSummary().then((data) => {
            setActions(data);
        }).catch((e) => {
            setError(true);
        }).finally(() => {
            setLoading(false)
        });
    }
    useEffect(() => {
        fetchActionsSummary();
    }, []);

    return (
        <>
            <Tabs aria-label="Default tabs" variant="default">
                <Tabs.Item active title="Users to assign">
                    {loading ?
                        <div className='h-full flex justify-center items-center'>
                            <Spinner size='lg' />
                        </div> :
                        <>{actions?.to_assign_clients_to_professionals.length ? <AssignUsersView clients={actions?.to_assign_clients_to_professionals} /> :
                            <h5 className='text-xl text-jungle-green-500'>All done here!</h5>}</>
                    }
                </Tabs.Item>
                <Tabs.Item title="Progresses & Feedback">
                    {loading ?
                        <div className='h-full flex justify-center items-center'>
                            <Spinner size='lg' />
                        </div> :
                        <>{actions?.to_approvals_client_progresses.length ? <ProgressViewTab progresses={actions?.to_approvals_client_progresses} /> :
                            <h5 className='text-xl text-jungle-green-500'>All done here!</h5>}</>
                    }
                </Tabs.Item>
            </Tabs>
        </>
    )
}