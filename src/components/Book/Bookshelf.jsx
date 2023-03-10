import React, { useState, useEffect } from 'react';
import { Alert } from '@mui/material';
import { CSVLink } from 'react-csv';
import NavigationHeader from '../Navigation/NavigationHeader';
import DeleteBookModal from '../Modals/DeleteBookModal';
import BookshelfCount from './BookshelfCount';
import BookshelfTable from './BookshelfTable';
import useModal from '../CustomHooks/useModal';
import useInput from '../CustomHooks/useInput';
import BookshelfSearch from './BookshelfSearch';

function Bookshelf() {
  const [bookShelf, setBookShelf] = useState([]);
  const [chosenDeleteBookID, setChosenDeleteBookID] = useState(0);

  const [isDeleteOpen, setIsDeleteOpen] = useModal();
  const bookShelfSearch = useInput('');

  const getBookshelfItems = () => {
    const tempArray = [];

    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);

      const value = JSON.parse(localStorage.getItem(key));

      tempArray.push(value);
    }
    setBookShelf(tempArray);
  };

  const filteredBooks = bookShelf.filter(
    ({ title, authors }) => title.toLowerCase().includes(bookShelfSearch.value.toLowerCase())
    || authors.toLowerCase().includes(bookShelfSearch.value.toLowerCase()),
  );

  useEffect(() => {
    getBookshelfItems();
  }, []);

  const toggleDelete = (bookID) => {
    setIsDeleteOpen(!isDeleteOpen);
    if (bookID !== 0) {
      setChosenDeleteBookID(bookID);
    }
  };

  const removeFromBookshelf = (bookID) => {
    toggleDelete(0);
    localStorage.removeItem(`bookshelfitem-${bookID}`);
    getBookshelfItems();
  };

  return (
    <div>
      <div className="row">
        <NavigationHeader />
      </div>

      <div className="row mt-3">
        <BookshelfSearch
          value={bookShelfSearch.value}
          handleChange={bookShelfSearch.onChange}
        />
      </div>

      <div className="row mt-4">

        {
          bookShelf.length > 0
            ? (
              <>

                <BookshelfCount
                  count={bookShelf.length}
                />

                <BookshelfTable
                  bookShelf={filteredBooks}
                  toggleDelete={toggleDelete}
                />
              </>
            )
            : (
              <div className="mx-2">
                {' '}
                <Alert severity="info" className="text-center">No books in bookshelf</Alert>
              </div>
            )
        }

      </div>

      <div className="row mt-4 mx-2">
        <CSVLink data={bookShelf}>Download Bookshelf data</CSVLink>
      </div>

      <div className="row">
        {
          isDeleteOpen
            ? (
              <DeleteBookModal
                isDeleteOpen={isDeleteOpen}
                toggleDeleteModal={toggleDelete}
                btnDelete={removeFromBookshelf}
                bookID={chosenDeleteBookID}
              />
            )

            : null
        }
      </div>
    </div>
  );
}

export default Bookshelf;
