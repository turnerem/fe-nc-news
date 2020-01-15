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

  // const goToNewView = () => {
  //   return <Article
  //   return <Link to= />
  // }

  return (
    <li className='art-sm-card'>
      <Link to={`/article/${article_id}`} >
      {/* <button> */}
        <p className='created-at'>{formatDate(created_at)}</p>
        <p className='votes'>votes: {votes}</p>
        <p className='comments'>comments: {comment_count}</p>
        <h4 className='title'>{title}</h4>
        <h5 className='author'>{author}</h5>
      {/* </button> */}

      </Link>
    </li>
    // <hr />
  );
};

export default ArtSmCard;