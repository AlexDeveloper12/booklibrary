import React from 'react';
import { FormControlLabel, Radio } from '@mui/material';

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
  label: '',
  value: '',
  index: 0,
  filterChange: null,
};
