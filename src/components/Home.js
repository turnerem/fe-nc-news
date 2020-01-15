import React from 'react';
import Articles from './articles/Articles';
import Header from './Header';


const Home = () => {
  return (
    <div>
      <Header home={true} />
      <Articles />
    </div>
  );  
}

export default Home;