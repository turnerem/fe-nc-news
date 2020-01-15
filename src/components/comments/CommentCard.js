import React, { Component } from 'react';
import {formatTimeDate} from '../utils/utils'

class CommentCard extends Component {
  state = {
    commentSm: true
  }
  render() {
    console.log('coment card')
    const { author, body, created_at, votes } = this.props.comment;
    const { commentSm } = this.state;
    let newBody = (commentSm && body.length > 97) ? body.substring(0, 97) + '...' : body;
    return (
      <li className='comment-card'>
        <button onClick={this.resizeText}>
          <p className='created-at'>{formatTimeDate(created_at)}</p>
          <p className='votes'>votes: {votes}</p>
          <h5 className='author'>{author}</h5>
          <p>{newBody}</p>
        </button>
      </li>
    );
  }
  resizeText = () => {
    this.setState(({commentSm}) => {
      return { commentSm: !commentSm }
    })
  }

}

export default CommentCard;