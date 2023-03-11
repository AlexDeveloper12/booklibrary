import React from 'react';

function BookshelfCount({ count }) {
  return (
    <div className="row mb-2">
      <span>
        Bookshelf count:
        {count}
      </span>
    </div>
  );
}

export default BookshelfCount;

BookshelfCount.defaultProps = {
  count: 0,
};

BookshelfCount.propTypes = {
  count: 0,
};
