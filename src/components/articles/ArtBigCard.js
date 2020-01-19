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
    <div className='art-big-card'>
      <h3>{title}</h3>
      <h4>by <span className='text-span'>{author}</span>, {formatDate(created_at)}</h4>
      <p className='art-body'>
        {body}
      </p>
      <p className='recommend'>Recommend this article? <VoteButton votes={votes} patch={patch} /></p>
      
    </div>
  );
};

export default ArtBigCard;