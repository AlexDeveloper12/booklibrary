import React from 'react';
import { Alert } from '@mui/material';

function Error({ isError, toggleError, errorMessage }) {
  return (
    <div className="row mb-4">
      {
            isError
              ? (
                <div>
                  <Alert severity="error">
                    <span>{errorMessage}</span>
                    <button type="button" className="close btn btn-secondary mx-2" data-dismiss="alert" aria-label="Close" onClick={toggleError}>
                      <span aria-hidden="true" style={{ color: 'white' }}> &times;</span>
                    </button>
                  </Alert>

                </div>
              )

              : null
          }

    </div>
  );
}

export default Error;
