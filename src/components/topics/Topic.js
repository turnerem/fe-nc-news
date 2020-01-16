import React, { Component } from 'react';
import Articles from '../articles/Articles';
import Header from '../Header';

class Topic extends Component {
  render() {
    const { topic, description } = this.props;
    return (

      <div>
        <Header />
        <h3>Topic: {topic}</h3>
        <p>{description}</p>
        <Articles topic={topic} />
      </div>
    );
  }
}

export default Topic;