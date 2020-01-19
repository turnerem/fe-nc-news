import React, { Component } from 'react';
import {formatTimeDate} from '../utils/utils'
import VoteButton from '../VoteButton';
import DeleteButton from '../DeleteButton';


class CommentCard extends Component {
  state = {
    commentSm: true
  }
  render() {
    const { currentUser, comment, deleteComment } = this.props;
    const { author, body, created_at, votes, comment_id } = comment;
    const { commentSm } = this.state;
    const patch = { key: 'comment', endpoint: `comments/${comment_id}`}
    let newBody = (commentSm && body.length > 105) ? body.substring(0, 105) + '...' : body;
    return (
      <li className='list-group comment-card'>
          <div className='time-and-counts'>
            <p className='created-at'>{formatTimeDate(created_at)}</p>
            <VoteButton votes={votes} patch={patch}/>
          </div>
          {/* <div className='comment alert alert-dismissible alert-light'> */}
            <button onClick={this.resizeText} className='comment-button'>
              <p><span className='text-span'>{author}:</span> {newBody}</p>
            </button>
            {(currentUser === author) && (<DeleteButton deleteComment={() => deleteComment(comment_id)} />)}

          {/* </div> */}
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