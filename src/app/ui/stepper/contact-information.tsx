import React from 'react';
import Step from './step';

// Component for collecting contact information.
const ContactInformation = () => {
  const questions = [
    // Add your questions here
  ];

  return (
    <Step title="ContactInformation" questions={questions} />
  );
}

export default ContactInformation;
