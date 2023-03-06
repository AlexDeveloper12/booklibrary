import React from "react";
import Rating from "./Rating";
import { AiFillBook } from "react-icons/ai";

function Book({ item, toggleModal,addToBookshelf }) {

    const {volumeInfo} = item;

    console.log(item);
    const renderRating = (rating) => {
        if (rating !== undefined && rating !== null) {
            const roundedRating = Math.round(rating);
            let ratingsList = [];

            for (var i = 0; i < roundedRating; i++) {
                ratingsList.push(<Rating />)
            }

            return ratingsList;
        } else {
            return "No rating";
        }
    }

    return (
        <div className="col-md-3 mb-4" style={{ height: '600px', overflow: 'hidden', textOverflow: 'ellipsis',marginLeft:'10px',width:'350px' }}>
            <div className="card bg-light">
                {
                    volumeInfo.imageLinks !== undefined ?
                        <img className="card-img-top" src={volumeInfo.imageLinks.thumbnail} width={100} height={250}  onClick={() => toggleModal(item)} /> : null
                }

                <div className="card-body" onClick={() => toggleModal(item)}>
                    <h5 className="card-title">
                        {volumeInfo.title}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">{item.volumeInfo.subtitle !== undefined ? <span>{volumeInfo.subtitle}</span> : <span>No subtitle</span>} </h6>
                    <div className="card-text">

                        <div className="row">
                            <div className="col-md-7">
                                Page count:
                            </div>
                            <div className="col-md-5">
                                {
                                    volumeInfo.pageCount !== undefined ? <span>{volumeInfo.pageCount}</span> : null
                                }
                            </div>
                        </div>

                        <div className="mt-1 row">
                            <div className="col-md-6">
                                <span>
                                    Rating:
                                </span>

                            </div>
                            <div className="col-md-6">
                                {renderRating(volumeInfo.averageRating)}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="row text-center">
                        <a href="#" className="card-link"> <AiFillBook size={40} color="brown" onClick={()=>addToBookshelf(item)} /> </a>
                        <a href="#" className="card-link" onClick={()=> {event.preventDefault();toggleModal(item)}} >Learn More</a>
                        
                    </div>
            </div>
        </div>
    )
}

export default Book;