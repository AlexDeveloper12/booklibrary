import React from "react";
import { AiFillBook } from 'react-icons/ai';
import moment from "moment";

function Book({ item }) {

    console.log(item);

    const formatDate = (dateTime) => {
        var formattedDate = moment(dateTime).format("DD/MM/YYYY");

        return formattedDate;
    }

    return (
        <div className="col-md-3 mb-4">
            <div className="card">
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
                        {item.searchInfo !== undefined ?

                            <span>{item.searchInfo.textSnippet}</span>

                            : null
                        }
                        <div className="mt-1">
                            <span>
                                {formatDate(item.volumeInfo.publishedDate)}
                            </span>
                        </div>



                    </p>
                    <a href="#" className="card-link"> <AiFillBook size={25} color="black" /> Add to bookshelf </a>
                    <a href="#" className="card-link">Show more</a>
                </div>
            </div>
        </div>
    )
}

export default Book;