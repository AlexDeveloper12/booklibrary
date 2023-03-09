import React, { useState, useEffect } from 'react';
import NavigationHeader from '../Navigation/NavigationHeader';
import DeleteBookModal from '../Modals/DeleteBookModal';
import BookshelfCount from './BookshelfCount';
import BookshelfTable from './BookshelfTable';

function Bookshelf() {
  const [bookShelf, setBookShelf] = useState([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [chosenDeleteBookID, setChosenDeleteBookID] = useState(0);

  const getBookshelfItems = () => {
    const tempArray = [];

    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);

      const value = JSON.parse(localStorage.getItem(key));

      tempArray.push(value);
    }
    setBookShelf(tempArray);
  };

  useEffect(() => {
    getBookshelfItems();
  }, [bookShelf]);

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
      <div className="row mt-4">

        {
          bookShelf.length > 0
            ? (
              <>

                <BookshelfCount
                  count={bookShelf.length}
                />

                <BookshelfTable
                  bookShelf={bookShelf}
                  toggleDelete={toggleDelete}
                />
              </>
            )
            : (
              <div style={{ backgroundColor: '#2c82c9' }} className="row justify-content-center">
                {' '}
                <span className="text-center text-white p-2">No books in bookshelf</span>
              </div>
            )
        }

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
