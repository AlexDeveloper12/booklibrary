import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TableRow, TableCell } from '@mui/material';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { formatDate, customBookShelfAuthor, customBookShelfGenre } from '../Utils/Utils';
import '../../styles/BookShelfItem.css';

function BookShelfItem({ item, openDeleteModal }) {
  return (
    <TableRow>
      <TableCell scope="row" className="centerText centerImage "><img src={item.imageUrl} width={250} height={250} /></TableCell>
      <TableCell scope="row">{item.title}</TableCell>
      <TableCell scope="row">{item.description}</TableCell>
      <TableCell scope="row">
        {customBookShelfAuthor(item.authors)}
        {' '}
      </TableCell>
      <TableCell scope="row">{customBookShelfGenre(item.genres)}</TableCell>
      <TableCell scope="row">{item.publisher}</TableCell>
      <TableCell scope="row">
        {' '}
        {formatDate(item.publishedDate)}
      </TableCell>
      <TableCell scope="row" className="centerText"><FontAwesomeIcon icon={faTrash} className="text-center" onClick={() => openDeleteModal(item.id)} /></TableCell>
    </TableRow>
  );
}

export default BookShelfItem;

BookShelfItem.defaultProps = {
  item: {},
  openDeleteModal: null,
};

BookShelfItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object,
  openDeleteModal: PropTypes.func,
};
