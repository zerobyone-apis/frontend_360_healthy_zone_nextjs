"use client";

import { getAllProfiles } from '@/actions/profile/get-all-profiles';
import { Button, ButtonGroup, Spinner, Table, TextInput, Pagination } from 'flowbite-react';
import React, { useEffect, useState } from 'react';


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
                                        <Button color="gray" size="xs" onClick={() => console.log("Enable")}>
                                            Enable
                                        </Button>
                                        <Button color="gray" size="xs" onClick={() => console.log("Disable")}>
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
        </div>
    );
}
