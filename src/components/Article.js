import React, { Component } from 'react';
import * as api from './api';
import ArtBigCard from './ArtBigCard';
// import Comments from './Comments';
import CommentCard from './CommentCard';
import Comments from './Comments';

class Article extends Component {
  state = {
    article: {},
    comments: []
  }

  componentDidMount = () => {
    const { article_id } = this.props;
    // console.log('the params', params)
    api.getData('article', `articles/${article_id}`)
      .then((article) => {
        console.log(article, 'supposedly article on mount')
        this.setState({ article })
      })

  }

  render() {
    const { article } = this.state;
    const { article_id } = this.props;
    // console.log(comments, 'comments in render')
    return (
      <div>
        <ArtBigCard article={article} />
        {/* POST comment */}
        {/* Comments */}
        <Comments article_id={article_id} />
        
      </div>
    );
  }

  // a function to show more comments/reorder them
}

export default Article;