import React from 'react';
import Step from './step';

// Component for assessing stress levels.
const StressLevel = () => {
  const questions = [
    // Add your questions here
  ];

  return (
    <Step title="StressLevel" questions={questions} />
  );
}

export default StressLevel;
