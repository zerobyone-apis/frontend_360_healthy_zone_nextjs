interface Client {
    id: number;
    edited_name: string;
    city: string;
    country: string;
    description: null | string;
    client_status: null | string;
    nutritionist_id: null | number;
    coach_id: number;
    goals: any[];
    diets: any[];
    training: any[];
    goalClients: any[];
    isActive: boolean;
}

interface FullAssignment {
    id: string;
    client: Client;
    created_on: string;
    updated_on: string | null;
    is_completed: boolean;
    is_active: boolean;
}

interface DailyTrainingDay {
    id: string;
    training_id: string;
    number_training_day: number;
    selected_exercises: any[];
    total_training_days: number;
    is_day_completed: boolean;
    created_on: string;
    updated_on: string | null;
}

interface Training {
    training_id: number;
    client_id: number;
    goal_id: number;
    coach_id: number;
    customForm_id: null;
    coach_plans: string;
    training_status: string | null;
    type: string;
    description_training: string;
    daily_training_days: DailyTrainingDay[];
    amount_of_days: string;
    frequency: string;
    init_on: string | null;
    end_on: string | null;
    created_on: string;
    updated_on: string | null;
    isCompleted: boolean;
    isActive: boolean;
}

interface Goal {
    id: number;
    client_id: number;
    diets: any[];
    trainings: Training[];
    status: string;
    descriptionGoal: string;
    amountOfDays: string;
    percentage: string;
    goalType: string;
    healthyFocusDescription: string;
    trainerPlans: string;
    nutritionistPlans: string;
    dietStatus: string;
    trainingStatus: string;
    init_on: string;
    end_on: string;
    created_on: string;
    updated_on: string;
    isCompleted: boolean;
}

export interface SummaryCoach {
    total_completed_assignments: number;
    total_in_progress_assignments: number;
    total_ready_to_start_assignments: number;
    remaining_clients: string;
    full_assignments: FullAssignment[];
    goals_created: Goal[];
}
