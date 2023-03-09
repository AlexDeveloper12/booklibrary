import React from 'react';
import { Alert } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

function AddedToBookshelf({ isOpen, toggleFavouriteModal }) {
  return (
    <div className="row">
      {
                isOpen
                  ? (
                    <div className="mt-2 mb-2">
                      <Alert severity="success">
                        This book has been added to your bookshelf!
                        <button type="button" className="btn btn-secondary mx-2" data-dismiss="alert" aria-label="Close" onClick={toggleFavouriteModal}>
                          <span aria-hidden="true" style={{ color: 'white' }}>&times;</span>
                        </button>
                      </Alert>

                    </div>
                  )

                  : null
            }

    </div>
  );
}

export default AddedToBookshelf;

AddedToBookshelf.defaultProps = {
  isOpen: false,
  toggleFavouriteModal: null,
};

AddedToBookshelf.propTypes = {
  isOpen: PropTypes.bool,
  toggleFavouriteModal: PropTypes.func,
};
