import React, { useState } from "react";
import { Typography } from "@mui/material";
import { TrainingGoalsPanel } from "../ui/goals/client/training/training-goal-panel";
// import { ClientDietGoal } from "../ui/goals/client/diet/types/goal";
// import { DietGoalsTable } from "../ui/goals/client/diet/diet-goals-table";

export const ClientDietGoals = () => {
  //   const mockGoals: ClientDietGoal[] = [
  //     { id: 1, target: 'Reducir la ingesta de azúcar', duration: '1 mes', isActive: true, created_on: '2024-05-15' },
  //     { id: 2, target: 'Incrementar la ingesta de vegetales', duration: '2 meses', isActive: false, created_on: '2024-05-01' }
  //   ];

  //   const [goals, setGoals] = useState<ClientDietGoal[]>(mockGoals);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Objetivos de Dieta</Typography>
      {/* <DietGoalsPanel /> 
      <DietGoalsTable goals={goals} /> */}
    </div>
  );
};