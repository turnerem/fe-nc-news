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
      topic: this.props.topic,
      limit: this.props.limit
    },
    isLoading: true
  }

  componentDidMount = () => {
    // axios request for 10 MOST RECENT articles
    const { params } = this.state;
    api.getData('articles', 'articles', params)
      .then((articles) => {
        this.setState({ articles, isLoading: false })
      })
      .catch(err => {
        console.dir(err, 'err after Art request')

      })
  }
  
  render() {
    const { articles, isLoading } = this.state;
    const { order } = this.state.params;
    return isLoading ? <p className='loading-page'>Loading...</p>
      : (
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