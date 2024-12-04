import { ProgressResponseDTO } from '@/interfaces'
import { Button, Table } from 'flowbite-react'
import React, { useState } from 'react'
import ProgressModal from '../dashboard/goal/progress-modal'
import { ButtonGroup } from '@mui/material'
import { AssignModal } from './assign-modal'

type Props = {
    clients: any
}

export default function AssignUsersView({ clients }: Props) {
    const [selectedClient, setSelectedClient] = useState<any>();
    const [showAssignModal, setShowAssignModal] = useState<boolean>();

    const assignClient = (client: any) => {
        setSelectedClient(client);
        setShowAssignModal(true);
    }

    const selectedClientHeaders = ["id", "first_name", "last_name", "email", "phone", "client_status"]

    return (
        <div className="overflow-x-auto">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Client ID</Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Lastname</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Phone</Table.HeadCell>
                    <Table.HeadCell>Client Status</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {clients.map((client: any, idx: number) => (
                        <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            {selectedClientHeaders.map((property, index) => (
                                <Table.Cell key={index}>{client[property]}</Table.Cell>
                            ))}
                            <Table.Cell>
                                <Button color="gray" onClick={() => assignClient(client)}>Assign</Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            {selectedClient && <AssignModal client={selectedClient} handleClose={() => setSelectedClient(null)} />}
        </div>
    )
}