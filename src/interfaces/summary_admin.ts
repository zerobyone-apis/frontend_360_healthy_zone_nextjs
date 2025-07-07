/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoalResponseDTO } from "./goals";
import { ProgressResponseDTO } from "./progress";

export interface SummaryAdmin {
    amount_of_active_users: number;
    amount_of_inactive_users: number;
    amount_of_active_clients: number;
    amount_of_inactive_clients: number;
    amount_of_active_coaches: number;
    amount_of_inactive_coaches: number;
    amount_of_active_nutritionist: number;
    amount_of_inactive_nutritionist: number;
    amount_of_client_progress_to_approval_today: number;
    to_approval_notifications: number;
    to_approval_client_progresses: number;
    to_assign_clients_to_professionals: number;
    success_and_pending_payments: {
        amount_of_success_payments: number;
        amount_of_pending_payments: number;
        payments: Payment[]; // You can replace 'any' with a more specific type if you have one
    };
    to_approval_notifications: number,
    to_assign_clients_to_professionals: number,
    to_approvals_client_progresses: number,
}

export interface Payment {
    id: string;
    paypal_subscription_id: string;
    amount: number;
    status: string;
    start_time: string;
    finish_time: string | null;
    next_billing_time: string | null;
    last_payment_date: string | null;
}

export interface UserMetrics {
    day: number;
    month: string;
    amount: number;
}

// todo: esta llamada no se hace y se toman los valores del summary.
export interface AdminActionsSummary {
    "to_approval_notifications": any[],
    "to_approvals_client_progresses": ProgressResponseDTO[],
    "to_assign_clients_to_professionals": Customer[]
}


export interface Customer 
    {
        "id": number,
        "first_name": string,
        "last_name": string,
        "phone": string,
        "email": string,
        "city": string,
        "initial_height": number,
        "initial_weight": number,
        "current_weight": number,
        "country": string,
        "description": string,
        "profile_picture": string,
        "address": string,
        "client_status": string,
        "subscription": Subscription,
        "nutritionist_id": null | number,
        "coach_id": null | number,
        "goals": GoalResponseDTO[],
        "diets": any[],
        "training": any[],
        "goalClients": any[],
        "is_blocked": boolean,
        "isActive": boolean
    }

    export interface Subscription {
        id: string;
        client_id: string;
        product_id: string;
        paypal_subscription_id: string;
        paypal_plan_id: string;
        status: string;
        quantity: string;
        status_update_time: string;
        start_time: string;
        finish_time: string | null;
        renewal: boolean;
        ended_at: string | null;
        renewal_cancelled_at: string | null;
        paypal_create_time: string;
        paypal_update_time: string | null;
        plan_overridden: boolean;
        shipping_amount: {
            value: string;
            currency_code: string;
        };
        subscriber: {
            email_address: string | null;
            name: string | null;
            shipping_address: string | null;
        };
        billing_info: {
            quantity: string;
            subscriber: string | null;
            create_time: string;
            plan_overridden: boolean;
            shipping_amount: {
                currency_code: string;
                value: string;
            };
            start_time: string;
            update_time: string | null;
            billing_info: string | null;
            links: {
                href: string;
                rel: string;
                method: string;
                encType: string | null;
            }[];
            id: string;
            plan_id: string;
            status: string;
            status_update_time: string | null;
        };
        links: {
            edit: {
                href: string;
                rel: string;
                method: string;
                encType: string | null;
            };
            approve: {
                href: string;
                rel: string;
                method: string;
                encType: string | null;
            };
            self: {
                href: string;
                rel: string;
                method: string;
                encType: string | null;
            };
        };
        server_created_on: string;
        is_active: boolean;
    }
