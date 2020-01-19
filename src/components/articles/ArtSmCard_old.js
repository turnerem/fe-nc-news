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

  // const goToNewView = () => {
  //   return <Article
  //   return <Link to= />
  // }

  return (
    <li className='art-sm-card'>
      <div className='time-and-counts'>
          <p className='created-at'>{formatDate(created_at)}</p>
          <p className='counts'>
            <span role='img' aria-label='vote-count'>👏</span>: {votes}
            <span role='img' aria-label='comment-count'>💬</span>: {comment_count}
          </p>
        </div>
      <Link to={`/articles/${article_id}`} className='title-author'>
          <h5 className='title'>{title}</h5>
          <h6 className='author'>{author}</h6>
        {/* </div> */}
      </Link>
    </li>
    // <hr />
  );
};

export default ArtSmCard;