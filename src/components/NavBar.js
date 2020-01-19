import React from 'react';
import { Link } from '@reach/router'
import Header from './Header';

const NavBar = ({ user, toggleLogUserIn }) => {
  console.log(user, 'user in nav')

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link to='/' >
          Home
        </Link>
        <Link to='/topics' >
          Topics
        </Link>
        {/* <div className='login-toggle'>
          {(user !== '') && (<span className='logged-in'>Welcome {user}</span>)}
          <button onClick={toggleLogUserIn} className='login-button'>{(user === '') ? 'Log in' : 'Log out'}</button>
        </div> */}
        <div className='login-toggle'>
          <button onClick={toggleLogUserIn} className='login-button'>{(user === '') ? 'Log in as jessjelly' : 'Log out'}</button>
        </div>
        
      </nav>
      <Header />  
    </div>

  );
};

export default NavBar;