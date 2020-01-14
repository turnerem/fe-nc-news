import React from 'react';

const SortDocs = ({ handleClick, order }) => {
  console.log(order, 'the order')
  let newOrder = 'desc';
  let newOrderButton = 'ascending'
  if (order === 'desc') {
    newOrder = 'asc';
    newOrderButton = 'descending'
  }  
  
  return (
    <div>
      <span>sort by:</span>
      <button onClick={handleClick} value='created_at'>date</button>
      <button onClick={handleClick} value='comment_count'># comments</button>
      <button onClick={handleClick} value='votes'># votes</button>
      <span>order:</span>
      <button onClick={handleClick} value={newOrder}>{newOrderButton}</button>
    </div>
  );
};

export default SortDocs;