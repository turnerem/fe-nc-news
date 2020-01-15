import React, { Component } from 'react';
import Articles from '../articles/Articles';
import Header from '../Header';

class Topic extends Component {
  render() {
    const { slug, description, limit } = this.props;
    return (

      <div>
        <Header />
        <h3>Topic: {slug}</h3>
        <p>{description}</p>
        <Articles topic={slug} limit={limit} />
      </div>
    );
  }
}

export default Topic;