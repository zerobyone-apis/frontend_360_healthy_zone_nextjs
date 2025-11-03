"use client"
import { assignClientToProfessional } from "@/actions/admin/assign-professional";
import { getAdminActionsSummary } from "@/actions/admin/dashboard/get-actions-summary";
import { getCoachesList } from "@/actions/admin/get-coaches-list";
import { getNutritionistsList } from "@/actions/admin/get-nutritionists-list";
import DataTable from "@/app/ui/data-table";
import { CoachDto } from "@/interfaces/coach.dto";
import { NutritionistDto } from "@/interfaces/nutritionist.dto";
import { AdminActionsSummary } from "@/interfaces/summary_admin";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
    const [actions, setActions] = useState<AdminActionsSummary>();
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState<any>();
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        getAdminActionsSummary().then((data) => {
            setActions(data);
        }).catch((e) => {
            setError(true);
        });
    }, []);

    // Clients to assign to professionals

    const headingsClients = [
        { key: "id", text: "ID" },
        { key: "name", text: "Name" },
        { key: "email", text: "Email" },
        { key: "phone", text: "Phone" },
        { key: "client_status", text: "Status" }
    ];

    const dataClients = actions?.to_assign_clients_to_professionals.map((client) => {
        return [
            { key: "id", value: client.id },
            { key: "name", value: client.first_name },
            { key: "email", value: client.email },
            { key: "phone", value: client.phone },
            { key: "client_status", value: client.client_status }
        ]
    }) || null;

    const assignClient = (client: any) => {
        setSelectedClient(actions?.to_assign_clients_to_professionals.find((c) => c.id === client[0].value));
        setShowAssignModal(true);
    }

    const approveFeedback = (progress: any) => {
        console.log(progress);
    }

    // Progress of clients

    const headingsProgress = [
        { key: "id", text: "ID" },
        { key: "client_id", text: "Client ID" },
        { key: "goal_id", text: "Goal ID" },
        { key: "delivery_status", text: "Delivery Status" },
        { key: "initial_height", text: "Initial Height" },
        { key: "initial_weight", text: "Initial Weight" },
        { key: "initial_body_fat_percentage", text: "Initial Body Fat Percentage" },
        { key: "current_weight", text: "Current Weight" },
        { key: "target_weight", text: "Target Weight" },
        { key: "current_body_fat_percentage", text: "Current Body Fat Percentage" },
        { key: "target_body_fat_percentage", text: "Target Body Fat Percentage" },
        { key: "created_on", text: "Created On" },
        { key: "updated_on", text: "Updated On" },
    ];

    const dataProgress = actions?.to_approvals_client_progresses.map((progress) => {
        return [
            { key: "id", value: progress.id },
            { key: "client_id", value: progress.client_id },
            { key: "goal_id", value: progress.goal_id },
            { key: "delivery_status", value: progress.delivery_status },
            { key: "initial_height", value: progress.initial_height },
            { key: "initial_weight", value: progress.initial_weight },
            { key: "initial_body_fat_percentage", value: progress.initial_body_fat_percentage },
            { key: "current_weight", value: progress.current_weight },
            { key: "target_weight", value: progress.target_weight },
            { key: "current_body_fat_percentage", value: progress.current_body_fat_percentage },
            { key: "target_body_fat_percentage", value: progress.target_body_fat_percentage },
            { key: "created_on", value: progress.created_on },
            { key: "updated_on", value: progress.updated_on },
        ]
    }) || null;

    const handleCloseAssignModal = () => {
        setShowAssignModal(false);
        setSelectedClient(null);
    }

    if (error) {
        return (<div className="flex flex-col gap-2 justify-center items-center h-full">
            <h3 className="text-lg">An error occurred while fetching data</h3>
            <p className="text-sm text-gray-500">Please try again later.</p>
        </div>)
    }
    return (
        <div className="flex flex-col gap-3">
            {dataClients?.length ? <DataTable title={"Clients to assign: " + dataClients.length} headings={headingsClients} data={dataClients} actionTitle="Assign" actionFunction={assignClient}></DataTable> :
                <CheckCard content="All clients have been assigned"></CheckCard>}
            {dataProgress?.length ? <DataTable headings={headingsProgress} data={dataProgress} actionTitle="Approve" actionFunction={approveFeedback}></DataTable>
                :
                <CheckCard content="All progress has been approved"></CheckCard>}
            {showAssignModal && selectedClient && <AssignModal client={selectedClient} handleClose={handleCloseAssignModal}></AssignModal>}
        </div>
    );
}

function CheckCard({ content }: { content: string }) {
    return (
        <div className="w-full flex justify-center bg-white p-4 shadow-md rounded-lg">
            <h4 className="text-lg text-jungle-green-500"> <i className="bx bx-check"></i> {content} </h4>
        </div>
    );
}

function AssignModal({ client, handleClose }: { client?: any, handleClose: () => void }) {
    const [role, setRole] = useState<string>("");
    const [nutritionists, setNutritionists] = useState<NutritionistDto[]>([]);
    const [coaches, setCoaches] = useState<CoachDto[]>([]);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        getCoachesList().then((coaches) => {
            const list = coaches.filter((coach) => coach.remaining_clients >= 0 && coach.remaining_clients < coach.limit_clients);
            setCoaches(list)
        }).catch(() => {
            setError(true);
        })

        getNutritionistsList().then((nutritionists) => {
            const list = nutritionists.filter((nutritionist) => nutritionist.active_clients_remaining >= 0 && nutritionist.active_clients_remaining < nutritionist.limit_clients);
            setNutritionists(list);
        }).catch((e) => {
            setError(true)
        })

    }, []);


    const handleSelect = async (professional_id: string | number) => {
        const obj: { coach_id: string | number | null, nutritionist_id: string | number | null } = {
            coach_id: null,
            nutritionist_id: null,
        }

        if (role === "coaches") {
            obj.coach_id = professional_id;
        } else {
            obj.nutritionist_id = professional_id;
        }
        try {
            await assignClientToProfessional({
                client_id: client.id,
                ...obj
            });

            toast.success("The client has been assigned to the professional");
            setTimeout(() => {
                window.location.reload();
            }, 100);

            handleClose();
        } catch (e) {
            handleClose();
            toast.error("Error assigning this client, please try later")
        }


    }

    if (error) {
        return (
            <div className="flex flex-col gap-2 justify-center items-center h-full">
                <h3 className="text-lg">An error occurred while fetching data</h3>
                <p className="text-sm text-gray-500">Please try again later.</p>
            </div>
        )
    }

    return (
        <dialog id="select-modal" tabIndex={-1} aria-hidden="false"
            className="flex bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Assign {client.first_name} to professional
                        </h3>
                        <button onClick={handleClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="select-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        {
                            role === "" ? <p className="text-gray-500 dark:text-gray-400 mb-4">Select a role:</p> :
                                <div className="inline-flex justify-center text-center mb-4 gap-2">
                                    <i className="bx bx-left-arrow-alt" onClick={() => setRole("")}></i>
                                    <p className="text-gray-500 dark:text-gray-400 text-center">Select a professional:</p>
                                </div>
                        }
                        <ul className="space-y-4 mb-4">
                            {role === "" &&
                                <>
                                    <li aria-disabled={!nutritionists.length} onClick={() => setRole("nutritionists")}
                                        className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                        <div className="block">
                                            <div className="w-full text-lg font-semibold">Nutritionist <span className="bg-jungle-green-500 rounded-full px-2 text-white py-1 text-sm">{nutritionists.length}</span></div>
                                        </div>
                                        <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" /></svg>
                                    </li>
                                    <li aria-disabled={!coaches.length} onClick={() => setRole("coaches")}
                                        className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100">
                                        <div className="block">
                                            <div className="w-full text-lg font-semibold">Coaches <span className="bg-jungle-green-500 rounded-full px-2 text-white py-1 text-sm">{coaches.length}</span></div>
                                        </div>
                                        <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" /></svg>
                                    </li>
                                </>}
                            {role === "nutritionists" &&
                                nutritionists.map((professional) =>
                                    <li key={professional.email}
                                        onClick={() => handleSelect(professional.id)}
                                        className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                        <div className="block">
                                            <div className="w-full text-lg font-semibold">{professional.first_name}</div>
                                            <div className="w-full text-gray-500 dark:text-gray-400">{professional.email}</div>
                                        </div>
                                        <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" /></svg>
                                    </li>)
                            }
                            {role === "coaches" && coaches.map((professional) =>
                                <li key={professional.email}
                                    onClick={() => handleSelect(professional.id)}
                                    className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">{professional.first_name}</div>
                                        <div className="w-full text-gray-500 dark:text-gray-400">{professional.email}</div>
                                    </div>
                                    <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" /></svg>
                                </li>)
                            }
                        </ul>
                        {/* <button className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Assign
                        </button> */}
                    </div>
                </div>
            </div>
        </dialog>
    );
}