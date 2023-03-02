import React from "react";

function Error({isError,toggleError,errorMessage}){
    return(
        <div className="row mb-4">

          {
            isError ?
              <div className="alert alert-danger alert-dismissible" role="alert">
                {errorMessage}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={toggleError}>
                  <span aria-hidden="true" style={{ color: 'white' }}> &times;</span>
                </button>

              </div>

              : null
          }

        </div>
    )

}

export default Error;