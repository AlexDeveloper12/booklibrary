import React from 'react';
import PropTypes from 'prop-types';

function DropdownContainer({ children }) {
  return (
    <div className="form-group row">
      <div className="input-group">
        {children}
      </div>
    </div>
  );
}
export default DropdownContainer;

DropdownContainer.propTypes = {
    children: PropTypes.element,
};