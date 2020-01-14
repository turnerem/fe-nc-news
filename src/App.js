import React from 'react';
import './App.css';
import { Router } from '@reach/router'
import Header from './components/Header';
import Home from './components/Home';
import Topics from './components/Topics';
import Topic from './components/Topic';
import Article from './components/Article';
import Comments from './components/Comments';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Router className='route'>
        <Home path='/' />
        <Topics path='/topics' />
        <Topic path='/topics/:topic_id' />
        <Article path='/article/:article_id' />
        <Comments path='/article/:article_id/comments' />
      </Router>
    </div>
  );

}

export default App;
