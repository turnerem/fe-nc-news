import React, { Component } from 'react';
import './App.css';
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
        <NavBar user={user} logUserIn={this.logUserIn}/>
        {/* <Header /> */}
        <Router className='route' >
          <Home path='/' loggedIn={loggedIn}/>
          <Topics path='/topics' loggedIn={loggedIn}/>
          {/* <LoginPage path='/login' logUserIn={this.logUserIn} msg='hi' /> */}
          <Topic path='/topics/:topic' loggedIn={loggedIn}/>
          <Article path='/topics/:topic/:article_id' loggedIn={loggedIn} user={user}/>
          <ErrorDisplay default status={404} msg='Non-existent Path' loggedIn={loggedIn}/>
        </Router>
      </div>
    );

  }

  logUserIn = () => {
    console.log('clicked!')
    this.setState({ loggedIn: true, user: 'jessjelly' })
    return <Home />
  }
}

export default App;