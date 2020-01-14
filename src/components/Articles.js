import React, { Component } from 'react';
import * as api from './api';
import SortDocs from './SortDocs';
import ArtSmCard from './ArtSmCard';

class Articles extends Component {
  state = {
    articles: []
  }

  componentDidMount = () => {
    // axios request for 10 MOST RECENT articles
    const { params } = this.props;
    api.getData('articles', 'articles', params)
      .then((articles) => {
        this.setState({ articles })
      })
  }

  componentDidUpdate  (prevProps)  {
    const { sort_by, order } = this.props.params
    if (sort_by !== prevProps.params.sort_by || order !== prevProps.params.order) {
      const { params } = this.props;

      api.getData('articles', 'articles', params)
      .then((articles) => {
        this.setState({ articles })
      })     
    }
  }
  
  render() {
    const { articles } = this.state;
    const { order } = this.props.params;
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
    const setKey = (['asc', 'desc'].includes(value)) ? 'order' : 'sort_by'
    this.props.params[setKey] = value;
    
    const { params } = this.props;
    
    api.getData('articles', 'articles', params)
      .then((articles) => {
        this.setState({ articles })
      })   
  }
}

export default Articles;