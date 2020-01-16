import React from 'react';
import Header from './Header';

const ErrorDisplay = ({ status, msg }) => {
  const errMsg = (
    <p>
      STATUS { status }: { msg }
    </p>
  )
  
  if (msg === 'Non-existent Path') {
    return (
      <>
        <Header />
        {errMsg}
      </>
    )
  }
  return (
    errMsg
  );  
};

export default ErrorDisplay;