import React, { useState } from "react";
import { Typography, Button } from "@mui/material";

import { TrainingGoalsPanel } from "../ui/goals/client/training/training-goal-panel";
import { ClientTrainingGoal } from "../ui/goals/client/training/types/goal";
import { TrainingGoalsCard } from "../ui/goals/client/training/training-goals-card";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const ClientTrainingGoals = () => {
  const mockGoals: ClientTrainingGoal[] = [];
  //   { id: -1, target: 'Perder peso', duration: '20-05-2024', isActive: true, created_on: '2024-05-10' },
  //   { id: -2, target: 'Ganar músculo', duration: '20-05-2024', isActive: false, created_on: '2024-04-25' }
  // ];

  const [goals, setGoals] = useState<ClientTrainingGoal[]>(mockGoals);
  const [selectedGoal, setSelectedGoal] = useState<ClientTrainingGoal | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

  const handleCreateGoal = (newGoal: { target: string; duration: string; isActive: boolean }) => {
    if (selectedGoal) {
      const updatedGoals = goals.map(goal =>
        goal.id === selectedGoal.id ? { ...goal, ...newGoal } : goal
      );
      setGoals(updatedGoals);
      setSelectedGoal(null);
    } else {
      const id = goals.length + 1;
      const created_on = new Date().toISOString();
      const goalToAdd: ClientTrainingGoal = { id, created_on, ...newGoal };
      setGoals([...goals, goalToAdd]);
    }
    setIsPanelOpen(false);
  };

  const handleEditGoal = (goal: ClientTrainingGoal) => {
    setSelectedGoal(goal);
    setIsPanelOpen(true);
  };

  const handleDeleteGoal = (selectedGoal: ClientTrainingGoal) => {
    const updatedGoals = goals.filter(goal => goal !== selectedGoal);
    setGoals(updatedGoals);
  };

  const handleCreateNewGoal = () => {
    setSelectedGoal(null);
    setIsPanelOpen(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="container mx-auto p-6">
        <Typography variant="h4" gutterBottom className="text-2xl mb-4 font-semibold">Objetivos de Entrenamiento</Typography>
        <div className="mb-8">
          <Button variant="contained" color="primary" onClick={handleCreateNewGoal}>Crear Nuevo Objetivo</Button>
        </div>
        <div className="mb-8">
          <TrainingGoalsPanel existingGoals={goals} onCreateOrUpdateGoal={handleCreateGoal} open={isPanelOpen} onClose={() => setIsPanelOpen(false)} goalToEdit={selectedGoal} />
        </div>
        <div className="mb-8">
          <TrainingGoalsCard goals={goals} onDeleteGoal={handleDeleteGoal} onEditGoal={handleEditGoal} />
        </div>
      </div>
    </LocalizationProvider>
  );
};
