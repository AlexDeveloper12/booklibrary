import React from "react";

function AddedToBookshelf({ isOpen, toggleFavouriteModal }) {
    return (
        <div className="row">
            {
                isOpen ?
                    <div className="alert alert-success" role="alert">
                        This book has been added to your bookshelf!
                        <button type="button" className="btn btn-secondary mx-2" data-dismiss="alert" aria-label="Close" >
                            <span aria-hidden="true" onClick={toggleFavouriteModal} style={{color:"white"}}>&times;</span>
                        </button>
                    </div>

                    : null
            }

        </div>
    )

}

export default AddedToBookshelf;