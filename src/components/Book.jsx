import React from "react";
import { AiFillBook } from 'react-icons/ai';

function Book({ item }) {
    console.log(item.volumeInfo);

    return (
        <div className="col-md-4">
            <div className="card">
                {
                    item.imageLinks !== undefined ?
                        <img class="card-img-top" src={item.imageLinks.thumbnail} /> : null
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
                        <span>
                        {item.volumeInfo.publishedDate}
                        </span>

                        
                    </p>
                    <a href="#" className="card-link"> <AiFillBook size={25} color="black" /> Add to bookshelf </a>
                    <a href="#" className="card-link">Show more</a>
                </div>
            </div>
        </div>
    )
}

export default Book;