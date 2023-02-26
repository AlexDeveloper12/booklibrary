import { useState } from 'react';
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './components/Search';
import { apiKey } from "../src/components/API/keys";
import { apiURL } from "../src/components/API/calls";
import Book from './components/Book';

function App() {
  const [searchValue, setSearchValue] = useState("the idiot");
  const [books, setBooks] = useState([]);

  const [maxResults, setMaxResults] = useState(40);
  const [loading, setLoading] = useState(false);

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  }

  const submitSearch = () => {
    setLoading(true);
    axios.get(`${apiURL}q=${searchValue}&key=${apiKey}&maxResults=${maxResults}`)
      .then(response => {
        if (response !== null && response.data !== null) {
          setBooks(response.data.items);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(`An error occurred searching for the book ${error}`)
      })
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
      <Search
        searchValue={searchValue}
        handleSearch={handleSearch}
        btnSearch={submitSearch}
      />
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
