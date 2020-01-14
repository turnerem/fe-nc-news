import React, { Component } from 'react';
import CommentCard from './CommentCard';
import * as api from './api'

class Comments extends Component {
  state = {
    comments: [],
    commentSm: true,
    params: {
      limit: 3
    }
  }

  componentDidMount = () => {
    const params = this.state
    const { article_id } = this.props
    api.getData('comments', `articles/${article_id}/comments`, params)
      .then((comments) => {
        console.log(comments, 'comments from api')
        this.setState({ comments })
      })

  }
  render() {
    // if (only renderig some comments) {do this}
    // else {do that}
    const { commentSm, comments } = this.state;
    // console.log(this.props)
    return (
      <react>
        <ul>
           {comments.map((comment) => {
             return <CommentCard comment={comment} commentSm={commentSm} key={comment.comment_id}/>
           })}
        </ul>
        <button onClick={this.handleShowMore} value='10'>show more</button>
      </react>
      );
  }

  handleShowMore = (event) => {

  }
}

export default Comments;