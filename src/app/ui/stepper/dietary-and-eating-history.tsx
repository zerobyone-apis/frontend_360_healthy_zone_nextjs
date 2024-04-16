import React from 'react';
import Step from './step';

// Component for capturing dietary and eating history.
const DietaryAndEatingHistory = () => {
  const questions = [
    // Add your questions here
  ];

  return (
    <Step title="DietaryAndEatingHistory" questions={questions} />
  );
}

export default DietaryAndEatingHistory;
