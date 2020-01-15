import React, { Component } from 'react';
import * as api from '../api'
import TopicCard from './TopicCard';

class Topics extends Component {
  state = {
    topics: []
  }
  componentDidMount = () => {
    api.getData('topics', 'topics')
      .then((topics) => {
        this.setState({ topics })
      })
  }
  render() {
    const { topics } = this.state;
    return (
      <div>
        <h2>All Topics</h2>
        <ul>
          {topics.map(topic => {
            return <TopicCard topic={topic} key={topic.slug} />
          })}
        </ul>
      </div>
    );
  }
}

export default Topics;