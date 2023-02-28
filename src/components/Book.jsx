import React from "react";
import { AiFillBook } from 'react-icons/ai';
import moment from "moment";
import { printTypes, bookTypes } from "../components/Utils/Utils";
import Rating from "./Rating";

function Book({ item,toggleModal }) {

    console.log(item);

    const formatDate = (dateTime) => {
        var formattedDate = moment(dateTime).format("DD/MM/YYYY");

        return formattedDate;
    }

    const renderRating = (rating) => {
        if (rating !== undefined && rating !== null) {
            const roundedRating = Math.round(rating);
            let ratingsList = [];

            for (var i = 0; i < roundedRating; i++) {
                ratingsList.push(<Rating />)
            }

            return ratingsList;
        } else {
            return "There is no rating for this book";
        }
    }

    return (

        <div className="col-md-3 mb-4" style={{ height: '500px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <div className="card" onClick={()=>toggleModal(item)}>
                {
                    item.volumeInfo.imageLinks !== undefined ?
                        <img class="card-img-top" src={item.volumeInfo.imageLinks.thumbnail} width={100} height={250} /> : null
                }

                <div className="card-body">
                    <h5 className="card-title">
                        {item.volumeInfo.title}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">{item.volumeInfo.subtitle} </h6>
                    <p className="card-text">

                        <div className="row">
                            <div className="col-md-8">
                                Page count:
                            </div>
                            <div className="col-md-4">
                            {
                                    item.volumeInfo.pageCount !== undefined ? <span>{item.volumeInfo.pageCount}</span> : null
                                }
                            </div>
                        </div>
                        
                
                        <div className="mt-1 row">
                            <div className="col-md-6">
                                <span>
                                    Published date:
                                </span>
                            </div>
                            <div className="col-md-6">
                            {formatDate(item.volumeInfo.publishedDate)}
                            </div>
                        </div>

                        <div className="mt-1 row">
                            <div className="col-md-6">
                                <span>
                                Rating:
                                </span>
                                
                            </div>
                            <div className="col-md-6">
                            {renderRating(item.volumeInfo.averageRating)}
                            </div>
                        </div>

                    </p>
                    <a href="#" className="card-link"> <AiFillBook size={25} color="black" /> Add </a>
                    <a href="#" className="card-link">Show more</a>
                </div>
            </div>
        </div>
    )
}

export default Book;