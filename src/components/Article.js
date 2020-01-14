import React, { Component } from 'react';
import * as api from './api';
import ArtBigCard from './ArtBigCard';
// import Comments from './Comments';
import CommentCard from './CommentCard';

class Article extends Component {
  state = {
    article: {},
    comments: []
  }

  componentDidMount = () => {
    const { article_id } = this.props;
    const params = { limit: 3 }
    console.log('the params', params)
    api.getData('article', `articles/${article_id}`)
      .then((article) => {
        console.log(article, 'supposedly article on mount')
        this.setState({ article })
      })
    api.getData('comments', `articles/${article_id}/comments`, params)
      .then((comments) => {
        console.log(comments, 'comments from api')
        this.setState({ comments })
      })

  }

  render() {
    const { article, comments } = this.state;
    console.log(comments, 'comments in render')
    return (
      <div>
        <ArtBigCard article={article} />
        <ul>
          {comments.map((comment) => {
            return <CommentCard comment={comment} commentSm={true} key={comment.comment_id}/>
          })}
        </ul>
        <p>Button here to expand and show more comments</p>
        
      </div>
    );
  }

  // a function to show more comments/reorder them
}

export default Article;