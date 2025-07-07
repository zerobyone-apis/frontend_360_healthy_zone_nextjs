import React from "react";
import { Payment } from "@/interfaces/summary_admin";

type Props = {
    payments: Payment[];
};

export default function RecentPaymentsTable({ payments }: Props) {
    const latest = payments.slice(0, 5);
    return (
        <div className="overflow-auto bg-white rounded shadow">
            <table className="min-w-full text-sm text-left text-gray-500">
                <thead className="text-xs uppercase text-gray-700 bg-gray-50">
                    <tr>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2">Last payment</th>
                    </tr>
                </thead>
                <tbody>
                    {latest.map((p) => (
                        <tr key={p.id} className="bg-white border-b">
                            <td className="px-4 py-2">{p.status}</td>
                            <td className="px-4 py-2">${p.amount}</td>
                            <td className="px-4 py-2">
                                {p.last_payment_date ? new Date(p.last_payment_date).toLocaleDateString() : "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
