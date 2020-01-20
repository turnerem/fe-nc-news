import React from 'react';

const ErrorDisplay = ({ status, msg }) => {
  const errMsg = (
    <p>
      STATUS { status }: { msg }
    </p>
  )
  
  if (msg === 'Non-existent Path') {
    return (
      <>
        {errMsg}
      </>
    )
  }
  return (
    errMsg
  );  
};

export default ErrorDisplay;