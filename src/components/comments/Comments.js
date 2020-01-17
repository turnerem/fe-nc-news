import React, { Component } from 'react';
import CommentCard from './CommentCard';
import PostComment from './PostComment';
import * as api from '../api'

class Comments extends Component {
  state = {
    comments: [],
    // commentSm: true,
    submittedPost: false,
    params: {
      limit: 3
    },
    currentUser: 'jessjelly',
    toDelete: null,
    countChange: 0

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

  componentDidUpdate = (prevProps, { comments }) => {
    // console.log('prev', prevState.comments.length, 'curr', this.state)
    if (comments.length > this.state.comments.length) {
      console.log('to be deleted', this.state.toDelete)
      api.deleteData(`comments/${this.state.toDelete}`)
        .then((data) => {
          console.log('successful delete, this returned', data)
        })
        .catch(err => {console.log('an err', err)})

      this.setState({ toDelete: null })
      
    }

  }

  render() {
    const { comments, submittedPost, currentUser, countChange } = this.state;
    const { limit } = this.state.params;
    const { comment_count } = this.props;
    return (
      <div>
        <PostComment handlePost={this.handlePost} submittedPost={submittedPost} />
        <p><span role='img' aria-label='comments'>💬</span>: {1 * comment_count + countChange}</p>
        <ul>
           {comments.map((comment) => {
             return <CommentCard comment={comment} currentUser={currentUser} key={comment.comment_id} deleteComment={this.deleteComment}/>
           })}
        </ul>
        {(comment_count <= limit) ? (<p>that's all</p>) : (<button onClick={this.handleShowMore} value={limit}>more</button>)
          }
        
      </div>
      );
  }

  handlePost = (event) => {
    event.preventDefault();

    const { value } = event.target[0]
    if (value.length > 0) {
      
      const { article_id } = this.props
      const { currentUser } = this.state
      const userComment = {
        author: currentUser,
        body: value,
        created_at: Date.now(),
        votes: 0,
        article_id: 'newComm'
      }
      this.setState(({comments, countChange}) => {
        const newComments = [...comments]
        // newComments.pop()
        newComments.unshift(userComment)
        console.log(event.target, 'event target')

        return { comments: newComments, countChange: countChange + 1 }
      })
      const toPost = {username: currentUser, body: value}
      api.postData('comment', `articles/${article_id}/comments`, 
        toPost)
          .then(response => {
            console.log(response, 'response after posting')
          })
          .catch(err => console.log(err, 'err after post'))

    } 

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

  deleteComment = (comment_id) => {
    console.log('back in comments with ', this.state.currentUser)
    this.setState((currentState) => {
      const { comments, countChange } = currentState;
      const newComments = comments.filter(comment => {
        return comment.comment_id !== comment_id
      })
      return { comments: newComments, toDelete: comment_id, countChange: countChange - 1}
    })
  }
}

export default Comments;