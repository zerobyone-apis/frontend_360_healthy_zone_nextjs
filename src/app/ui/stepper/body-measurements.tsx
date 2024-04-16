import React from 'react';
import Step from './step';

// Component for recording body measurements.
const BodyMeasurements = () => {
  const questions = [
    // Add your questions here
  ];

  return (
    <Step title="BodyMeasurements" questions={questions} />
  );
}

export default BodyMeasurements;
