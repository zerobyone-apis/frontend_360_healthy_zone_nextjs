import React from 'react';
import Step from './step';

// Component for obtaining privacy consent.
const PrivacyConsent = () => {
  const questions = [
    // Add your questions here
  ];

  return (
    <Step title="PrivacyConsent" questions={questions} />
  );
}

export default PrivacyConsent;
