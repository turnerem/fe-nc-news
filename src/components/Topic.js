import React, { Component } from 'react';
import Articles from './Articles';

class Topic extends Component {
  render() {
    const { topic } = this.props;
    return (

      <div>
        <h2>Topic: {topic}</h2>
        <Articles topic={topic} />
      </div>
    );
  }
}

export default Topic;