import React from 'react';

function BookshelfCount({ count }) {
  return (

    <span className="mb-2">
      Bookshelf count:
      {count}
    </span>
  );
}

export default BookshelfCount;

BookshelfCount.defaultProps = {
  count: 0,
};

BookshelfCount.propTypes = {
  count: 0,
};
