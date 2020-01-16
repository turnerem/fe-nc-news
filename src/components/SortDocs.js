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
    <div className='article-browse-buttons'>
      <div>
        <span>sort by:</span>
        <button onClick={handleClick} value='created_at'>date</button>
        <button onClick={handleClick} value='comment_count'># comments</button>
        <button onClick={handleClick} value='votes'># votes</button>
      </div>
      <div>
        <span>order:</span>
        <button onClick={handleClick} value={newOrder}>{newOrderButton}</button>
      </div>
      <div>
        <button onClick={handleClick} value='back'><span role='img' aria-label='left'>⬅️</span></button>
        <span>page</span>
        <button onClick={handleClick} value='right'><span role='img' aria-label='right'>➡️</span></button>
      </div>

    </div>
  );
};

export default SortDocs;