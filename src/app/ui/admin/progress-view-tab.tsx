import { ProgressResponseDTO } from '@/interfaces'
import { Button, Table } from 'flowbite-react'
import React, { useState } from 'react'
import ProgressModal from '../dashboard/goal/progress-modal'

type Props = {
    progresses: any
}

export default function ProgressViewTab({ progresses }: Props) {

    const [progressSelected, setProgressSelected] = useState<ProgressResponseDTO>()
    const [openProgressModal, setOpenProgressModal] = useState(false);
    const handleCloseFn = () => {
        setOpenProgressModal(false);
    }

    const handleSeeProgress = (progress: ProgressResponseDTO) => {
        setProgressSelected(progress);
        setOpenProgressModal(true)
    }

    const selectedProgressProperties: (keyof ProgressResponseDTO)[] = ["id", "client_id", "goal_id", "delivery_status", "created_on", "updated_on", "description_advance", "professionalComment"]

    return (
        <div className="overflow-x-auto">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Progress ID</Table.HeadCell>
                    <Table.HeadCell>Client ID</Table.HeadCell>
                    <Table.HeadCell>Goal ID</Table.HeadCell>
                    <Table.HeadCell>Delivery Status</Table.HeadCell>
                    <Table.HeadCell>Created on</Table.HeadCell>
                    <Table.HeadCell>Updated on</Table.HeadCell>
                    <Table.HeadCell>Customer Comment</Table.HeadCell>
                    <Table.HeadCell>Feedback</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {progresses.map((progress: any, idx: number) => (
                        <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            {selectedProgressProperties.map((property, index) => (
                                <Table.Cell key={index}>{progress[property]}</Table.Cell>
                            ))}
                            <Table.Cell>
                                <Button color="gray" onClick={() => handleSeeProgress(progress)}>Details</Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            {progressSelected && <ProgressModal progress={progressSelected} handleCloseFn={handleCloseFn} open={openProgressModal} adminView />}
        </div>
    )
}