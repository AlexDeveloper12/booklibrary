import React from "react";
import ReactModal from "react-modal";
import { customDeleteStyles } from "../Utils/Utils";
import {Button} from "@mui/material";

ReactModal.setAppElement('#root');

function DeleteBookModal({ isDeleteOpen, toggleDeleteModal, btnDelete, bookID }) {
    return (
        <ReactModal
            isOpen={isDeleteOpen}
            style={customDeleteStyles}
        >
            <div className="container">
                <div className="row">
                    <div className="col-md-12 center-block text-center">
                        <span>Are you sure you want to delete this book from your bookshelf?</span>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-12 text-center">
                        {/* <button type="button" className="btn btn-primary" onClick={() => btnDelete(bookID)} >Delete</button>
                        <button type="button" className="btn btn-danger " onClick={toggleDeleteModal} >Cancel</button> */}
                        <Button variant="outlined" color="error" onClick={() => btnDelete(bookID)} >Delete</Button>
                        <Button variant="outlined" color="primary" onClick={toggleDeleteModal}>Cancel </Button>


                    </div>
                </div>
            </div>
        </ReactModal>
    )

}

export default DeleteBookModal;