import React from 'react';

const SortDocs = ({ handleSort, areArticles=false }) => {  
  return (
    <div className='sort-select'>
      
      <select onChange={handleSort} className='minimal'>
        <option value='created_at desc'>newest</option>
        <option value='created_at asc'>oldest</option>
        {(areArticles) && (
          <>
            <option value='comment_count desc'>most comments</option>
            <option value='comment_count asc'>fewest comments</option>
          </>
        )}
        <option value='votes desc'>most popular</option>
        <option value='votes asc'>least popular</option>
      </select> 
    </div>
  );
};

export default SortDocs;