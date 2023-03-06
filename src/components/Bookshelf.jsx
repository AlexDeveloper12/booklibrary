import React, { useState,useEffect } from "react";
import BookShelfItem from "./BookShelfItem";
import NavigationHeader from "./Navigation/NavigationHeader";
import DeleteBookModal from "./Modals/DeleteBookModal";

function Bookshelf() {

    const [bookShelf, setBookShelf] = useState([]);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [chosenDeleteBookID, setChosenDeleteBookID] = useState(0);

    useEffect(() => {
        getBookshelfItems();
    }, [])


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

    const removeFromBookshelf = (bookID) => {
        toggleDelete(0);
        localStorage.removeItem(`bookshelfitem-${bookID}`)
        getBookshelfItems();
    }

    const toggleDelete = (bookID) => {
        setIsDeleteOpen(!isDeleteOpen);
        if (bookID !== 0) {
            setChosenDeleteBookID(bookID);
        }

    }

    return (
        <div>
            <div className="row">
                <NavigationHeader/>
            </div>
            <div className="row mt-4">

                {
                    bookShelf.length > 0 ?

                    

                        <>
                            <span className="mb-2">Bookshelf count: {bookShelf.length}</span>
                            <table className='table table-striped table-light' style={{width:'80%',marginLeft:'10%'}}>
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
                        : <div style={{backgroundColor:'#2c82c9'}} className="row justify-content-center">  <span className="text-center text-white p-2" >No books in bookshelf</span></div>
                }

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
        </div>
    )

}

export default Bookshelf;