import React, { Component } from 'react';
import Articles from '../articles/Articles_old';
import Header from '../Header';
import { capitalize } from '../utils/utils';

class Topic extends Component {
  render() {
    const { topic, description } = this.props;
    return (

      <div>
        <h3 className='left'>{capitalize(topic)}</h3>
        <p>{description}</p>
        <Articles topic={topic} />
      </div>
    );
  }
}

export default Topic;