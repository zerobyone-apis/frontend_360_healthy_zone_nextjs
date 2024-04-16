import React from 'react';

interface StepProps {
  title: string;
  questions: string[];
}

const Step: React.FC<StepProps> = ({ title, questions }) => {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
    </div>
  );
};

export default Step;
