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
      <li>
        <button onClick={this.resizeText}>
          <p><span>{author}</span>{formatTimeDate(created_at)}, votes: {votes}</p>
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