import React from 'react';
import { Link } from '@reach/router'

const TopicCard = ({ topic }) => {
  const { slug, description } = topic;
  return (
    <li>
      <Link to={`/topics/${slug}`}>
        <span>{slug}</span>{description}
      </Link>
    </li>
  );
};

export default TopicCard;