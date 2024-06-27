import { create } from 'zustand'

export const trainingStore = create((set) => ({
  dialogs: {
    newTraining: false,
    selectTraining: false
  },
  training: {
    coach_id: 0,
    goal_id: 0,
    type: "",
    training_status: null,
    coach_plans: "",
    description_training: "",
    frequency: "",
    init_on: null,
    amount_of_days: 0,
    daily_training_days: [],
  },
  currentGoal: null,
  setOpenNewTraining: (isOpen: boolean) => set((state: any) => ({ dialogs: { ...state.dialogs, newTraining: isOpen } })),
  setOpenSelectTraining: (isOpen: boolean) => set((state: any) => ({ dialogs: { ...state.dialogs, selectTraining: isOpen } })),
  setTraining: (training: any) => set((state: any)=> ({ training: {...state.training, ...training} })),
  setCurrentGoal: (goal: any) => set((state: any)=>({ currentGoal: goal, training: { ...state.training, goal_id: goal.id}})),
  resetTraining: () => set({ training: { coach_id: 0, goal_id: 0, type: "", training_status: null, coach_plans: "", description_training: "", frequency: "", init_on: null, amount_of_days: 0, daily_training_days: [] } }),
  clearCurrentGoal: () => set({ currentGoal: null }),
  
  // increasePopulation: () => set((state: { bears: number }) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
  // updateBears: (newBears: any) => set({ bears: newBears }),
}))