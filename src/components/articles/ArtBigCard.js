import React from 'react';
import { formatDate } from '../utils/utils'

const ArtBigCard = ({ article }) => {
  const { 
    topic, title, author, 
    body,
    created_at, 
    votes, comment_count } = article;
  return (
    <>
      <h3>{topic}: {title}<span>votes: {votes} comments: {comment_count}</span></h3>
      <h4>{author} {formatDate(created_at)}</h4>
      <p>
        {body}
      </p>
    </>
  );
};

export default ArtBigCard;