import React from 'react';
import Step from './step';

// Component for recording medical history.
const MedicalHistory = () => {
  const questions = [
    // Add your questions here
  ];

  return (
    <Step title="MedicalHistory" questions={questions} />
  );
}

export default MedicalHistory;
