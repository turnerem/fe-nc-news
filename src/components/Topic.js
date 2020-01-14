import React, { Component } from 'react';
import * as api from './api'
import SortDocs from './SortDocs';
import ArtSmCard from './ArtSmCard';
import Articles from './Articles';

class Topic extends Component {
  state = {
    articles: [],
    params: {
      sort_by: 'created_at',
      order: 'desc'
    }
  }

  // componentDidMount = () => {
  //   const { slug } = this.props
  //   console.log(this.props, 'props on mount')
  //   api.getData('articles', 'articles', { slug })
  //     .then((articles) => {
  //       this.setState({ articles })
  //     })
  // }
  render() {
    const { slug } = this.props;
    // const { articles, params } = this.state;
    params.slug = slug;
    console.log('params in render', params)
    return (
      <div>
        <h2>{slug}</h2>
        <Articles params={params} />
      </div>
    );
  }
}

export default Topic;