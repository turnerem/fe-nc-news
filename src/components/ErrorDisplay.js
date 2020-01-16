import React from 'react';

const ErrorDisplay = ({ status, msg }) => {
  return (
    <div>
      STATUS { status }: { msg }
    </div>
  );
};

export default ErrorDisplay;