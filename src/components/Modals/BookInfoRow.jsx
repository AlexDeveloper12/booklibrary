import React from 'react';
import PropTypes from 'prop-types';

function BookInfoRow({
  item, label, nullMessage, itemType, urlLabel
}) {
  const determineHTMLOutput = () => {
    switch (itemType) {
      case 'link':
        return <a href={item} target="_blank" rel="noreferrer">{urlLabel}</a>;
      case 'isbn':
        return <div>{item}</div>;
      default:
        return item;
    }
  };

  return (
    <div className="row mb-3">
      <div className="col-md-2">
        {label}
      </div>
      <div className="col-md-10">
        <span>{item !== undefined ? determineHTMLOutput() : `${nullMessage}`}</span>
      </div>
    </div>
  );
}

export default BookInfoRow;

BookInfoRow.defaultProps = {
  item: {},
  label: '',
  nullMessage: '',
  itemType: '',
};

BookInfoRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object,
  label: PropTypes.string,
  nullMessage: PropTypes.string,
  itemType: PropTypes.string
};
