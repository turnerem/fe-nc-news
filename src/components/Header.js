import React from 'react';

const Header = ({home}) => {
  const siteName = 'NC News';
  return home ? (<h1 className='home-header'>{siteName}</h1>) : (<h2>{siteName}</h2>)
};

export default Header;