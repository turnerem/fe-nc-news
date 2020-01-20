import React, { Component } from 'react';
import {formatTimeDate} from '../utils/utils'
import VoteButton from '../VoteButton';
import DeleteButton from '../DeleteButton';


class CommentCard extends Component {
  state = {
    commentSm: true
  }
  render() {
    const { user, comment, deleteDataView, idxToDelete } = this.props;
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
            <button onClick={this.resizeText} className='comment-button'>
              <p><span className='text-span'>{author}:</span> {newBody}</p>
            </button>
            
            {(user === author) && (<DeleteButton deleteDataView={() => deleteDataView(idxToDelete)} />)}

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