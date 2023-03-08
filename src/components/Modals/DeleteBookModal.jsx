import React from 'react';
import ReactModal from 'react-modal';
import { Button } from '@mui/material';
import { customDeleteStyles } from '../Utils/Utils';
import PropTypes from 'prop-types';

ReactModal.setAppElement('#root');

function DeleteBookModal({
  isDeleteOpen, toggleDeleteModal, btnDelete, bookID,
}) {
  return (
    <ReactModal
      isOpen={isDeleteOpen}
      style={customDeleteStyles}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12 center-block text-center">
            <span>Are you sure you want to delete this book from your bookshelf?</span>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <Button variant="contained" style={{ marginRight: '20px' }} color="error" onClick={() => btnDelete(bookID)}>Delete</Button>
            <Button variant="contained" color="primary" onClick={toggleDeleteModal}>Cancel </Button>

          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default DeleteBookModal;

DeleteBookModal.defaultProps = {
  isDeleteOpen: false,
  toggleDeleteModal: null,
  btnDelete: null,
  bookID: 0,
};

DeleteBookModal.propTypes = {
  isDeleteOpen: PropTypes.bool,
  toggleDeleteModal: PropTypes.func,
  btnDelete: PropTypes.func,
  bookID: PropTypes.number,
};
