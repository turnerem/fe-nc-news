import React, { Component } from 'react';
import Articles from '../articles/Articles';

class Topic extends Component {
  render() {
    const { slug, description, limit } = this.props;
    return (

      <div>
        <h2>Topic: {slug}</h2>
        <p>{description}</p>
        <Articles topic={slug} limit={limit} />
      </div>
    );
  }
}

export default Topic;