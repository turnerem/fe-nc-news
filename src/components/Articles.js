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
    console.log(prevProps, 'prev props\n\n', this.props, 'new props?')
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
    return (
      <div>
        <SortDocs handleClick={this.handleClick}/>
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
    console.log('old params', this.props.params)
    this.props.params[setKey] = value;
    console.log('new params', this.props.params)
    
    const { params } = this.props;
    
    api.getData('articles', 'articles', params)
      .then((articles) => {
        this.setState({ articles })
      })   
  }
}

export default Articles;