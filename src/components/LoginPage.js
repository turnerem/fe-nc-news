import React from 'react';
import Header from './Header';

const LoginPage = ({ logUserIn }) => {
  return (
    <>
      <Header />
      <h3>Log in as jessjelly?</h3>
      <button onClick={logUserIn} class='btn btn-outline-primary'>
        Log in
      </button>
    </>
  );
};

export default LoginPage;