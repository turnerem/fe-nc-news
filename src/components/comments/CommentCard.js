import React, { Component } from 'react';
import {formatTimeDate} from '../utils/utils'

class CommentCard extends Component {
  state = {
    commentSm: true
  }
  render() {
    const { author, body, created_at, votes } = this.props.comment;
    const { commentSm } = this.state;
    let newBody = (commentSm && body.length > 97) ? body.substring(0, 97) + '...' : body;
    return (
      <li className='comment-card'>
        <button onClick={this.resizeText}>
          <div className='time-and-counts'>
            <p className='created-at'>{formatTimeDate(created_at)}</p>
            <p className='counts'>
              <span role='img' aria-label='vote-count'>👏</span>: {votes}
            </p>          
          </div>
          <div className='author-body'>
            <p className='body'>{newBody}</p>
            <h5 className='author'>{author}</h5>
          </div>
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