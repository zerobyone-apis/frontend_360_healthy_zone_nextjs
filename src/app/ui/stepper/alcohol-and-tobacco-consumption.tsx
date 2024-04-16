import React from 'react';
import Step from './step';

// Component for recording alcohol and tobacco consumption.
const AlcoholAndTobaccoConsumption = () => {
  const questions = [
    // Add your questions here
  ];

  return (
    <Step title="AlcoholAndTobaccoConsumption" questions={questions} />
  );
}

export default AlcoholAndTobaccoConsumption;
