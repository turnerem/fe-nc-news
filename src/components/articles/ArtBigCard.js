import React from 'react';
import { formatDate } from './utils/utils'

const ArtBigCard = ({ article }) => {
  const { 
    title, author, 
    body,
    created_at, 
    votes, comment_count,
    article_id } = article;
  return (
    <div>
      <h2>{title} {formatDate(created_at)}</h2>
      <p>
        {body}
      </p>
    </div>
  );
};

export default ArtBigCard;