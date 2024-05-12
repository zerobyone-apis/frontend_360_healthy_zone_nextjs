'use client'
import React from "react";
import { ClientTrainingGoals } from './client-training-goals';
import { ClientDietGoals } from './client-diet-goals';

enum PAGES {
  TRAINING = "TRAINING",
  DIET = "DIET",
}

enum USER_TYPES {
  CLIENT = "CLIENT",
  TRAINER = "TRAINER",
  DIETIST = "DIETIST",
}

export default function page() {

  // CHANGE THIS FOR GET USER TYPE
  const user = {
    userType: USER_TYPES.CLIENT,
    goalType: PAGES.TRAINING
  }

  if (user.userType === USER_TYPES.CLIENT) {
    if (user.goalType === PAGES.TRAINING) {
      return <ClientTrainingGoals />
    }
    if (user.goalType === PAGES.DIET) {
      return <ClientDietGoals />
    }
    return null;
    // TODO define a default value in case of error/empty value
  }
};

