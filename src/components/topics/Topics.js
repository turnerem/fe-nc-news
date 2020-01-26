import React, { Component } from 'react';
import * as api from '../api'
import TopicCard from './TopicCard';

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
        <h3 className='left'>All Topics (trend data is fictional)</h3>
        <ul>
          {topics.map((topic, idx) => {
            return <TopicCard topic={topic} key={topic.slug} idx={idx} />
          })}
        </ul>
      </div>
    );
  }
}

export default Topics;