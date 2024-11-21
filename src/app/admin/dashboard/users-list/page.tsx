"use client";

import { blockUserRequest } from '@/actions/admin/block-user';
import { unblockUserRequest } from '@/actions/admin/unblock-user';
import { getAllProfiles } from '@/actions/profile/get-all-profiles';
import { Button, ButtonGroup, Spinner, Table, TextInput, Pagination, Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from 'react-toastify';


type Props = {};

export default function Page({ }: Props) {
    const [profiles, setProfiles] = useState<any>([]);
    const [filteredProfiles, setFilteredProfiles] = useState<any>([]);
    const [isError, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const profilesPerPage = 10;

    useEffect(() => {
        setLoading(true);

        getAllProfiles()
            .then((data) => {
                setProfiles(data);
                setFilteredProfiles(data);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
                console.log(profiles);
            });
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = profiles.filter((profile: any) =>
            Object.values(profile)
                .join(' ')
                .toLowerCase()
                .includes(term)
        );
        setFilteredProfiles(filtered);
        setCurrentPage(1); // Reset to the first page
    };

    const currentProfiles = filteredProfiles.slice(
        (currentPage - 1) * profilesPerPage,
        currentPage * profilesPerPage
    );

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<any>();

    const handleConfirmBlock = async (reason: string) => {

        try {
            await blockUserRequest(selectedUser.user_id, reason);
            toast.success("User blocked successfully");
            setSelectedUser(null);
            setTimeout(() => {
                window.location.reload();
            }, 100);
        } catch (e) {
            toast.error("Something went wrong, try again");
        }

    }

    const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

    const handleUnblockUser = (user: any) => {
        setSelectedUser(user);
        setOpenConfirmModal(true);
    }

    const handleConfirmUnblock = async (reason: string) => {
        try {
            await unblockUserRequest(selectedUser.user_id, reason);
            toast.success("User unblocked successfully");
            setSelectedUser(null);
            setTimeout(() => {
                window.location.reload();
            }, 200);
        } catch (e) {
            toast.error("Something went wrong, try again");
        }

    }

    const handleDisableUser = (user: any) => {
        setSelectedUser(user);
        setOpenModal(true);
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-red-500">Error fetching profiles.</h1>
            </div>
        );
    }

    if (!profiles.length) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1>No profiles yet</h1>
            </div>
        );
    }

    return (
        <div className="p-4">
            <TextInput
                placeholder="Search profiles..."
                value={searchTerm}
                onChange={handleSearch}
                className="mb-4 w-full"
            />

            <div className="overflow-x-auto">
                <Table>
                    <Table.Head>
                        <Table.HeadCell>ID</Table.HeadCell>
                        <Table.HeadCell>User ID</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Lastname</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Phone</Table.HeadCell>
                        <Table.HeadCell>City</Table.HeadCell>
                        <Table.HeadCell>Country</Table.HeadCell>
                        <Table.HeadCell>Role</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {currentProfiles.map((profile: any, idx: number) => (
                            <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>{profile.id}</Table.Cell>
                                <Table.Cell>{profile.user_id}</Table.Cell>
                                <Table.Cell>{profile.first_name}</Table.Cell>
                                <Table.Cell>{profile.last_name}</Table.Cell>
                                <Table.Cell>{profile.email}</Table.Cell>
                                <Table.Cell>{profile.phone}</Table.Cell>
                                <Table.Cell>{profile.city}</Table.Cell>
                                <Table.Cell>{profile.country}</Table.Cell>
                                <Table.Cell>{profile.type}</Table.Cell>
                                <Table.Cell>{profile.isActive ? "Active" : "Inactive"}</Table.Cell>
                                <Table.Cell>
                                    <ButtonGroup outline>
                                        <Button color="gray" size="xs" onClick={() => handleUnblockUser(profile)}>
                                            Enable
                                        </Button>
                                        <Button color="gray" size="xs" onClick={() => handleDisableUser(profile)}>
                                            Disable
                                        </Button>
                                    </ButtonGroup>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredProfiles.length / profilesPerPage)}
                onPageChange={setCurrentPage}
                className="mt-4"
            />

            <BlockUserModal openModal={openModal} handleClose={() => setOpenModal(false)} handleConfirm={handleConfirmBlock} />
            <UnblockUserModal openModal={openConfirmModal} handleClose={() => setOpenConfirmModal(false)} handleConfirm={handleConfirmUnblock} />
        </div>
    );
}


type ModalProps = {
    openModal: boolean;
    handleClose: () => void;
    handleConfirm: (reason: string) => void;
}
function BlockUserModal({ openModal, handleClose, handleConfirm }: ModalProps) {
    const [reason, setReason] = useState<string>("");

    return (<Modal show={openModal} size="md" onClose={handleClose} popup>
        <Modal.Header />
        <Modal.Body>
            <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to block this user?
                </h3>
                <TextInput placeholder='Reason why...' className='mb-4' value={reason} onChange={(e) => setReason(e.target.value)}></TextInput>
                <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={() => handleConfirm(reason)} disabled={!reason}>
                        {"Yes, I'm sure"}
                    </Button>
                    <Button color="gray" onClick={handleClose}>
                        No, cancel
                    </Button>
                </div>
            </div>
        </Modal.Body>
    </Modal>)
}


type ModalConfirmProps = {
    openModal: boolean;
    handleClose: () => void;
    handleConfirm: (reason: string) => void;
}
function UnblockUserModal({ openModal, handleClose, handleConfirm }: ModalConfirmProps) {
    const [reason, setReason] = useState<string>("");

    return (<Modal show={openModal} size="md" onClose={handleClose} popup>
        <Modal.Header />
        <Modal.Body>
            <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to unblock this user?
                </h3>
                <TextInput placeholder='Reason why...' className='mb-4' value={reason} onChange={(e) => setReason(e.target.value)}></TextInput>
                <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={() => handleConfirm(reason)} disabled={!reason}>
                        {"Yes, I'm sure"}
                    </Button>
                    <Button color="gray" onClick={handleClose}>
                        No, cancel
                    </Button>
                </div>
            </div>
        </Modal.Body>
    </Modal>)
}