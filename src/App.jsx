import React, { useState } from 'react';
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import './App.css';
import Search from './components/Search';
// import { apiKey } from "../src/components/API/keys";
// import { apiURL } from "../src/components/API/calls";
import Book from './components/Book';
import { bookTypes, filterButtonValues, printTypes } from './components/Utils/Utils';
import RadioButton from './components/RadioButton';
import CustomDropdown from './components/CustomDropdown';
import BookAdditionalInfo from './components/Modals/BookAdditionalInfo';
import Error from './components/Error';
import AddedToBookshelf from './components/AddedToBookshelf';
import { customAuthors, customGenres, formatDate } from "./components/Utils/Utils";
import NavigationHeader from './components/Navigation/NavigationHeader';
import { RadioGroup } from "@mui/material";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [books, setBooks] = useState([]);
  const [maxResults, setMaxResults] = useState(20);
  const [loading, setLoading] = useState(false);
  const [chosenPrintType, setChosenPrintType] = useState("");
  const [chosenBookType, setChosenBookType] = useState("");
  const [bookFilter, setBookFilter] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [isBookAddInfo, setIsBookAddInfo] = useState(false);
  const [chosenBook, setChosenBook] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [addedBookToFavourite, setAddedBookToFavourite] = useState("");

  const toggleAdditionalBookInfoModal = (book) => {
    if (book !== null && book !== undefined) {
      setChosenBook(book);
    }
    setIsBookAddInfo(!isBookAddInfo);
  }

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  }

  const handleTypeChange = (event) => {
    switch (event.target.name) {
      case "printtype":
        setChosenPrintType(event.target.value)
        break;
      case "booktype":
        setChosenBookType(event.target.value);
        break;
    }

    console.log(event);

    console.log(event.target.value);
  }

  const submitSearch = () => {
    let additionalQueryParams = "";
    let filterValue = "";

    if (searchValue !== "") {

      if (chosenBookType !== "") {
        additionalQueryParams += `&filter=${chosenBookType}`;
      }

      if (chosenPrintType !== "") {
        additionalQueryParams += `&printType=${chosenPrintType}`;
      }

      if (bookFilter === "ISBN") {
        filterValue = "isbn:"
      }

      setLoading(true);

      axios.get(`${process.env.REACT_APP_API_URL}q=${filterValue}${searchValue}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&startIndex=${startIndex}&maxResults=${maxResults}${additionalQueryParams}`)
        .then(response => {
          if (response !== null && response.data !== null) {
            setBooks(response.data.items);
            console.log(`${process.env.REACT_APP_API_URL}q=${filterValue}${searchValue}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&maxResults=${maxResults}${additionalQueryParams}`)
            setLoading(false);
          }
        })
        .catch(error => {
          console.log(`An error occurred searching for the book ${error}`)
          setErrorMessage(error);
        })
    }
    else {
      setErrorMessage("Please ensure you enter a book title or isbn number");
      setIsError(true);
    }

  }

  const addToBookshelf = (item) => {
    const { volumeInfo } = item;

    var bookID = item.id;

    const bookInBookshelf = (localStorage.getItem(`bookshelfitem-${bookID}`) !== null);

    if (bookInBookshelf) {
      setErrorMessage("This book is already in your bookshelf. Please choose another!")
      setIsError(true);
    } else {

      const customAuthorItem = customAuthors(volumeInfo);
      const customGenreItem = customGenres(volumeInfo);
      const customDate = formatDate(volumeInfo.publishedDate);


      const bookshelfItem = {
        id: item.id,
        title: volumeInfo.title,
        description: volumeInfo.description,
        pageCount: volumeInfo.pageCount,
        rating: volumeInfo.rating,
        imageUrl: volumeInfo.imageLinks.thumbnail,
        authors: customAuthorItem,
        genres: customGenreItem,
        publisher: volumeInfo.publisher,
        publishedDate: customDate
      }

      localStorage.setItem(`bookshelfitem-${bookshelfItem.id}`, JSON.stringify(bookshelfItem));
      toggleAddToFavourite();
    }
  }

  const handleBookFilter = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    setBookFilter(event.target.value);
  }

  const createPagination = () => {
    let totalResults = [...books];

    if (startIndex === 0 && totalResults.items > maxResults) {
      setPreviousIndex(startIndex);
      setStartIndex(startIndex + maxResults);
    } else {

    }
  }

  const toggleError = () => {
    setIsError(!isError);
  }

  const toggleAddToFavourite = () => {
    setAddedBookToFavourite(!addedBookToFavourite);
  }

  if (loading) {
    return (
      <div className="text-center mt-2">
        <ClipLoader loading={loading} size={150} color={"blue"} />
      </div>
    )
  }
  return (
    <div>

      <NavigationHeader />

      <div style={{ textAlign: 'center' }}>
        <span style={{ fontSize: '20px' }}>Book Search</span>
      </div>

      <section id="cover" className="mt-4">
        <div id="cover-caption">
          <div className="container">
            <div className="row text-white">
              <div className='col-md-12'>
                <div className='px-2'>
                  <form>
                    <div className='form-group'>
                      <div className="input-group">
                        <Search
                          searchValue={searchValue}
                          handleSearch={handleSearch}
                          btnSearch={submitSearch}
                        />

                        <Error
                          isError={isError}
                          toggleError={toggleError}
                          errorMessage={errorMessage}
                        />


                        <AddedToBookshelf
                          isOpen={addedBookToFavourite}
                          toggleFavouriteModal={toggleAddToFavourite}
                        />

                      </div>
                    </div>
                    <div className="form-group row">
                      <div className='input-group'>

                        <CustomDropdown
                          id={"printType"}
                          name={"printtype"}
                          value={chosenPrintType}
                          handler={handleTypeChange}
                          type={printTypes}
                        />

                      </div>

                    </div>

                    <div className="form-group row">
                      <div className='input-group'>

                        <CustomDropdown
                          id={"bookType"}
                          name={"booktype"}
                          value={chosenBookType}
                          handler={handleTypeChange}
                          type={bookTypes}
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

      <div className='container'>

        <div className="row form-group mb-4">

          <RadioGroup
            name="searchfilter"
          >
            {
              filterButtonValues.map(({ label, value }, index) => {
                return (
                  <RadioButton
                    label={label}
                    value={value}
                    index={index}
                    filterChange={handleBookFilter}
                    key={index}
                  />
                )
              })
            }

          </RadioGroup>
        </div>

      </div>

      <div className="row">

        {
          books !== null && books !== undefined && books.length > 0 ?
            books.map((value, index) => {
              if (value !== null) {
                return (
                  <Book
                    key={value !== undefined ? value.id : index}
                    item={value}
                    toggleModal={toggleAdditionalBookInfoModal}
                    addToBookshelf={addToBookshelf}
                  />
                )
              }

            })

            : null
        }
      </div>

      <div className="row">
        <BookAdditionalInfo
          isOpen={isBookAddInfo}
          item={chosenBook}
          toggleModal={toggleAdditionalBookInfoModal}
        />
      </div>

    </div >
  )
}

export default App
