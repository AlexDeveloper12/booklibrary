import React from 'react';
import {
  Table, TableContainer, Paper, TableRow, TableHead, TableCell, TableBody,
} from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import BookShelfItem from './BookShelfItem';

function BookshelfTable({ bookShelf, toggleDelete }) {
  return (

    <TableContainer component={Paper} style={{ width: '90%', margin: '0 auto' }}>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              Book Cover
            </TableCell>
            <TableCell align="center">
              Title
            </TableCell>
            <TableCell align="center">
              Description
            </TableCell>
            <TableCell align="center">
              Author(s)
            </TableCell>
            <TableCell align="center">
              Genre(s)
            </TableCell>
            <TableCell align="center">
              Publisher
            </TableCell>
            <TableCell align="center">
              Published
            </TableCell>
            <TableCell align="center">
              Delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
              bookShelf.map((value) => (
                <BookShelfItem
                  item={value}
                  openDeleteModal={toggleDelete}
                  key={value.id}
                />
              ))
            }
        </TableBody>
      </Table>

    </TableContainer>
  );
}

export default BookshelfTable;

BookshelfTable.defaultProps = {
  bookShelf: [],
  toggleDelete: null,
};

BookshelfTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  bookShelf: PropTypes.array,
  toggleDelete: PropTypes.func,
};
