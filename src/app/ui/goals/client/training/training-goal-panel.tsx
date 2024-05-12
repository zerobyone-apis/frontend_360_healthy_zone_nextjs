import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers'; // Importar DatePicker de MUI
import type { ClientTrainingGoal } from "./types/goal";

interface TrainingGoalsPanelProps {
  onCreateOrUpdateGoal: (goalData: { target: string; }) => void; // Eliminé isActive de goalData
  existingGoals: { [key: string]: ClientTrainingGoal };
  goalToEdit?: ClientTrainingGoal;
  onCancelEdit?: () => void;
  open: boolean;
  onClose: () => void;
}

const commonTrainingGoals = [
  "Perder peso",
  "Ganar músculo",
  "Mejorar resistencia",
  "Aumentar la flexibilidad",
  "Mejorar la salud cardiovascular",
  "Incrementar la fuerza",
  "Mejorar la postura",
  "Incrementar la velocidad",
  "Mejorar la coordinación",
  "Reducir el estrés",
  "Mejorar el equilibrio",
  "Incrementar la energía",
  "Mejorar la calidad del sueño",
  "Mejorar la salud mental",
  "Prevenir lesiones"
];

export const TrainingGoalsPanel: React.FC<TrainingGoalsPanelProps> = ({ onCreateOrUpdateGoal, existingGoals, goalToEdit, onCancelEdit, open, onClose }) => {
  const [goalData, setGoalData] = useState<{ target: string }>({ target: '' });
  const [dialogTitle, setDialogTitle] = useState('Crear Nuevo Objetivo de Entrenamiento');
  const [submitButtonText, setSubmitButtonText] = useState('Crear Objetivo');

  useEffect(() => {
    if (goalToEdit && !existingGoals[goalToEdit.id]) {
      setGoalData(goalToEdit);
      setDialogTitle('Editar Objetivo de Entrenamiento');
      setSubmitButtonText('Guardar Cambios');
    } else {
      resetGoalData();
      setDialogTitle('Crear Nuevo Objetivo de Entrenamiento');
      setSubmitButtonText('Crear Objetivo');
    }
  }, [goalToEdit, existingGoals]);

  const resetGoalData = () => {
    setGoalData({ target: '' });
  };

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const value = event.target.value as string;
    setGoalData({ target: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (goalData.target) {
      onCreateOrUpdateGoal(goalData);
      onClose();
    }
  };

  const handleCancelEdit = () => {
    if (onCancelEdit) {
      onCancelEdit();
    }
    onClose();
    resetGoalData();
  };

  // Filtrar los objetivos existentes para mostrar solo los que no están en la tabla
  const filteredGoals = commonTrainingGoals.filter(goal => {
    if (existingGoals) {
      return !Object.values(existingGoals).map(g => g.target).includes(goal);
    } else {
      return true; // Si existingGoals es undefined o null, devolvemos true para mostrar todos los objetivos comunes
    }
  });

  // Determinar si los botones deben estar deshabilitados
  const isDisabled = !goalData.target;

  return (
    <Dialog open={open} onClose={onClose} className="max-w-lg mx-auto">
      <DialogTitle className="bg-jungle-green-500 text-white">{dialogTitle}</DialogTitle>
      <DialogContent className="p-4 flex flex-col items-center">
        <form onSubmit={handleSubmit} className="w-full">
          <FormControl variant="outlined" fullWidth margin="normal" className="mb-4">
            <InputLabel className="text-gray-700">Objetivo</InputLabel>
            <Select
              labelId="target-label"
              id="target"
              name="target"
              value={goalData.target || ""}
              onChange={handleChange}
              label="Objetivo"
              className="text-gray-700"
              required
            >
              {commonTrainingGoals.map((goal, index) => (
                <MenuItem disabled={filteredGoals.indexOf(goal) === -1} key={index} value={goal}>{goal}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <DialogActions className="w-full justify-center">
            {goalToEdit && !existingGoals[goalToEdit.id] && <Button onClick={handleCancelEdit} variant="outlined" style={{}}>volver</Button>}
            <Button type="submit" variant="contained" style={{ backgroundColor: '#4caf50', color: 'white' }} disabled={isDisabled}>
              {submitButtonText}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
