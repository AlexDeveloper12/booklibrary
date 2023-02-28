import { useState } from 'react';
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
        console.log(`${apiURL}q=${searchValue}&key=${apiKey}&maxResults=${maxResults}${additionalQueryParams}`)
      })
  }

  const addToBookshelf = () => {
    const bookshelfItem = {
      id: "",
      title: "",
      description: "",
      pageCount: "",
      rating: 0,
      imageUrl: ""
    }

    localStorage.setItem(`bookshelfitem-${bookshelfItem.id}`, JSON.stringify(bookshelfItem));

  }


  const getBookshelfItems = () => {

    for (var index = 0; index < localStorage.length; index++) {

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
          <Search
            searchValue={searchValue}
            handleSearch={handleSearch}
            btnSearch={submitSearch}
          />
        </div>

        <div className="row form-group mb-4">

          {
            filterButtonValues.map(({ label, value }, index) => {
              return (
                <RadioButton
                  label={label}
                  value={value}
                  index={index}
                  filterChange={handleBookFilter}
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

      <div className="row">

        {
          books !== null && books !== undefined && books.length > 0 ?
            books.map((value, index) => {
              if (value !== null) {
                return (
                  <Book
                    key={index}
                    item={value}

                  />
                )
              }

            })

            : null
        }
      </div>

    </div>
  )
}

export default App
