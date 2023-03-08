import React from 'react';
import ReactModal from 'react-modal';
import { Button, Typography } from '@mui/material';
import {
  customStyles, customAuthors, customGenres, formatDate,
} from '../Utils/Utils';

ReactModal.setAppElement('#root');

function BookAdditionalInfo({ item, isOpen, toggleModal }) {
  const { saleInfo, volumeInfo } = item;

  if (item !== null && item !== undefined) {
    return (
      <div>
        <ReactModal
          isOpen={isOpen}
          style={customStyles}
          contentLabel={`${volumeInfo !== undefined ? volumeInfo.title : ''}`}
        >
          <div className="container">
            <Typography variant="body1" color="text.secondary">

              <div className="row mb-3">
                <div className="col-md-12 text-center">
                  {volumeInfo !== undefined && volumeInfo.imageLinks.thumbnail !== undefined ? <img src={volumeInfo.imageLinks.thumbnail} /> : <span>No image available</span>}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-1">
                  Title:
                    </div>
                <div className="col-md-11">
                  <span>{volumeInfo !== undefined && volumeInfo.title !== undefined ? volumeInfo.title : 'No title available'}</span>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-1">
                  Description:
                    </div>
                <div className="col-md-11">
                  <span>{volumeInfo !== undefined && volumeInfo.title !== undefined ? volumeInfo.description : 'No description available'}</span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-1">
                  Publisher:
                    </div>
                <div className="col-md-11">
                  <span>{volumeInfo !== undefined && volumeInfo.publisher !== undefined ? volumeInfo.publisher : 'No publisher information available'}</span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-1">
                  Published:
                    </div>
                <div className="col-md-11">
                  <span>{volumeInfo !== undefined && volumeInfo !== undefined ? formatDate(volumeInfo.publishedDate) : null}</span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-1">
                  Author(s):
                </div>
                <div className="col-md-11">
                  <span>
                    {' '}
                    {customAuthors(volumeInfo)}
                  </span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-1">
                  Genre(s):
                </div>
                <div className="col-md-11">
                  <span>{customGenres(volumeInfo)}</span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-1">
                  Is Ebook?:
                </div>
                <div className="col-md-11">
                  <span>{saleInfo !== undefined && saleInfo.isEbook !== undefined ? 'Yes' : 'No'}</span>
                </div>
              </div>

            </Typography>

            <div className="row ">
              <div className="col-md-12 text-center">
                <Button variant="contained" onClick={toggleModal}>Close</Button>
              </div>
            </div>

          </div>

        </ReactModal>
      </div>
    );
  }
  return (
    <div>
      There is no additional information for this book
    </div>
  );
}

export default BookAdditionalInfo;
