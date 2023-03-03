import React from "react";
import ReactModal from "react-modal";
import {customStyles} from "../Utils/Utils";

ReactModal.setAppElement('#root');

function DeleteBookModal({isDeleteOpen,toggleDeleteModal,btnDelete}){
    return(
        <ReactModal 
            isOpen={isDeleteOpen}
            style={customStyles}
            >
                <div className="container">
                    <div className="row">
                        Are you sure you want to delete this book from your bookshelf?
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <button type="button" className="btn btn-primary">Delete</button>
                        </div>
                        <div className="col-md-6">
                            <button type="button" className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
                </div>
            </ReactModal>
    )

}

export default DeleteBookModal;