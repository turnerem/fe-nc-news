import React from 'react';

const SortDocs = ({ handleClick }) => {
  return (
    <div>
      <span>sort by:</span>
      <button onClick={handleClick} value='created_at'>date</button>
      <button onClick={handleClick} value='comment_count'># comments</button>
      <button onClick={handleClick} value='votes'># votes</button>
      <span>orderMAKE ME ONE BUTTON:</span>
      <button onClick={handleClick} value='asc'>AscendingMAKE ME ONE BUTTON</button>
      <button onClick={handleClick} value='desc'>Descending</button>
    </div>
  );
};

export default SortDocs;