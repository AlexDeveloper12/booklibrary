import React from "react";
import ReactModal from "react-modal";
import { customStyles } from "../Utils/Utils";

ReactModal.setAppElement('#root');

function BookAdditionalInfo({ item, isOpen, toggleModal }) {
    return (
        <div>
            <ReactModal
                isOpen={isOpen}
                style={customStyles}
                contentLabel={`${item.volumeInfo !== undefined ? item.volumeInfo.title : ""}`}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-md-1">
                            Description:
                        </div>
                        <div className="col-md-11">
                            <span>{item.volumeInfo !== undefined && item.volumeInfo.title !== undefined ? item.volumeInfo.description : "No description" }</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">

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