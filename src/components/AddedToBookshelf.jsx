import React from "react";
import {Alert} from "@mui/material";

function AddedToBookshelf({ isOpen, toggleFavouriteModal }) {
    return (
        <div className="row">
            {
                isOpen ?
                    <div>
                        <Alert severity="success">
                        This book has been added to your bookshelf!
                        <button type="button" className="btn btn-secondary mx-2" data-dismiss="alert" aria-label="Close" onClick={toggleFavouriteModal} >
                            <span aria-hidden="true" style={{ color: "white" }}>&times;</span>
                        </button>
                        </Alert>
                        
                    </div>

                    : null
            }

        </div>
    )

}

export default AddedToBookshelf;