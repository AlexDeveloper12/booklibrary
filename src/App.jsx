import { useState } from 'react';
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './components/Search';
import { apiKey } from "../src/components/API/keys";
import { apiURL } from "../src/components/API/calls";
import Book from './components/Book';
import { bookTypes, printTypes } from './components/Utils/Utils';

function App() {
  const [searchValue, setSearchValue] = useState("the idiot");
  const [books, setBooks] = useState([]);
  const [maxResults, setMaxResults] = useState(40);
  const [loading, setLoading] = useState(false);
  const [chosenPrintType, setChosenPrintType] = useState("");
  const [chosenBookType, setChosenBookType] = useState("");

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
    let additionalQueryParams = ""

    if (chosenBookType !== "") {
      additionalQueryParams += `&filter=${chosenBookType}`;
    }

    if (chosenPrintType !== "") {
      additionalQueryParams += `&printType=${chosenPrintType}`;
    }

    setLoading(true);
    axios.get(`${apiURL}q=${searchValue}&key=${apiKey}&maxResults=${maxResults}${additionalQueryParams}`)
      .then(response => {
        if (response !== null && response.data !== null) {
          setBooks(response.data.items);
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

  if (loading) {
    return (
      <div className="text-center">
        <ClipLoader loading={loading} size={150} />
      </div>
    )

  }

  return (
    <div className="App">

      <div className="row">
        <Search
          searchValue={searchValue}
          handleSearch={handleSearch}
          btnSearch={submitSearch}
        />

        <div className="row mb-4">

          <div className='mb-4'>
            <select
              id="printType"
              name="printtype"
              className="form-select"
              value={chosenPrintType}
              onChange={(event) => handleTypeChange(event)}
              style={{ width: '50%' }}
            >
              <option value="-1">Please select</option>
              {printTypes.map((value, index) => {
                return (
                  <option value={value}>{value}</option>
                )
              })
              }
            </select>
          </div>


          <div className='mb-4'>
            <select
              id="bookType"
              name="booktype"
              className="form-select"
              value={chosenBookType}
              onChange={(event) => handleTypeChange(event)}
              style={{ width: '50%' }}
            >
              <option value="-1">Please select</option>
              {
                bookTypes.map((value, index) => {
                  return (
                    <option value={value}>{value}</option>
                  )
                })
              }
            </select>
          </div>


        </div>


      </div>


      <div className="row">

        {
          books !== null && books.length > 0 ?
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
