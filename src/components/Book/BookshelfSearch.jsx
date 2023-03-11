import React from 'react';
import { TextField } from '@mui/material';

function BookshelfSearch({value, handleChange}) {
  return (
    <TextField
      value={value}
      onChange={(event) => handleChange(event)}
      type="text"
      placeholder="Search your bookshelf"
      size="medium"
      style={{width:'50%', margin:'0 auto'}}
    />
  );
}

export default BookshelfSearch;
