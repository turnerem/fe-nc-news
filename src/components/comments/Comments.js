import React, { Component } from 'react';
import CommentCard from './CommentCard';
import PostComment from './PostComment';
import * as api from '../api'

class Comments extends Component {
  state = {
    comments: [],
    // commentSm: true,
    params: {
      limit: 3
    }
  }

  componentDidMount = () => {
    const { params } = this.state
    const { article_id } = this.props
    api.getData('comments', `articles/${article_id}/comments`, params)
      .then((comments) => {
        // console.log(comments, 'comments from api')
        this.setState({ comments })

      })

  }

  render() {
    // if (only renderig some comments) {do this}
    // else {do that}
    const { comments } = this.state;
    const { limit } = this.state.params;
    console.log('n comments', comments.length, 'limit', limit)
    return (
      <div>
        <PostComment handlePost={this.handlePost} />
        <ul>
           {comments.map((comment) => {
             return <CommentCard comment={comment} key={comment.comment_id}/>
           })}
        </ul>
        {(comments.length < limit) ? (<p>that's all</p>) : (<button onClick={this.handleShowMore} value={limit}>more</button>)
          }
        
      </div>
      );
  }

  handlePost = (event) => {
    event.preventDefault();

    const { value } = event.target[0]
    const { article_id } = this.props
    const currentUser = 'jessjelly'
    const userComment = {
      author: currentUser,
      body: value,
      created_at: Date.now(),
      votes: 0,
      article_id: 'newComment'
    }
    this.setState(({comments}) => {
      const newComments = [...comments]
      // newComments.pop()
      newComments.unshift(userComment)
      return { comments: newComments }
    })
    const toPost = {username: currentUser, body: value}
    api.postData('comment', `articles/${article_id}/comments`, 
      toPost)
        .then(response => {
          console.log(response, 'response after posting')
        })
        .catch(err => console.log(err, 'err after post'))


  }

  handleShowMore = (event) => {
    // console.log(event.target.value, 'event limit\n\n')    
    this.setState((currentState) => {
      const { params } = currentState
      params.limit = (params.limit === 3) ? 10 : params.limit + 10;
      const { article_id } = this.props
      api.getData('comments', `articles/${article_id}/comments`, params)
        .then((comments) => {
          this.setState({ comments, params })
        })

      return { params }
    })




  }
}

export default Comments;