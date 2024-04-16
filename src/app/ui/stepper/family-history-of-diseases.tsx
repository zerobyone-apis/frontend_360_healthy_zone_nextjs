import React from 'react';
import Step from './step';

// Component for noting family history of diseases.
const FamilyHistoryOfDiseases = () => {
  const questions = [
    // Add your questions here
  ];

  return (
    <Step title="FamilyHistoryOfDiseases" questions={questions} />
  );
}

export default FamilyHistoryOfDiseases;
