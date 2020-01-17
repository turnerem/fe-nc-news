import React from 'react';

const SortDocs = ({ handleSortClick, handlePageClick, order }) => {
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
        <button onClick={handleSortClick} value='created_at'>date</button>
        <button onClick={handleSortClick} value='comment_count'># comments</button>
        <button onClick={handleSortClick} value='votes'># votes</button>
      </div>
      <div>
        <span>order:</span>
        <button onClick={handleSortClick} value={newOrder}>{newOrderButton}</button>
      </div>
      <div>
        <button onClick={handlePageClick} value='back'><span role='img' aria-label='left'>⬅️</span></button>
        <span>page</span>
        <button onClick={handlePageClick} value='right'><span role='img' aria-label='right'>➡️</span></button>
      </div>

    </div>
  );
};

export default SortDocs;