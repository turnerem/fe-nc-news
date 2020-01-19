import React from 'react';
import { Link } from '@reach/router'
import { capitalize } from '../utils/utils'

const TopicCard = ({ topic }) => {
  const { slug, description } = topic;
  return (
    <li>
      <Link to={`/topics/${slug}`}>
        <p><span className='text-span'>{capitalize(slug)}</span> - {description}</p>
        <p></p>

      </Link>
    </li>
  );
};

export default TopicCard;