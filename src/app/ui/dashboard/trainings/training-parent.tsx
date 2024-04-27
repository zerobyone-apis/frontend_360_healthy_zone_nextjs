"use client"
import { useState } from "react";
import RestView from "./rest-view";
import SuccessView from "./success-view";
import TrainingView from "./training-view";


export default function TrainingParent({ exercises }: any) {
  const [currentIndex, setCurrentIndex] = useState(0)
  console.log("currentIndex", currentIndex);

  if (currentIndex === exercises.length - 1) {
    {/** Exercises finished */ }
    return (<SuccessView />)
  }

  if (!exercises[currentIndex].rest) return (
    <TrainingView setCurrentIndex={setCurrentIndex} exercise={exercises[currentIndex]}></TrainingView>
  )

  else return (
    <RestView restInSeconds={exercises[currentIndex].rest_in_seconds}
      setCurrentIndex={setCurrentIndex}
      nextExercise={exercises[currentIndex + 1]}></RestView>
  )
}