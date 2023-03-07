import React, { useState, useEffect } from "react";
import { Table, TableContainer, Paper, TableRow, TableHead, TableCell, TableBody } from "@mui/material";
import BookShelfItem from "./BookShelfItem";
import NavigationHeader from "./Navigation/NavigationHeader";
import DeleteBookModal from "./Modals/DeleteBookModal";

function Bookshelf() {

    const [bookShelf, setBookShelf] = useState([]);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [chosenDeleteBookID, setChosenDeleteBookID] = useState(0);

    useEffect(() => {
        getBookshelfItems();
    }, [bookShelf])


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
                <NavigationHeader />
            </div>
            <div className="row mt-4">

                {
                    bookShelf.length > 0 ?
                        <>
                            <span className="mb-2">Bookshelf count: {bookShelf.length}</span>

                            <TableContainer component={Paper} style={{width:'90%',margin:'0 auto'}}>
                                <Table size="medium">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" >
                                                Image
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
                                    </TableBody>
                                </Table>

                            </TableContainer>

                        </>
                        : <div style={{ backgroundColor: '#2c82c9' }} className="row justify-content-center">  <span className="text-center text-white p-2" >No books in bookshelf</span></div>
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