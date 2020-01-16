import React from 'react';
import { formatDate } from '../utils/utils'
import VoteButton from '../VoteButton';

const ArtBigCard = ({ article }) => {
  const { 
    topic, title, author, 
    body,
    created_at, article_id,
    votes } = article;

  const patch = { key: 'article', endpoint: `articles/${article_id}`}

  return (
    <>
      <h3>{topic}: {title}</h3>
      <h4>{author} {formatDate(created_at)}</h4>
      <p>
        {body}
      </p>
      <VoteButton votes={votes} patch={patch} />
    </>
  );
};

export default ArtBigCard;