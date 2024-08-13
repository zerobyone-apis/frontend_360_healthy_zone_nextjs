import { getAllProfiles } from '@/actions/profile/get-all-profiles'
import DataTable from '@/app/ui/data-table'
import React from 'react'

type Props = {}

export default async function Page({ }: Props) {
    const profiles = await getAllProfiles();
    const headings = [{ key: "id", text: "ID" },
    { key: "user_id", text: "User ID" },
    { key: "first_name", text: "Name" },
    { key: "last_name", text: "Lastname" },
    { key: "email", text: "Email" },
    { key: "phone", text: "Phone" },
    { key: "city", text: "City" },
    { key: "country", text: "Country" },
    { key: "type", text: "Role" },
    { key: "is_active", text: "Status" }];

    const data = profiles.map((profile) => {
        return [
            { key: "id", value: profile.id },
            { key: "user_id", value: profile.user_id },
            { key: "name", value: profile.first_name },
            { key: "last_name", value: profile.last_name },
            { key: "email", value: profile.email },
            { key: "phone", value: profile.phone },
            { key: "city", value: profile.city },
            { key: "country", value: profile.country },
            { key: "type", value: profile.type },
            { key: "is_active", value: profile.isActive ? "Active" : "Blocked" }
        ]
    }) || [];

    return (
        <div>
            <DataTable title={"Total users: " + profiles.length} headings={headings} data={data}></DataTable>
        </div>
    )
}