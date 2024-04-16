import React from 'react';
import Step from './step';

// Component for monitoring weight history.
const WeightHistory = () => {
  const questions = [
    // Add your questions here
  ];

  return (
    <Step title="WeightHistory" questions={questions} />
  );
}

export default WeightHistory;
