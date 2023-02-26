import React from "react";

function Book({ item }) {

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
                    <p className="card-text">

                        {item.searchInfo !== undefined ?

                            <span>{item.searchInfo.textSnippet}</span>

                            : null
                        }

                        {item.volumeInfo.publishedDate}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Book;