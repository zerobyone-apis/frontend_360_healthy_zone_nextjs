import React, { useState } from 'react';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { format } from 'date-fns';
import type { ClientTrainingGoal } from "./types/goal";

interface GoalsTableProps {
  goals: ClientTrainingGoal[];
  onDeleteGoal: (id: number) => void;
  onEditGoal: (goal: ClientTrainingGoal) => void;
}

export const TrainingGoalsTable: React.FC<GoalsTableProps> = ({ goals, onDeleteGoal, onEditGoal }) => {
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
      onDeleteGoal(goalToDelete.id);
      setOpenDialog(false);
    }
  };

  const handleMouseEnter = (goalId: number) => {
    setHoveredGoalId(goalId);
  };

  const handleMouseLeave = () => {
    setHoveredGoalId(null);
  };

  return (
    <>
      {goals.length === 0 ? (
        <Box textAlign="center" my={4}>
          <Typography variant="body1">No hay objetivos creados. Puedes crear uno pulsando en "Crear Nuevo Objetivo".</Typography>
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Objetivo</TableCell>
              <TableCell>Duración</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goals.map((goal) => (
              <TableRow
                key={goal.id}
                onClick={() => onEditGoal(goal)}
                onMouseEnter={() => handleMouseEnter(goal.id)}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: 'pointer', backgroundColor: hoveredGoalId === goal.id ? '#f3f3f3' : 'inherit' }}
              >
                <TableCell>{goal.id}</TableCell>
                <TableCell>{goal.target}</TableCell>
                <TableCell>{goal.duration}</TableCell>
                <TableCell>{goal.isActive ? 'Activo' : 'Inactivo'}</TableCell>
                <TableCell>{format(new Date(goal.created_on), 'dd/MM/yyyy')}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={(e) => { e.stopPropagation(); handleDeleteClick(goal); }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
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