import React from 'react';
import { Link } from '@reach/router'
import { capitalize } from '../utils/utils'
import BarChart from './BarChart';

const TopicCard = ({ topic }) => {
  const { slug, description } = topic;
  return (
    <li className='topic-card'>
      <Link to={`/topics/${slug}`}>
        <p className='left'><span className='text-span'>{capitalize(slug)}</span> - {description}</p>
        <p></p>

      </Link>
      <BarChart topic={slug} />
    </li>
  );
};

export default TopicCard;