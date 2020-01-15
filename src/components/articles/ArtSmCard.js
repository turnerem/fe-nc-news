import React from 'react';
import { Link } from '@reach/router'
import { formatDate } from '../utils/utils'

const ArtSmCard = ({ article }) => {
  const { 
    title, author, 
    created_at, 
    votes, comment_count,
    article_id
  } = article;
  return (
    <li className='art-sm-card'>
      


      <div className='title-author'>
        <Link to={`/article/${article_id}`} >
          <span>{title}</span>{author}
        </Link>
      
      </div>
      <div className='created-at'>{formatDate(created_at)}</div>
      <div className='counts'>
        <p>votes: {votes} comments: {comment_count}</p>
        {/* <p></p>   */}
      </div>
    </li>
    // <hr />
  );
};

export default ArtSmCard;