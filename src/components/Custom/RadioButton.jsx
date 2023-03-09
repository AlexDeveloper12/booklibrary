import React from 'react';
import { FormControlLabel, Radio } from '@mui/material';
import PropTypes from 'prop-types';

function RadioButton({
  label, value, index, filterChange,
}) {
  return (
    <div>
      <FormControlLabel value={value} control={<Radio name="filterrb" id={`filter-value-rb-${index}`} value={value} onChange={(event) => filterChange(event)} />} label={label} />
    </div>

  );
}

export default RadioButton;

RadioButton.defaultProps = {
  label: '',
  value: '',
  index: 0,
  filterChange: null,
};

RadioButton.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  index: PropTypes.number,
  filterChange: PropTypes.func,
};
