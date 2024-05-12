import React, { useState } from 'react';
import { Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { format } from 'date-fns';
import type { ClientTrainingGoal } from "./types/goal";

interface GoalsCardProps {
  goals: ClientTrainingGoal[];
  onDeleteGoal: (goal: ClientTrainingGoal) => void;
  onEditGoal: (goal: ClientTrainingGoal) => void;
}

export const TrainingGoalsCard: React.FC<GoalsCardProps> = ({ goals, onDeleteGoal, onEditGoal }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [goalToDelete, setGoalToDelete] = useState<ClientTrainingGoal | null>(null);
  const [hoveredGoalId, setHoveredGoalId] = useState<number | null>(null);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setGoalToDelete(null);
  };

  const handleDeleteClick = (goal: ClientTrainingGoal) => {
    setGoalToDelete(goal);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (goalToDelete) {
      onDeleteGoal(goalToDelete);
      setOpenDialog(false);
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredGoalId(index);
  };

  const handleMouseLeave = () => {
    setHoveredGoalId(null);
  };

  return (
    <>
      {goals.length === 0 ? (
        <div className="w-full bg-jungle-green-500 flex flex-col justify-center p-4 rounded-3xl shadow gap-2 text-white text-center">
          <Typography variant="body1">No hay objetivos creados.</Typography>
        </div>
      ) : (
        <div className="w-full bg-jungle-green-500 flex flex-col justify-center p-4 rounded-3xl shadow gap-2">
          <div className="w-full p-2 flex justify-between">
            <p className="font-light text-white">Mis Objetivos: <span className="font-bold">{goals.length}</span></p>
          </div>
          <div className="h-full overflow-auto">
            {goals.map((goal, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 px-4 bg-white rounded-lg shadow mb-2"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: 'pointer', backgroundColor: hoveredGoalId === index ? 'white' : "#d3e6cb" }}
                onClick={() => onEditGoal(goal)}
              >
                <div className='flex space-x-4'>
                  <div className="bg-jungle-green-500 rounded-full w-10 h-10"></div>
                  <div>
                    <Typography variant="subtitle1">{goal.target}</Typography>
                    <Typography variant="body2" className="text-gray-500">creado: {format(new Date(goal.created_on), 'dd/MM/yyyy')}</Typography>
                  </div>
                </div>
                <IconButton color="error" onClick={(e) => { e.stopPropagation(); handleDeleteClick(goal); }}>
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          {goalToDelete && (
            <Typography variant='body1'>
              ¿Estás seguro de que deseas eliminar el objetivo?
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};