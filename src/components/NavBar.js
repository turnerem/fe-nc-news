import React from 'react';
import { Link } from '@reach/router'

const NavBar = ({ user, logUserIn }) => {
  console.log(user, 'user in nav')

  return (
    <nav>
    <Link to='/' >
      Home
    </Link>
    <Link to='/topics' >
      Topics
    </Link>
    {(user === '') ? (
      <button onClick={logUserIn} className='login-button'>Login</button>
    ) : (
      <span className='logged-in'>Welcome {user}</span>
    )}
    {/* {(user === '') ? (
      <Link to='/login' className='user-login' >
        Login
      </Link>
    ) : (
      <span className='active-user'>Welcome {user}</span>
    )} */}
  </nav>

  );
};

export default NavBar;