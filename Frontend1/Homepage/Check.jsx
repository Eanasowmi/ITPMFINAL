// Check.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Check = () => {
  return (
    <FontAwesomeIcon icon={faCheckCircle} className="StepIcon-completedIcon" />
  );
};

export default Check;
