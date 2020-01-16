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
    let newBody = (commentSm && body.length > 97) ? body.substring(0, 97) + '...' : body;
    return (
      <li className='comment-card'>
          <div className='time-and-counts'>
            <p className='created-at'>{formatTimeDate(created_at)}</p>
            {/* <p className='counts'> */}
            <VoteButton votes={votes} patch={patch}/>
            {/* <VoteButton votes={votes} patch={patch} >
              <span role='img' aria-label='vote-count'>👏</span>
            </VoteButton>  : {votes} */}
            {/* </p>           */}
          </div>
        <button onClick={this.resizeText}>
          <p><span className='text-span'>{author}</span>{newBody}</p>
          {/* <DeleteBut */}
        </button>
        {(currentUser === author) && (<DeleteButton className='delete-button' deleteComment={() => deleteComment(comment_id)} />)}
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