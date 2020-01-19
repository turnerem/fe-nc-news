import React, { Component } from 'react';
// import './bootstrap-flatly.css';
import './layout.css';
import { Router } from '@reach/router'
import Home from './components/Home';
import Topics from './components/topics/Topics';
import Topic from './components/topics/Topic';
import Article from './components/articles/Article';
import NavBar from './components/NavBar';
import ErrorDisplay from './components/ErrorDisplay';
// import LoginPage from './components/LoginPage';

class App extends Component {
  state = {
    loggedIn: false,
    user: ''
  }
  render () {
    const {user, loggedIn} = this.state
    return (
      <div className="App">
        <NavBar user={user} toggleLogUserIn={this.toggleLogUserIn}/>
        <Router className='route' >
          <Home path='/' loggedIn={loggedIn}/>
          <Topics path='/topics' loggedIn={loggedIn}/>
          <Topic path='/topics/:topic' loggedIn={loggedIn}/>
          <Article path='/articles/:article_id' loggedIn={loggedIn} user={user}/>
          <ErrorDisplay default status={404} msg='Non-existent Path' loggedIn={loggedIn}/>
        </Router>
      </div>
    );

  }

  toggleLogUserIn = () => {
    console.log('clicked!')
    this.setState(({loggedIn}) => {
      return loggedIn ? { loggedIn: false, user: ''} : { loggedIn: true, user: 'jessjelly'}
    })
    return <Home />
  }
}

export default App;