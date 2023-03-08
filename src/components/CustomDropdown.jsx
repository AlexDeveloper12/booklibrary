import React from 'react';
import { Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

function CustomDropdown({
  id, name, value, type, handler,
}) {
  return (
    <Select
      id={id}
      name={name}
      style={{ width: '30%' }}
      value={value}
      onChange={(event) => handler(event)}
      key={id}
      className="mb-4"
    >
      <MenuItem value="-1">{`Please select ${name === 'printtype' ? 'print type' : 'book type'}`}</MenuItem>
      {
          type.map((dropdownValue) => (
            <MenuItem value={dropdownValue}>{dropdownValue}</MenuItem>
          ))
        }
    </Select>
  );
}

export default CustomDropdown;

CustomDropdown.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  handler: PropTypes.func,
};
