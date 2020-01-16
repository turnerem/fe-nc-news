import React, { Component } from 'react';
import Articles from '../articles/Articles';
import Header from '../Header';

class Topic extends Component {
  render() {
    const { topic, description, limit } = this.props;
    return (

      <div>
        <Header />
        <h3>Topic: {topic}</h3>
        <p>{description}</p>
        <Articles topic={topic} limit={limit} />
      </div>
    );
  }
}

export default Topic;