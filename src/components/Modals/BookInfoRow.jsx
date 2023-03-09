import React from 'react';
import PropTypes from 'prop-types';

function BookInfoRow({ item, label, nullMessage }) {
  return (
    <div className="row mb-3">
      <div className="col-md-1">
        {label}
      </div>
      <div className="col-md-11">
        <span>{item !== undefined ? item : `${nullMessage}`}</span>
      </div>
    </div>
  );
}

export default BookInfoRow;

BookInfoRow.defaultProps = {
  item: {},
  label: '',
  nullMessage: '',
};

BookInfoRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object,
  label: PropTypes.string,
  nullMessage: PropTypes.string,
};
