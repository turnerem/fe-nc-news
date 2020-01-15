import React, { Component } from 'react';
import * as api from '../api';
import ArtBigCard from './ArtBigCard';
import Comments from '../comments/Comments';
import Header from '../Header';

class Article extends Component {
  state = {
    article: {},
    comments: [],
    isLoading: true
  }

  componentDidMount = () => {
    const { article_id } = this.props;
    // console.log('the params', params)
    api.getData('article', `articles/${article_id}`)
      .then((article) => {
        this.setState({ article, isLoading: false })
      })

  }

  render() {
    const { article, isLoading } = this.state;
    const { article_id } = this.props;
    // console.log(comments, 'comments in render')
    return (
      <>
      <Header />
      {isLoading ? (<p>Loading...</p>) 
      : (
      <>
        <ArtBigCard article={article} />

        <Comments article_id={article_id} comment_count={article.comment_count} />
        
      </>
      )
      }
      
      </>
    );
  }

  // a function to show more comments/reorder them
}

export default Article;