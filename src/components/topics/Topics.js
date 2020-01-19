import React, { Component } from 'react';
import * as api from '../api'
import TopicCard from './TopicCard';
import Header from '../Header';

class Topics extends Component {
  state = {
    topics: []
  }
  componentDidMount = () => {
    api.getData('topics', 'topics')
      .then(({topics_res}) => {
        const { topics } = topics_res
        this.setState({ topics })
      })
  }
  render() {
    const { topics } = this.state;
    return (
      <div>
        <Header />
        <h3 className='left'>All Topics</h3>
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