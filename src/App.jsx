import { useEffect, useState } from 'react';
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './components/Search';
import { apiKey } from "../src/components/API/keys";
import { apiURL } from "../src/components/API/calls";
import Book from './components/Book';
import { bookTypes, filterButtonValues, printTypes } from './components/Utils/Utils';
import RadioButton from './components/RadioButton';
import CustomDropdown from './components/CustomDropdown';
import BookAdditionalInfo from './components/Modals/BookAdditionalInfo';
import Error from './components/Error';
import AddedToBookshelf from './components/AddedToBookshelf';
import BookShelfItem from './components/BookShelfItem';
import DeleteBookModal from './components/Modals/DeleteBookModal';
import {customAuthors,customGenres,formatDate} from "./components/Utils/Utils";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [books, setBooks] = useState([]);
  const [maxResults, setMaxResults] = useState(10);
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
  const [bookShelf, setBookShelf] = useState([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [chosenDeleteBookID, setChosenDeleteBookID] = useState(0);

  useEffect(() => {
    getBookshelfItems();
  }, [])

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

      axios.get(`${apiURL}q=${filterValue}${searchValue}&key=${apiKey}&startIndex=${startIndex}&maxResults=${maxResults}${additionalQueryParams}`)
        .then(response => {
          if (response !== null && response.data !== null) {
            setBooks(response.data.items);
            console.log(`${apiURL}q=${filterValue}${searchValue}&key=${apiKey}&maxResults=${maxResults}${additionalQueryParams}`)
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

  const getBookshelfItems = () => {
    var tempArray = [];

    if (localStorage.length > 0) {
      for (var index = 0; index < localStorage.length; index++) {
        var key = localStorage.key(index);

        var value = JSON.parse(localStorage.getItem(key));

        tempArray.push(value);
      }

      setBookShelf(tempArray);

    }
  }

  const handleBookFilter = (event) => {
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

  const toggleDelete = (bookID) => {
    setIsDeleteOpen(!isDeleteOpen);
    if (bookID !== 0) {
      setChosenDeleteBookID(bookID);
    }

  }

  const removeFromBookshelf = (bookID) => {
    toggleDelete(0);
    localStorage.removeItem(`bookshelfitem-${bookID}`)
    getBookshelfItems();
  }

  if (loading) {
    return (
      <div className="text-center">
        <ClipLoader loading={loading} size={150} />
      </div>
    )
  }

  return (
    <div>

      <div className='container'>

        <div className="row mb-4">
          <div className="input-group">
            <Search
              searchValue={searchValue}
              handleSearch={handleSearch}
              btnSearch={submitSearch}
            />

          </div>

        </div>


        <Error
          isError={isError}
          toggleError={toggleError}
          errorMessage={errorMessage}
        />

        <div className="row form-group mb-4">

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
        </div>

        <div className="row mb-4">

          <div className='mb-4'>
            <CustomDropdown
              id={"printType"}
              name={"printtype"}
              value={chosenPrintType}
              handler={handleTypeChange}
              type={printTypes}
            />
          </div>


          <div className='mb-4'>
            <CustomDropdown
              id={"bookType"}
              name={"booktype"}
              value={chosenBookType}
              handler={handleTypeChange}
              type={bookTypes}
            />
          </div>
        </div>

      </div>

      <AddedToBookshelf
        isOpen={addedBookToFavourite}
        toggleFavouriteModal={toggleAddToFavourite}
      />

      {/* <div className="row">

        {
          bookShelf.length > 0 ?

            <>
              <table className='table table-striped table-dark'>
                <thead className='thead-dark'>
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Author(s)</th>
                    <th scope="col">Genre(s)</th>
                    <th scope="col">Publisher</th>
                    <th scope="col">Published</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    bookShelf.map((value, index) => {
                      return (
                        <BookShelfItem
                          item={value}
                          openDeleteModal={toggleDelete}
                          key={value.id}
                        />
                      )
                    })

                  }
                </tbody>
              </table>
            </>
            : null
        }

      </div> */}

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

      {
        /**
         * MODALS
         */
      }

      <div className="row">
        <BookAdditionalInfo
          isOpen={isBookAddInfo}
          item={chosenBook}
          toggleModal={toggleAdditionalBookInfoModal}
        />
      </div>

      <div className="row">
        {
          isDeleteOpen ?
            <DeleteBookModal
              isDeleteOpen={isDeleteOpen}
              toggleDeleteModal={toggleDelete}
              btnDelete={removeFromBookshelf}
              bookID={chosenDeleteBookID}
            />

            : null
        }
      </div>
    </div >
  )
}

export default App
