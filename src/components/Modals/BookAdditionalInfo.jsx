import React from "react";
import ReactModal from "react-modal";
import moment from "moment";
import { customStyles } from "../Utils/Utils";

ReactModal.setAppElement('#root');

function BookAdditionalInfo({ item, isOpen, toggleModal }) {

    const customAuthors = () => {

        var authorString = "";

        if (item.volumeInfo !== null && item.volumeInfo !== undefined) {

            if (item.volumeInfo.authors !== null && item.volumeInfo.authors !== undefined) {

                item.volumeInfo.authors.map((value, index) => {
                    authorString += `${value}`
                    if (index > 0) {
                        authorString += authorString + ","
                    }
                })
            }
        }
        
        return authorString;
    }

    const customGenres = () =>{
        var genreString = "";

        if(item.volumeInfo !== null && item.volumeInfo !== undefined){
            if(item.volumeInfo.categories !== null && item.volumeInfo.categories !== undefined){
                item.volumeInfo.categories.map((value,index)=>{
                    genreString+= `${value}`
                    if(index > 0){
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

    if(item!==null && item !== undefined){

    return (
        <div>
            <ReactModal
                isOpen={isOpen}
                style={customStyles}
                contentLabel={`${item.volumeInfo !== undefined ? item.volumeInfo.title : ""}`}
            >
                <div className="container">

                    <div className="row mb-3">
                        <div className="col-md-12 text-center">
                            {item.volumeInfo !== undefined && item.volumeInfo.imageLinks.thumbnail !== undefined ? <img src={item.volumeInfo.imageLinks.thumbnail} /> : <span>No image available</span> }
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-1">
                            Description:
                        </div>
                        <div className="col-md-11">
                            <span>{item.volumeInfo !== undefined && item.volumeInfo.title !== undefined ? item.volumeInfo.description : "No description available"}</span>
                        </div>
                    </div>

                    <div className="row">
                    <div className="col-md-1">
                        Publisher:
                    </div>
                    <div className="col-md-11">
                        <span>{item.volumeInfo !== undefined && item.volumeInfo.publisher !== undefined ? item.volumeInfo.publisher : "No publisher information available" }</span>
                    </div>
                    </div>

                    <div className="row">
                        <div className="col-md-1">
                            Published:
                        </div>
                        <div className="col-md-11">
                            <span>{item.volumeInfo !== undefined && item.volumeInfo !== undefined ? formatDate(item.volumeInfo.publishedDate) : null}</span>
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
                           <span>{item.saleInfo !== undefined && item.saleInfo.isEbook !== undefined ? "Yes" : "No"}</span> 
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
    }else {
        return(
            <div>
                There is no additional information for this book
            </div>
        )
    }


}

export default BookAdditionalInfo;