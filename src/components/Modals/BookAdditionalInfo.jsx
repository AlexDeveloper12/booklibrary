import React from "react";
import ReactModal from "react-modal";
import { customStyles } from "../Utils/Utils";

ReactModal.setAppElement('#root');

function BookAdditionalInfo({ item, isOpen, toggleModal }) {

    const customAuthors = () => {

        var authorString = "";

        if (item.volumeInfo !== null && item.volumeInfo !== undefined) {

            if (item.volumeInfo.authors !== null && item.volumeInfo.authors !== undefined) {

                item.volumeInfo.authors.map((value, index) => {
                    authorString += `${value}`
                    if (index > 0) {
                        authorString += authorString + ","
                    }
                })
            }
        }
        
        return authorString;
    }

    return (
        <div>
            <ReactModal
                isOpen={isOpen}
                style={customStyles}
                contentLabel={`${item.volumeInfo !== undefined ? item.volumeInfo.title : ""}`}
            >
                <div className="container">
                    <div className="row mb-3">
                        <div className="col-md-1">
                            Description:
                        </div>
                        <div className="col-md-11">
                            <span>{item.volumeInfo !== undefined && item.volumeInfo.title !== undefined ? item.volumeInfo.description : "No description"}</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-1">
                            Author(s)
                        </div>
                        <div className="col-md-11">
                           <span> {customAuthors()}</span>
                        </div>
                    </div>

                    <div className="row ">
                        <div className="col-md-6 text-center">
                            <button type="button" className="btn btn-primary" onClick={toggleModal}>Close</button>
                        </div>
                    </div>

                </div>


            </ReactModal>
        </div>
    )

}

export default BookAdditionalInfo;