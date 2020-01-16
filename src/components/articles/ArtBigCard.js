import React from 'react';
import { formatDate } from '../utils/utils'
import VoteButton from '../VoteButton';

const ArtBigCard = ({ article }) => {
  const { 
    topic, title, author, 
    body,
    created_at, article_id,
    votes, comment_count } = article;

  const patch = { key: 'article', endpoint: `articles/${article_id}`}

  return (
    <>
      <h3>{topic}: {title}<span role='img' aria-label='comments'>💬</span>: {comment_count}</h3>
      <h4>{author} {formatDate(created_at)}</h4>
      <p>
        {body}
      </p>
      <VoteButton votes={votes} patch={patch} />
    </>
  );
};

export default ArtBigCard;