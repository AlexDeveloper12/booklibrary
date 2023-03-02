import React from "react";

function AddedToFavourite({ isOpen, toggleFavouriteModal }) {
    return (
        <div className="row">
            {
                isOpen ?
                    <div className="alert alert-success" role="alert">
                        This book has been added to your bookshelf!
                        <button type="button" data-dismiss="alert" aria-label="Close" >
                            <span aria-hidden="true" onClick={toggleFavouriteModal}>&times;</span>
                        </button>
                    </div>

                    : null
            }

        </div>
    )

}

export default AddedToFavourite;