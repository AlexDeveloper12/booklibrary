import React from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

function CustomDropdown({
  id, name, value, type, handler,
}) {
  return (
    <FormControl fullWidth>
      <InputLabel id={`demo-simple-select-label-${value}`}>{`Please select ${name === 'printtype' ? 'print type' : 'book type'}`}</InputLabel>
      <Select
        labelId={`demo-simple-select-label-${value}`}
        id={id}
        name={name}
        style={{ width: '30%' }}
        value={value}
        onChange={(event) => handler(event)}
        key={id}
        className="mb-4"
        label="Please select"
        color="primary"
      >
        {
            type.map((dropdownValue) => (
              <MenuItem value={dropdownValue}>{dropdownValue}</MenuItem>
            ))
        }
      </Select>
    </FormControl>
  );
}

export default CustomDropdown;

CustomDropdown.defaultProps = {
  id: '',
  name: '',
  value: '',
  type: [],
  handler: null,
};

CustomDropdown.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  type: PropTypes.array,
  handler: PropTypes.func,
};
