export interface NotificationDto {
	id: number;
	user_id: number;
	emitted_by: number | null;
	retrieved_by: number | null;
	typeEvent: string;
	message: string;
	flow_event: string;
	status: string;
	isRead: boolean;
	admin_id: number | string | null;
	is_approved_by_admin: boolean;
	datetime_sent: string;
	created_on: string;
	updated_on: string | null;
}
