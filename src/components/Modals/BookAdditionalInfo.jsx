import React from "react";
import ReactModal from "react-modal";
import moment from "moment";
import { customStyles } from "../Utils/Utils";

ReactModal.setAppElement('#root');

function BookAdditionalInfo({ item, isOpen, toggleModal }) {

    const {saleInfo,volumeInfo} = item;

    const customAuthors = () => {

        var authorString = "";

        if (volumeInfo !== null && volumeInfo !== undefined) {

            if (volumeInfo.authors !== null && volumeInfo.authors !== undefined) {

                volumeInfo.authors.map((value, index) => {
                    authorString += `${value}`
                    if (index > 0) {
                        authorString += authorString + ","
                    }
                })
            }
        }

        return authorString;
    }

    const customGenres = () => {
        var genreString = "";

        if (volumeInfo !== null && volumeInfo !== undefined) {
            if (volumeInfo.categories !== null && volumeInfo.categories !== undefined) {
                volumeInfo.categories.map((value, index) => {
                    genreString += `${value}`
                    if (index > 0) {
                        genreString += genreString + ","
                    }
                })
            }
        }

        return genreString;
    }

    const formatDate = (dateTime) => {
        var formattedDate = moment(dateTime).format("DD/MM/YYYY");

        return formattedDate;
    }

    if (item !== null && item !== undefined) {

        return (
            <div>
                <ReactModal
                    isOpen={isOpen}
                    style={customStyles}
                    contentLabel={`${volumeInfo !== undefined ? volumeInfo.title : ""}`}
                >
                    <div className="container">

                        <div className="row mb-3">
                            <div className="col-md-12 text-center">
                                {volumeInfo !== undefined && volumeInfo.imageLinks.thumbnail !== undefined ? <img src={volumeInfo.imageLinks.thumbnail} /> : <span>No image available</span>}
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-1">
                                Title:
                            </div>
                            <div className="col-md-11">
                                <span>{volumeInfo !== undefined && volumeInfo.title !== undefined ? volumeInfo.title : "No title available"}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-1">
                                Description:
                            </div>
                            <div className="col-md-11">
                                <span>{volumeInfo !== undefined && volumeInfo.title !== undefined ? volumeInfo.description : "No description available"}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-1">
                                Publisher:
                            </div>
                            <div className="col-md-11">
                                <span>{volumeInfo !== undefined && volumeInfo.publisher !== undefined ? volumeInfo.publisher : "No publisher information available"}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-1">
                                Published:
                            </div>
                            <div className="col-md-11">
                                <span>{volumeInfo !== undefined && volumeInfo !== undefined ? formatDate(volumeInfo.publishedDate) : null}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-1">
                                Author(s):
                            </div>
                            <div className="col-md-11">
                                <span> {customAuthors()}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-1">
                                Genre(s):
                            </div>
                            <div className="col-md-11">
                                <span>{customGenres()}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-1">
                                Is Ebook?:
                            </div>
                            <div className="col-md-11">
                                <span>{saleInfo !== undefined && saleInfo.isEbook !== undefined ? "Yes" : "No"}</span>
                            </div>
                        </div>

                        <div className="row ">
                            <div className="col-md-12 text-center">
                                <button type="button" className="btn btn-primary" onClick={toggleModal}>Close</button>
                            </div>
                        </div>

                    </div>


                </ReactModal>
            </div>
        )
    } else {
        return (
            <div>
                There is no additional information for this book
            </div>
        )
    }


}

export default BookAdditionalInfo;