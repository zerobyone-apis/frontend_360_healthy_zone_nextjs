import React from 'react';
import Step from './step';

// Component for entering recent laboratory test results.
const RecentLaboratoryTests = () => {
  const questions = [
    // Add your questions here
  ];

  return (
    <Step title="RecentLaboratoryTests" questions={questions} />
  );
}

export default RecentLaboratoryTests;
