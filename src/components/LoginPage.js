import React from 'react';
import Header from './Header';

const LoginPage = ({ logUserIn }) => {
  return (
    <>
      <Header />
      <h3>Log in as jessjelly?</h3>
      <button onClick={logUserIn}>
        Log in
      </button>
    </>
  );
};

export default LoginPage;