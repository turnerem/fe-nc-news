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
        <p className='title-author'><span>{title}</span>{author}</p>
        <p className='created-at'>{formatDate(created_at)}</p>
        <p className='counts'>votes: {votes} comments: {comment_count}</p>
      {/* </button> */}

      </Link>
    </li>
    // <hr />
  );
};

export default ArtSmCard;