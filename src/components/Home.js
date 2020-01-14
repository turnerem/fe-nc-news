import React, { Component } from 'react';
import Articles from './Articles';


class Home extends Component {
  state = {
    params: {
      sort_by: 'created_at',
      order: 'desc',
      author: undefined,
      topic: undefined,
      limit: 10
    }
  }

  render() {
    return (
      <div>
        <h2>All Articles</h2>
        <Articles params={this.state.params} />
      </div>
    );  
  }
}

export default Home;