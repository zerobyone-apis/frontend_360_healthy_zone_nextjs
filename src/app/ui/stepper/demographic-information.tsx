import React from 'react';
import Step from './step';

// Component for gathering demographic information.
const DemographicInformation = () => {
  const questions = [
    // Add your questions here
  ];

  return (
    <Step title="DemographicInformation" questions={questions} />
  );
}

export default DemographicInformation;
