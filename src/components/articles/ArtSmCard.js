import React from 'react';
import { Link } from '@reach/router'
import { formatDate } from '../utils/utils'
import { capitalize } from '../utils/utils';

const ArtSmCard = ({ article }) => {
  const { 
    title, author, 
    created_at, 
    votes, comment_count,
    article_id, topic
  } = article;

  return (
    <li className='art-sm-card'>
      <div className='time-and-counts'>
          <p className='created-at'>{formatDate(created_at)}</p>
          <p className='comment-count'>comments: {comment_count}</p>
          <p className='vote-count'>votes: {votes}</p>
      </div>
      <Link to={`/articles/${article_id}`} className='title-author'>
          <p className='topic'>{capitalize(topic)}</p>
          <h5 className='title'>{title}</h5>
          <h6 className='author'>by {author}</h6>
      </Link>
    </li>
    // <hr />
  );
};

export default ArtSmCard;