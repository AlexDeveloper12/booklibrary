import React from 'react';
import { Button, TextField } from '@mui/material';


function Search({ searchValue, onChange, btnSearch }) {
  return (
    <div className="col-md-12">
      <div className="input-group mb-3">

        <TextField
          value={searchValue}
          onChange={(event) => onChange(event)}
          type="text"
          placeholder="Search via Title/ISBN"
          size="medium"
        />

        <Button variant="contained" colour="primary" onClick={btnSearch}>Search</Button>
      </div>
    </div>

  );
}

export default Search;
