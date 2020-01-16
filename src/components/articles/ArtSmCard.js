import React from 'react';
import { Link } from '@reach/router'
import { formatDate } from '../utils/utils'

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
      <Link to={`/topics/${topic}/${article_id}`} className='title-author'>
        {/* <div className='title-author'> */}
          <h4 className='title'>{title}</h4>
          <h5 className='author'>{author}</h5>
        {/* </div> */}
      </Link>
    </li>
    // <hr />
  );
};

export default ArtSmCard;