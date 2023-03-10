import React from 'react';
import ReactModal from 'react-modal';
import { Button, Typography } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import {
  customStyles, customAuthors, customGenres, formatDate, customISBNNumber,
} from '../Utils/Utils';
import BookInfoRow from './BookInfoRow';

ReactModal.setAppElement('#root');

function BookAdditionalInfo({ item, isOpen, toggleModal }) {
  const { saleInfo, volumeInfo } = item;

  console.log(item);

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
                  {volumeInfo !== undefined && volumeInfo.imageLinks.thumbnail !== undefined
                    ? <img src={volumeInfo.imageLinks.thumbnail} alt="Alt text" /> : <span>No image available</span>}
                </div>
              </div>

              {
                volumeInfo !== undefined ? (
                  <BookInfoRow
                    label="Title"
                    item={volumeInfo.title}
                    nullMessage="No title"
                  />
                ) : null
              }

              {
                volumeInfo !== undefined ? (
                  <BookInfoRow
                    label="Description"
                    item={volumeInfo.description}
                    nullMessage="No description"
                  />
                ) : null
              }

              {
                volumeInfo !== undefined ? (
                  <BookInfoRow
                    label="Publisher:"
                    item={volumeInfo.publisher}
                    nullMessage="No publisher"
                  />
                )
                  : null
              }

              {
                volumeInfo !== undefined ? (
                  <BookInfoRow
                    label="Published:"
                    item={formatDate(volumeInfo.publishedDate)}
                    nullMessage="No published date"
                  />
                )
                  : null
              }

              {
                volumeInfo !== undefined ? (
                  <BookInfoRow
                    label="Author(s):"
                    item={customAuthors(volumeInfo)}
                    nullMessage="No authors"
                  />
                )

                  : null
              }

              {
                volumeInfo !== undefined ? (
                  <BookInfoRow
                    label="Genre(s):"
                    item={customGenres(volumeInfo)}
                    nullMessage="No genres"
                  />
                )
                  : null
              }

              {
                saleInfo !== undefined ? (
                  <BookInfoRow
                    label="Is Ebook?:"
                    item={saleInfo.isEbook ? 'Yes' : 'No'}
                    nullMessage="No"
                  />
                )
                  : null
              }

              {
                volumeInfo !== undefined ? (
                  <BookInfoRow
                    label="Google Books URL:"
                    itemType="link"
                    item={volumeInfo.canonicalVolumeLink}
                    nullMessage="No Google Books URL available"
                    urlLabel="Google Books Preview"
                  />
                )
                  : null
              }

              {
                volumeInfo !== undefined ? (
                  <BookInfoRow
                    label="ISBN:"
                    item={customISBNNumber(volumeInfo.industryIdentifiers)}
                    itemType="isbn"
                  />
                )
                  : null
              }

              {
                saleInfo !== undefined && saleInfo.saleability === 'FOR_SALE'
                  ? (
                    <BookInfoRow
                      label="Buy Book URL:"
                      itemType="link"
                      item={saleInfo.buyLink}
                      urlLabel="Purchase E-book"
                    />
                  )

                  : null
              }

              {
                saleInfo !== undefined && saleInfo.saleability === 'FOR_SALE'
                  ? (
                    <BookInfoRow
                      label="Retail Price:"
                      item={`£${saleInfo.retailPrice.amount}`}
                    />
                  )

                  : null
              }

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

BookAdditionalInfo.defaultProps = {
  item: {},
  isOpen: false,
  toggleModal: null,
};

BookAdditionalInfo.propTypes = {
  item: PropTypes.string,
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
};
