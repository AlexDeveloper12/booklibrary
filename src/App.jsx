import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { RadioGroup } from '@mui/material';
import ClipLoader from 'react-spinners/ClipLoader';
import './App.css';
import Search from './components/Search';
import Book from './components/Book/Book';
// import { apiURL } from './components/API/calls';
// import { apiKey } from './components/API/keys';
import {
  bookTypes, filterButtonValues, printTypes, customAuthors, customGenres, formatDate,
} from './components/Utils/Utils';
import RadioButton from './components/Custom/RadioButton';
import CustomDropdown from './components/Custom/CustomDropdown';
import BookAdditionalInfo from './components/Modals/BookAdditionalInfo';
import Error from './components/Custom/Error';
import AddedToBookshelf from './components/Custom/AddedToBookshelf';
import NavigationHeader from './components/Navigation/NavigationHeader';
import useModal from './components/CustomHooks/useModal';
import useInput from './components/CustomHooks/useInput';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookFilter, setBookFilter] = useState('');
  const [chosenBook, setChosenBook] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const maxResults = 20;
  const startIndex = 0;

  const [isBookOpen, setIsBookOpen] = useModal();
  const [isAddedToFavouriteOpen, setIsAddedToFavouriteOpen] = useModal();
  const [isErrorMessageOpen, setIsErrorMessageOpen] = useModal();
  const search = useInput('');
  const bookType = useInput('');
  const printType = useInput('');

  const toggleAdditionalBookInfoModal = (book) => {
    if (book !== null && book !== undefined) {
      setChosenBook(book);
    }
    setIsBookOpen();
  };

  const submitSearch = () => {
    let additionalQueryParams = '';
    let filterValue = '';

    if (search.value !== '') {
      if (bookType.value !== '') {
        additionalQueryParams += `&filter=${bookType.value}`;
      }

      if (printType.value !== '') {
        additionalQueryParams += `&printType=${printType.value}`;
      }

      if (bookFilter === 'ISBN') {
        filterValue = 'isbn:';
      }

      setLoading(true);
      axios.get(`${import.meta.env.VITE_APP_GOOGLE_API_URL}q=${filterValue}${search.value}&key=${import.meta.env.VITE_APP_GOOGLE_API_KEY}&startIndex=${startIndex}&maxResults=${maxResults}${additionalQueryParams}`)
        .then((response) => {
          if (response !== null && response.data !== null) {
            setBooks(response.data.items);
            setLoading(false);
          }
        })
        .catch((error) => {
          setErrorMessage(error);
        });
    } else {
      setErrorMessage('Please ensure you enter a book title or isbn number');
      setIsErrorMessageOpen();
    }
  };

  const addToBookshelf = (item) => {
    const { volumeInfo } = item;

    const bookID = item.id;

    const bookInBookshelf = (localStorage.getItem(`bookshelfitem-${bookID}`) !== null);

    console.log(bookID);

    if (bookInBookshelf) {
      setErrorMessage('This book is already in your bookshelf. Please choose another!');
      setIsErrorMessageOpen();
    } else {
      const customAuthorItem = customAuthors(volumeInfo);
      const customGenreItem = customGenres(volumeInfo);
      const customDate = formatDate(volumeInfo.publishedDate);

      const bookshelfItem = JSON.stringify({
        id: bookID,
        title: volumeInfo.title,
        description: volumeInfo.description,
        pageCount: volumeInfo.pageCount,
        rating: volumeInfo.rating,
        imageUrl: volumeInfo.imageLinks.thumbnail,
        authors: customAuthorItem,
        genres: customGenreItem,
        publisher: volumeInfo.publisher,
        publishedDate: customDate,
      });

      localStorage.setItem(`bookshelfitem-${bookID}`, bookshelfItem);
      setIsAddedToFavouriteOpen();
    }
  };

  const handleBookFilter = (event) => {
    setBookFilter(event.target.value);
  };

  if (loading) {
    return (
      <div className="text-center mt-2">
        <ClipLoader loading={loading} size={150} color="blue" />
      </div>
    );
  }
  return (
    <div>

      <NavigationHeader />

      <section id="cover" className="mt-4">
        <div id="cover-caption">
          <div className="container">
            <div className="row text-white">
              <div className="col-md-12">
                <div className="px-2">
                  <form>
                    <div className="form-group">
                      <div className="input-group">
                        <Search
                          searchValue={search.value}
                          onChange={search.onChange}
                          btnSearch={submitSearch}
                        />

                        <Error
                          isError={isErrorMessageOpen}
                          toggleError={setIsErrorMessageOpen}
                          errorMessage={errorMessage}
                        />

                        <AddedToBookshelf
                          isOpen={isAddedToFavouriteOpen}
                          toggleFavouriteModal={setIsAddedToFavouriteOpen}
                        />

                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="input-group">

                        <CustomDropdown
                          id="printType"
                          name="printtype"
                          value={printType.value}
                          handler={printType.onChange}
                          type={printTypes}
                          key="keyprinttype"
                        />

                      </div>

                    </div>

                    <div className="form-group row">
                      <div className="input-group">

                        <CustomDropdown
                          id="bookType"
                          name="booktype"
                          value={bookType.value}
                          handler={bookType.onChange}
                          type={bookTypes}
                          key="keybooktype"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      <div className="container">

        <div className="row form-group mb-4">

          <RadioGroup
            name="searchfilter"
          >
            {
              filterButtonValues.map(({ label, value }, index) => (
                <RadioButton
                  label={label}
                  value={value}
                  index={index}
                  filterChange={handleBookFilter}
                  key={`$rb-key-${value}`}
                />
              ))
            }

          </RadioGroup>
        </div>

      </div>

      <div className="row">

        {
          books !== null && books !== undefined && books.length > 0
            ? books.map((book, index) => (
              <Book
                key={book !== undefined ? book.id : index}
                item={book}
                toggleModal={toggleAdditionalBookInfoModal}
                addToBookshelf={addToBookshelf}
              />
            ))
            : null
        }
      </div>

      <div className="row">
        <BookAdditionalInfo
          isOpen={isBookOpen}
          item={chosenBook}
          toggleModal={setIsBookOpen}
        />
      </div>

    </div>
  );
}

export default App;
