import React from 'react';
import { formatTimeDate } from './utils/utils';

const CommentCard = ({ comment, commentSm }) => {
  const { author, body, created_at, votes } = comment;

  return (
    <div>
      <p>COMMENT {author} {commentSm ? body.substring(0, Math.max(body.length, 280)) + '...' : body} {formatTimeDate(created_at)}</p>
    </div>
  );
};

export default CommentCard;