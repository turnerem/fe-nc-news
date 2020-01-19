import React, { Component } from 'react';
import * as api from '../api';
import ArtBigCard from './ArtBigCard';
import Comments from '../comments/Comments';
import ErrorDisplay from '../ErrorDisplay';

class Article extends Component {
  state = {
    article: {},
    comments: [],
    isLoading: true,
    err: {},
    errFlag: false
  }

  componentDidMount = () => {
    const { article_id } = this.props;
    api.getData('article', `articles/${article_id}`)
      .then(({article}) => {
        this.setState({ article, isLoading: false })
      })
      .catch(( {response }) => {
        const { msg } = response.data;
        const { status } = response;
        this.setState({ err: {status, msg}, errFlag: true, isLoading: false})
      })

  }

  render() {
    const { article, isLoading, errFlag, err } = this.state;
    const { article_id, loggedIn, user } = this.props;
    return (
      <>
      {isLoading ? (<p>Loading...</p>) 
      : (
        errFlag ? (<ErrorDisplay {...err} />)
        : (
          <>
            <ArtBigCard article={article} />
    
            <Comments article_id={article_id} comment_count={article.comment_count} loggedIn={loggedIn} user={user} />
            
          </>
          )
          
          )
      
        }
      </>
    );
  }
}

export default Article;