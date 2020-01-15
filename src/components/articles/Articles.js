import React, { Component } from 'react';
import * as api from '../api';
import SortDocs from '../SortDocs';
import ArtSmCard from './ArtSmCard';

class Articles extends Component {
  state = {
    articles: [],
    params: {
      sort_by: 'created_at',
      order: 'desc',
      topic: this.props.topic
    }
  }

  componentDidMount = () => {
    // axios request for 10 MOST RECENT articles
    const { params } = this.state;
    api.getData('articles', 'articles', params)
      .then((articles) => {
        this.setState({ articles })
      })
  }

  // componentDidUpdate  (prevProps)  {
  //   const { sort_by, order } = this.props.params
  //   if (sort_by !== prevProps.params.sort_by || order !== prevProps.params.order) {
  //     const { params } = this.props;

  //     api.getData('articles', 'articles', params)
  //     .then((articles) => {
  //       this.setState({ articles })
  //     })     
  //   }
  // }
  
  render() {
    const { articles } = this.state;
    const { order } = this.state.params;
    return (
      <div>
        <SortDocs handleClick={this.handleClick} order={order} />
        <ul>
          {
            articles.map(article => {
              return <ArtSmCard article={article} key={article.article_id}/>
            })
          }
        </ul>
      </div>
    );
  }

  handleClick = (event) => {
    const { value } = event.target
    
    const { params } = this.state;
    const setKey = (['asc', 'desc'].includes(value)) ? 'order' : 'sort_by'
    params[setKey] = value;
    
    api.getData('articles', 'articles', params)
      .then((articles) => {
        this.setState({ articles, params })
      })   
  }
}

export default Articles;